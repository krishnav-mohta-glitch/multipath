/**
 * MULTIPATH V2 — PHASE 13: CLOUD DATA PERSISTENCE & GUEST-TO-ACCOUNT SYNC VERIFICATION SUITE
 * Tests:
 * 1. Offline guest invariants & deterministic UUID integrity.
 * 2. Authenticated two-account cloud persistence across all 5 schemas:
 *    - saved_topics
 *    - activity_events (immutable)
 *    - learning_sessions
 *    - saved_resources
 *    - learning_preferences
 * 3. Empirical cross-account RLS isolation (Account A vs Account B):
 *    - Cross-read isolation
 *    - Spoofed insert rejection
 *    - Cross-update blocking
 *    - Cross-delete blocking
 *    - Activity event immutability (NO UPDATE allowed)
 * 4. Idempotent Guest-to-Account Migration & Duplicate Prevention.
 * 5. Personal Learning Data JSON Export compliance.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

// Polyfill WebSocket for headless Node < 22 environments if absent
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = class DummyWebSocket {
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
  };
}

// Load local environment overrides from .env.local
try {
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const k = trimmed.substring(0, eqIdx).trim();
          const v = trimmed.substring(eqIdx + 1).trim();
          if (!process.env[k]) {
            process.env[k] = v;
          }
        }
      }
    }
  }
} catch {
  // Ignore local env read errors
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://oestvwgkpllikmufvjls.supabase.co';
const PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_ZxcO_ZdsXI11fehS2xajPA_uT2gRJ3M';

const USER_A_EMAIL = process.env.TEST_USER_A_EMAIL;
const USER_A_PASSWORD = process.env.TEST_USER_A_PASSWORD;
const USER_B_EMAIL = process.env.TEST_USER_B_EMAIL;
const USER_B_PASSWORD = process.env.TEST_USER_B_PASSWORD;

let passedCount = 0;
let failedCount = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`TEST: ${name}... PASSED`);
    passedCount++;
  } catch (err) {
    console.error(`TEST: ${name}... FAILED`);
    console.error(`  ${err.message}`);
    failedCount++;
  }
}

async function runAsyncTest(name, fn) {
  try {
    await fn();
    console.log(`TEST: ${name}... PASSED`);
    passedCount++;
  } catch (err) {
    console.error(`TEST: ${name}... FAILED`);
    console.error(`  ${err.message}`);
    failedCount++;
  }
}

// Deterministic UUID generator identical to client implementation
function stringToDeterministicUUID(input) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(input)) return input;

  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  let h3 = 0x9e3779b9;
  let h4 = 0x85ebca6b;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
    h3 = Math.imul(h3 ^ ch, 2246822507);
    h4 = Math.imul(h4 ^ ch, 3266489909);
  }
  const toHex8 = (n) => (n >>> 0).toString(16).padStart(8, '0');
  const hex = toHex8(h1) + toHex8(h2) + toHex8(h3) + toHex8(h4);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

async function main() {
  console.log('====================================================');
  console.log('MULTIPATH PHASE 13: CLOUD PERSISTENCE & RLS SUITE');
  console.log('====================================================\n');

  // --- SECTION 1: DETERMINISTIC CLIENT UUID & GUEST HELPER ---
  console.log('--- SECTION 1: CLIENT UTILITIES & OFFLINE DETERMINISM ---');
  runTest('stringToDeterministicUUID formats valid RFC4122 v4 UUIDs', () => {
    const u1 = stringToDeterministicUUID('guest_act_12345');
    const u2 = stringToDeterministicUUID('guest_act_12345');
    assert.equal(u1, u2, 'UUID generation must be deterministic for identical inputs');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assert.match(u1, uuidRegex, 'Generated string must strictly match RFC4122 UUID v4 syntax');
  });

  runTest('Existing valid UUIDs are preserved untouched', () => {
    const valid = 'e6cc0640-2f0b-4c30-b067-253d508ea2ba';
    assert.equal(stringToDeterministicUUID(valid), valid);
  });

  // --- SECTION 2: AUTHENTICATION VIA PUBLISHABLE KEY ---
  console.log('\n--- SECTION 2: LIVE USER AUTHENTICATION VIA PUBLISHABLE KEY ---');

  if (!USER_A_EMAIL || !USER_A_PASSWORD || !USER_B_EMAIL || !USER_B_PASSWORD) {
    console.warn('⚠️  Skipping authenticated live RLS tests: TEST_USER_A/B credentials not found in .env.local');
    summarize();
    return;
  }

  const clientA = createClient(SUPABASE_URL, PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const clientB = createClient(SUPABASE_URL, PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  let userAId = null;
  let userBId = null;

  await runAsyncTest('Account A authenticates successfully via publishable key', async () => {
    const { data, error } = await clientA.auth.signInWithPassword({
      email: USER_A_EMAIL,
      password: USER_A_PASSWORD
    });
    assert.equal(error, null, `Account A login failed: ${error?.message}`);
    assert.ok(data.user?.id, 'Account A must receive user ID');
    userAId = data.user.id;
  });

  await runAsyncTest('Account B authenticates successfully via publishable key', async () => {
    const { data, error } = await clientB.auth.signInWithPassword({
      email: USER_B_EMAIL,
      password: USER_B_PASSWORD
    });
    assert.equal(error, null, `Account B login failed: ${error?.message}`);
    assert.ok(data.user?.id, 'Account B must receive user ID');
    userBId = data.user.id;
    assert.notEqual(userAId, userBId, 'User A and User B must have distinct IDs');
  });

  // --- SECTION 3: AUTHENTICATED PERSISTENCE OPERATIONS ---
  console.log('\n--- SECTION 3: AUTHENTICATED ACCOUNT PERSISTENCE (USER A) ---');

  const testEventId = stringToDeterministicUUID('test_activity_event_user_a_001');
  const testSessionId = 'test_session_disc_user_a_001';
  const testResourceId = 'test_res_mindmap_user_a_001';

  await runAsyncTest('Account A can insert and query own saved topics', async () => {
    const { error: insertErr } = await clientA
      .from('saved_topics')
      .upsert(
        { user_id: userAId, topic_id: 'math-linear-equations', notes: 'Test notes by User A' },
        { onConflict: 'user_id,topic_id' }
      );
    assert.equal(insertErr, null, `Failed to save topic: ${insertErr?.message}`);

    const { data, error: selectErr } = await clientA
      .from('saved_topics')
      .select('*')
      .eq('user_id', userAId)
      .eq('topic_id', 'math-linear-equations');
    assert.equal(selectErr, null);
    assert.equal(data.length, 1);
    assert.equal(data[0].topic_id, 'math-linear-equations');
  });

  await runAsyncTest('Account A can insert and query own immutable activity events', async () => {
    const { error: insertErr } = await clientA
      .from('activity_events')
      .upsert(
        {
          id: testEventId,
          user_id: userAId,
          event_type: 'topic_viewed',
          topic_id: 'math-linear-equations',
          subject_id: 'mathematics',
          details: 'Explored via test suite',
          payload: { testRun: true }
        },
        { onConflict: 'user_id,id' }
      );
    assert.equal(insertErr, null, `Failed to record activity: ${insertErr?.message}`);

    const { data, error: selectErr } = await clientA
      .from('activity_events')
      .select('*')
      .eq('id', testEventId);
    assert.equal(selectErr, null);
    assert.equal(data.length, 1);
    assert.equal(data[0].topic_id, 'math-linear-equations');
  });

  await runAsyncTest('Account A can upsert and query own learning sessions', async () => {
    const { error: insertErr } = await clientA
      .from('learning_sessions')
      .upsert(
        {
          id: testSessionId,
          user_id: userAId,
          topic_id: 'math-linear-equations',
          subject_id: 'mathematics',
          mode: 'socratic-discovery',
          status: 'completed',
          turn_count: 5,
          duration_seconds: 240,
          history: [{ turn: 1, text: 'Hello Socratic Tutor' }],
          assessment_data: { score: 'verified' }
        },
        { onConflict: 'user_id,id' }
      );
    assert.equal(insertErr, null, `Failed to upsert session: ${insertErr?.message}`);

    const { data, error: selectErr } = await clientA
      .from('learning_sessions')
      .select('*')
      .eq('id', testSessionId);
    assert.equal(selectErr, null);
    assert.equal(data.length, 1);
    assert.equal(data[0].status, 'completed');
  });

  await runAsyncTest('Account A can insert and query own saved resources', async () => {
    const { error: insertErr } = await clientA
      .from('saved_resources')
      .upsert(
        {
          id: testResourceId,
          user_id: userAId,
          topic_id: 'math-linear-equations',
          subject_id: 'mathematics',
          resource_type: 'mindmap',
          title: 'Linear Equations Remediation Map',
          associated_gaps: ['Slope Negativity'],
          content: { nodes: [{ id: 'n1', label: 'Slope' }] }
        },
        { onConflict: 'user_id,id' }
      );
    assert.equal(insertErr, null, `Failed to save resource: ${insertErr?.message}`);

    const { data, error: selectErr } = await clientA
      .from('saved_resources')
      .select('*')
      .eq('id', testResourceId);
    assert.equal(selectErr, null);
    assert.equal(data.length, 1);
    assert.equal(data[0].resource_type, 'mindmap');
  });

  await runAsyncTest('Account A can save and query learning style preferences', async () => {
    const { error: insertErr } = await clientA
      .from('learning_preferences')
      .upsert(
        {
          user_id: userAId,
          primary_style: 'visual-learning',
          structured_affinity: 70,
          visual_affinity: 90,
          examples_affinity: 65,
          explore_affinity: 80
        },
        { onConflict: 'user_id' }
      );
    assert.equal(insertErr, null, `Failed to save preferences: ${insertErr?.message}`);

    const { data, error: selectErr } = await clientA
      .from('learning_preferences')
      .select('*')
      .eq('user_id', userAId);
    assert.equal(selectErr, null);
    assert.equal(data.length, 1);
    assert.equal(data[0].primary_style, 'visual-learning');
  });

  // --- SECTION 4: EMPIRICAL TWO-ACCOUNT RLS ISOLATION ---
  console.log('\n--- SECTION 4: EMPIRICAL TWO-ACCOUNT RLS ISOLATION (ACCOUNT A vs B) ---');

  await runAsyncTest('Account B CANNOT read Account A saved topics (RLS Isolation)', async () => {
    const { data, error } = await clientB
      .from('saved_topics')
      .select('*')
      .eq('user_id', userAId);
    assert.equal(error, null);
    assert.equal(data.length, 0, 'Account B must not see Account A saved topics');
  });

  await runAsyncTest('Account B CANNOT read Account A activity events (RLS Isolation)', async () => {
    const { data, error } = await clientB
      .from('activity_events')
      .select('*')
      .eq('id', testEventId);
    assert.equal(error, null);
    assert.equal(data.length, 0, 'Account B must not see Account A activity events');
  });

  await runAsyncTest('Account B CANNOT read Account A learning sessions (RLS Isolation)', async () => {
    const { data, error } = await clientB
      .from('learning_sessions')
      .select('*')
      .eq('id', testSessionId);
    assert.equal(error, null);
    assert.equal(data.length, 0, 'Account B must not see Account A learning sessions');
  });

  await runAsyncTest('Account B CANNOT read Account A saved resources (RLS Isolation)', async () => {
    const { data, error } = await clientB
      .from('saved_resources')
      .select('*')
      .eq('id', testResourceId);
    assert.equal(error, null);
    assert.equal(data.length, 0, 'Account B must not see Account A saved resources');
  });

  await runAsyncTest('Account B CANNOT read Account A learning preferences (RLS Isolation)', async () => {
    const { data, error } = await clientB
      .from('learning_preferences')
      .select('*')
      .eq('user_id', userAId);
    assert.equal(error, null);
    assert.equal(data.length, 0, 'Account B must not see Account A preferences');
  });

  await runAsyncTest('Account B CANNOT spoof insert under Account A user_id (RLS Check)', async () => {
    const { error } = await clientB
      .from('saved_topics')
      .insert({
        user_id: userAId,
        topic_id: 'bio-photosynthesis'
      });
    assert.ok(error, 'Spoofed insert must be rejected by RLS');
    assert.match(error.message, /row-level security/i, 'Error must cite row-level security policy violation');
  });

  await runAsyncTest('Account B CANNOT cross-update Account A saved topics (RLS Isolation)', async () => {
    const { data, error } = await clientB
      .from('saved_topics')
      .update({ notes: 'Malicious modification by B' })
      .eq('user_id', userAId)
      .select();
    assert.equal(error, null);
    assert.equal(data.length, 0, 'Cross-update must affect 0 rows');
  });

  await runAsyncTest('Account B CANNOT cross-delete Account A saved resources (RLS Isolation)', async () => {
    const { data, error } = await clientB
      .from('saved_resources')
      .delete()
      .eq('id', testResourceId)
      .select();
    assert.equal(error, null);
    assert.equal(data.length, 0, 'Cross-delete must affect 0 rows');
  });

  await runAsyncTest('Activity events are immutable: UPDATE is blocked by RLS even for owner', async () => {
    const { data: updateData, error } = await clientA
      .from('activity_events')
      .update({ details: 'Tampered activity details' })
      .eq('id', testEventId)
      .select();
    
    // In PostgreSQL RLS, an UPDATE on a table with no UPDATE policy affects 0 rows or errors
    if (error) {
      assert.match(error.message, /row-level security|permission denied/i);
    } else {
      assert.equal(updateData.length, 0, 'No rows may be updated on immutable activity_events');
    }

    // Verify record in database remains completely unmodified
    const { data: verifyData } = await clientA
      .from('activity_events')
      .select('*')
      .eq('id', testEventId);
    assert.equal(verifyData.length, 1);
    assert.equal(verifyData[0].details, 'Explored via test suite', 'Activity event details must remain immutable');
  });

  // --- SECTION 5: IDEMPOTENT GUEST-TO-ACCOUNT IMPORT ---
  console.log('\n--- SECTION 5: IDEMPOTENT GUEST-TO-ACCOUNT IMPORT ENGINE ---');

  const importTopicId = 'bio-photosynthesis';
  const importEventRawId = 'guest_act_photosynthesis_import_001';
  const importDeterministicUUID = stringToDeterministicUUID(importEventRawId);
  const importSessionId = 'feyn_import_bio-photosynthesis_0_test123';
  const importResourceId = 'guest_res_podcast_import_001';

  async function simulateGuestImport(client, userId) {
    // 1. Topic
    await client.from('saved_topics').upsert(
      { user_id: userId, topic_id: importTopicId, notes: 'Imported from guest session' },
      { onConflict: 'user_id,topic_id' }
    );
    // 2. Activity
    await client.from('activity_events').upsert(
      {
        id: importDeterministicUUID,
        user_id: userId,
        event_type: 'topic_bookmarked',
        topic_id: importTopicId,
        subject_id: 'biology',
        details: 'Imported bookmark event'
      },
      { onConflict: 'user_id,id' }
    );
    // 3. Session
    await client.from('learning_sessions').upsert(
      {
        id: importSessionId,
        user_id: userId,
        topic_id: importTopicId,
        subject_id: 'biology',
        mode: 'feynman-technique',
        status: 'completed',
        turn_count: 3,
        duration_seconds: 120
      },
      { onConflict: 'user_id,id' }
    );
    // 4. Resource
    await client.from('saved_resources').upsert(
      {
        id: importResourceId,
        user_id: userId,
        topic_id: importTopicId,
        subject_id: 'biology',
        resource_type: 'podcast',
        title: 'Photosynthesis Deep Dive',
        content: { title: 'Podcast' }
      },
      { onConflict: 'user_id,id' }
    );
  }

  await runAsyncTest('Guest-to-account import saves all records on first pass', async () => {
    await simulateGuestImport(clientA, userAId);

    const { data: topics } = await clientA.from('saved_topics').select('*').eq('topic_id', importTopicId);
    assert.equal(topics.length, 1);

    const { data: events } = await clientA.from('activity_events').select('*').eq('id', importDeterministicUUID);
    assert.equal(events.length, 1);

    const { data: sessions } = await clientA.from('learning_sessions').select('*').eq('id', importSessionId);
    assert.equal(sessions.length, 1);

    const { data: resources } = await clientA.from('saved_resources').select('*').eq('id', importResourceId);
    assert.equal(resources.length, 1);
  });

  await runAsyncTest('Guest-to-account import is strictly idempotent (zero duplicates on re-import)', async () => {
    // Re-run the exact same import to test retry idempotency
    await simulateGuestImport(clientA, userAId);

    const { data: topics } = await clientA.from('saved_topics').select('*').eq('topic_id', importTopicId);
    assert.equal(topics.length, 1, 'Re-importing topics must not duplicate rows');

    const { data: events } = await clientA.from('activity_events').select('*').eq('id', importDeterministicUUID);
    assert.equal(events.length, 1, 'Re-importing events must not duplicate rows');

    const { data: sessions } = await clientA.from('learning_sessions').select('*').eq('id', importSessionId);
    assert.equal(sessions.length, 1, 'Re-importing sessions must not duplicate rows');

    const { data: resources } = await clientA.from('saved_resources').select('*').eq('id', importResourceId);
    assert.equal(resources.length, 1, 'Re-importing resources must not duplicate rows');
  });

  // --- SECTION 6: DATA EXPORT AND CLEAN TEARDOWN ---
  console.log('\n--- SECTION 6: PERSONAL LEARNING DATA EXPORT & TEARDOWN ---');

  await runAsyncTest('Personal learning data export structure adheres to specification', async () => {
    const [tRes, eRes, sRes, rRes, pRes] = await Promise.all([
      clientA.from('saved_topics').select('*').eq('user_id', userAId),
      clientA.from('activity_events').select('*').eq('user_id', userAId),
      clientA.from('learning_sessions').select('*').eq('user_id', userAId),
      clientA.from('saved_resources').select('*').eq('user_id', userAId),
      clientA.from('learning_preferences').select('*').eq('user_id', userAId)
    ]);

    const exportObject = {
      application: 'MULTIPATH Educational Platform',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      account: { userId: userAId },
      learningData: {
        savedTopics: tRes.data || [],
        activityEvents: eRes.data || [],
        learningSessions: sRes.data || [],
        savedResources: rRes.data || [],
        preferences: pRes.data?.[0] || null
      }
    };

    assert.equal(exportObject.application, 'MULTIPATH Educational Platform');
    assert.equal(exportObject.version, '2.0.0');
    assert.ok(exportObject.learningData.savedTopics.length >= 2);
    assert.ok(exportObject.learningData.activityEvents.length >= 2);
    assert.ok(exportObject.learningData.learningSessions.length >= 2);
    assert.ok(exportObject.learningData.savedResources.length >= 2);
  });

  await runAsyncTest('Clean teardown of test artifacts for repeatable test runs', async () => {
    // Delete test records created in this test run
    await clientA.from('saved_topics').delete().eq('user_id', userAId);
    await clientA.from('activity_events').delete().eq('user_id', userAId);
    await clientA.from('learning_sessions').delete().eq('user_id', userAId);
    await clientA.from('saved_resources').delete().eq('user_id', userAId);
    await clientA.from('learning_preferences').delete().eq('user_id', userAId);

    const { data: remainingTopics } = await clientA.from('saved_topics').select('*').eq('user_id', userAId);
    assert.equal(remainingTopics.length, 0);
  });

  summarize();
}

function summarize() {
  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passedCount + failedCount}`);
  console.log(`PASSED: ${passedCount}`);
  console.log(`FAILED: ${failedCount}`);
  console.log('====================================================');
  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
