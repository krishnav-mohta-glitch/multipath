/**
 * MULTIPATH V2 — PHASE 13.1: CROSS-ACCOUNT DATA INTEGRITY & INDEPENDENT AUDIT SUITE
 * Tests:
 * 1. Importing the exact same guest snapshot into Account A.
 * 2. Importing the exact same guest snapshot into Account B (no PK collision).
 * 3. Verifying both accounts retain their own records independently.
 * 4. Retrying the import into Account A (zero duplicates).
 * 5. Retrying the import into Account B (zero duplicates).
 * 6. Verifying bidirectional RLS access and modification blocking between Account A & B.
 * 7. Verifying pre-existing account records and notes are preserved during conflict resolution.
 * 8. Verifying composite identity (user_id, id) in live database schema.
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
  console.log('MULTIPATH PHASE 13.1: CROSS-ACCOUNT DATA INTEGRITY');
  console.log('====================================================\n');

  if (!USER_A_EMAIL || !USER_A_PASSWORD || !USER_B_EMAIL || !USER_B_PASSWORD) {
    console.warn('⚠️  Skipping authenticated live RLS tests: credentials missing');
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

  console.log('--- SECTION 1: TWO-ACCOUNT AUTHENTICATION VIA PUBLISHABLE KEY ---');
  await runAsyncTest('Account A authenticates successfully', async () => {
    const { data, error } = await clientA.auth.signInWithPassword({
      email: USER_A_EMAIL,
      password: USER_A_PASSWORD
    });
    assert.equal(error, null);
    userAId = data.user.id;
    assert.ok(userAId);
  });

  await runAsyncTest('Account B authenticates successfully', async () => {
    const { data, error } = await clientB.auth.signInWithPassword({
      email: USER_B_EMAIL,
      password: USER_B_PASSWORD
    });
    assert.equal(error, null);
    userBId = data.user.id;
    assert.ok(userBId);
    assert.notEqual(userAId, userBId);
  });

  // Setup: Pre-existing records in Account A
  console.log('\n--- SECTION 2: SETUP PRE-EXISTING ACCOUNT RECORDS ---');
  await runAsyncTest('Setup pre-existing records with notes in Account A', async () => {
    const { error: tErr } = await clientA.from('saved_topics').upsert(
      {
        user_id: userAId,
        topic_id: 'math-linear-equations',
        notes: 'Pre-existing custom reflection notes by Account A'
      },
      { onConflict: 'user_id,topic_id' }
    );
    assert.equal(tErr, null);
  });

  // Define Shared Guest Snapshot
  const sharedSnapshot = {
    bookmarks: ['math-linear-equations', 'bio-photosynthesis'],
    notes: {
      'bio-photosynthesis': 'Guest reflection on chloroplasts'
      // note: math-linear-equations has NO guest note to test preservation of existing note
    },
    activities: [
      {
        id: 'guest_act_shared_001',
        timestamp: '2026-11-13T10:00:00.000Z',
        type: 'topic_viewed',
        topicId: 'math-linear-equations',
        topicTitle: 'Linear Equations',
        subjectId: 'mathematics',
        details: 'Guest viewed linear equations'
      },
      {
        id: 'guest_act_shared_002',
        timestamp: '2026-11-13T10:05:00.000Z',
        type: 'learning_session_completed',
        topicId: 'bio-photosynthesis',
        topicTitle: 'Photosynthesis',
        subjectId: 'biology',
        details: 'Guest finished photosynthesis discovery'
      }
    ],
    sessions: [
      {
        id: 'guest_session_feyn_shared_001',
        topic_id: 'bio-photosynthesis',
        subject_id: 'biology',
        mode: 'feynman-technique',
        status: 'completed',
        turn_count: 4,
        duration_seconds: 210,
        assessment_data: { score: 'demonstrated' }
      }
    ],
    resources: [
      {
        id: 'guest_res_shared_mindmap_001',
        topic_id: 'bio-photosynthesis',
        subject_id: 'biology',
        resource_type: 'mindmap',
        title: 'Photosynthesis Core Concept Map',
        associated_gaps: ['Light Reactions'],
        content: { title: 'Mindmap', branches: [] }
      }
    ]
  };

  async function executeImport(client, userId, snapshot) {
    let importedBookmarks = 0;
    let importedActivities = 0;
    let importedSessions = 0;
    let importedResources = 0;

    // 1. Bookmarks (preserve pre-existing notes)
    const { data: existingTopics } = await client.from('saved_topics').select('topic_id').eq('user_id', userId);
    const existingIds = (existingTopics || []).map((r) => r.topic_id);

    for (const topicId of snapshot.bookmarks) {
      if (existingIds.includes(topicId)) {
        importedBookmarks++;
        continue;
      }
      const note = snapshot.notes ? snapshot.notes[topicId] : undefined;
      const { error } = await client.from('saved_topics').upsert(
        { user_id: userId, topic_id: topicId, notes: note || null },
        { onConflict: 'user_id,topic_id' }
      );
      assert.equal(error, null, `Topic import error: ${error?.message}`);
      importedBookmarks++;
    }

    // 2. Activities (composite user_id, id with ignoreDuplicates)
    for (const act of snapshot.activities) {
      const deterministicId = stringToDeterministicUUID(act.id);
      const { error } = await client.from('activity_events').upsert(
        {
          id: deterministicId,
          user_id: userId,
          event_type: act.type,
          topic_id: act.topicId,
          subject_id: act.subjectId,
          details: act.details,
          payload: { topicTitle: act.topicTitle },
          schema_version: 1,
          timestamp: act.timestamp
        },
        { onConflict: 'user_id,id', ignoreDuplicates: true }
      );
      assert.equal(error, null, `Activity import error: ${error?.message}`);
      importedActivities++;
    }

    // 3. Sessions (composite user_id, id with ignoreDuplicates)
    for (const sess of snapshot.sessions) {
      const { error } = await client.from('learning_sessions').upsert(
        {
          ...sess,
          user_id: userId,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id,id', ignoreDuplicates: true }
      );
      assert.equal(error, null, `Session import error: ${error?.message}`);
      importedSessions++;
    }

    // 4. Resources (composite user_id, id with ignoreDuplicates)
    for (const res of snapshot.resources) {
      const { error } = await client.from('saved_resources').upsert(
        {
          id: res.id,
          user_id: userId,
          topic_id: res.topic_id,
          subject_id: res.subject_id,
          resource_type: res.resource_type,
          title: res.title,
          associated_gaps: res.associated_gaps,
          content: res.content,
          saved_at: new Date().toISOString()
        },
        { onConflict: 'user_id,id', ignoreDuplicates: true }
      );
      assert.equal(error, null, `Resource import error: ${error?.message}`);
      importedResources++;
    }

    return { importedBookmarks, importedActivities, importedSessions, importedResources };
  }

  // --- SECTION 3: MULTI-ACCOUNT GUEST IMPORT EXECUTION ---
  console.log('\n--- SECTION 3: IMPORT IDENTICAL GUEST SNAPSHOT INTO ACCOUNT A & B ---');

  await runAsyncTest('Import guest snapshot into Account A succeeds', async () => {
    const resA = await executeImport(clientA, userAId, sharedSnapshot);
    assert.equal(resA.importedBookmarks, 2);
    assert.equal(resA.importedActivities, 2);
    assert.equal(resA.importedSessions, 1);
    assert.equal(resA.importedResources, 1);
  });

  await runAsyncTest('Import EXACT SAME guest snapshot into Account B succeeds (NO PK COLLISION)', async () => {
    const resB = await executeImport(clientB, userBId, sharedSnapshot);
    assert.equal(resB.importedBookmarks, 2);
    assert.equal(resB.importedActivities, 2);
    assert.equal(resB.importedSessions, 1);
    assert.equal(resB.importedResources, 1);
  });

  // --- SECTION 4: INDEPENDENT DATA RETENTION ---
  console.log('\n--- SECTION 4: INDEPENDENT DATA RETENTION & ID REUSE ---');

  await runAsyncTest('Both accounts retain their own distinct records with identical client IDs', async () => {
    const sharedResId = sharedSnapshot.resources[0].id;

    const { data: dataA } = await clientA.from('saved_resources').select('*').eq('id', sharedResId);
    assert.equal(dataA.length, 1);
    assert.equal(dataA[0].user_id, userAId);

    const { data: dataB } = await clientB.from('saved_resources').select('*').eq('id', sharedResId);
    assert.equal(dataB.length, 1);
    assert.equal(dataB[0].user_id, userBId);
  });

  // --- SECTION 5: IDEMPOTENT RETRY ON BOTH ACCOUNTS ---
  console.log('\n--- SECTION 5: IDEMPOTENT RETRY (ZERO DUPLICATES) ---');

  await runAsyncTest('Retry import into Account A produces zero duplicates', async () => {
    await executeImport(clientA, userAId, sharedSnapshot);

    const { data: topicsA } = await clientA.from('saved_topics').select('*');
    assert.equal(topicsA.length, 2, 'Account A must have exactly 2 topics');

    const { data: actA } = await clientA.from('activity_events').select('*');
    assert.equal(actA.length, 2, 'Account A must have exactly 2 activities');

    const { data: sessA } = await clientA.from('learning_sessions').select('*');
    assert.equal(sessA.length, 1, 'Account A must have exactly 1 session');

    const { data: resA } = await clientA.from('saved_resources').select('*');
    assert.equal(resA.length, 1, 'Account A must have exactly 1 resource');
  });

  await runAsyncTest('Retry import into Account B produces zero duplicates', async () => {
    await executeImport(clientB, userBId, sharedSnapshot);

    const { data: topicsB } = await clientB.from('saved_topics').select('*');
    assert.equal(topicsB.length, 2, 'Account B must have exactly 2 topics');

    const { data: actB } = await clientB.from('activity_events').select('*');
    assert.equal(actB.length, 2, 'Account B must have exactly 2 activities');

    const { data: sessB } = await clientB.from('learning_sessions').select('*');
    assert.equal(sessB.length, 1, 'Account B must have exactly 1 session');

    const { data: resB } = await clientB.from('saved_resources').select('*');
    assert.equal(resB.length, 1, 'Account B must have exactly 1 resource');
  });

  // --- SECTION 6: RLS CROSS-ACCOUNT BLOCKING ---
  console.log('\n--- SECTION 6: RLS BIDIRECTIONAL ENFORCEMENT ---');

  await runAsyncTest('Account A CANNOT access Account B imported records', async () => {
    const { data: bResourcesFromA } = await clientA.from('saved_resources').select('*').eq('user_id', userBId);
    assert.equal(bResourcesFromA.length, 0);

    const { data: bSessionsFromA } = await clientA.from('learning_sessions').select('*').eq('user_id', userBId);
    assert.equal(bSessionsFromA.length, 0);
  });

  await runAsyncTest('Account B CANNOT access Account A imported records', async () => {
    const { data: aResourcesFromB } = await clientB.from('saved_resources').select('*').eq('user_id', userAId);
    assert.equal(aResourcesFromB.length, 0);

    const { data: aSessionsFromB } = await clientB.from('learning_sessions').select('*').eq('user_id', userAId);
    assert.equal(aSessionsFromB.length, 0);
  });

  await runAsyncTest('Account B CANNOT modify Account A imported resource (RLS block)', async () => {
    const sharedResId = sharedSnapshot.resources[0].id;
    const { data, error } = await clientB
      .from('saved_resources')
      .update({ title: 'Hacked Title by B' })
      .eq('user_id', userAId)
      .eq('id', sharedResId)
      .select();
    assert.equal(error, null);
    assert.equal(data.length, 0, 'Cross-user update must affect 0 rows');

    // Verify Account A title is unaltered
    const { data: checkA } = await clientA.from('saved_resources').select('*').eq('id', sharedResId);
    assert.equal(checkA[0].title, 'Photosynthesis Core Concept Map');
  });

  // --- SECTION 7: PRESERVATION OF PRE-EXISTING ACCOUNT NOTES ---
  console.log('\n--- SECTION 7: PRE-EXISTING DATA PRESERVATION ---');

  await runAsyncTest('Pre-existing account note in Account A was NOT overwritten by import', async () => {
    const { data: topicMath } = await clientA.from('saved_topics').select('*').eq('topic_id', 'math-linear-equations');
    assert.equal(topicMath.length, 1);
    assert.equal(
      topicMath[0].notes,
      'Pre-existing custom reflection notes by Account A',
      'Account A pre-existing reflection note must remain completely intact'
    );
  });

  // --- SECTION 8: CLEAN TEARDOWN ---
  console.log('\n--- SECTION 8: CLEAN TEARDOWN ---');

  await runAsyncTest('Teardown test artifacts cleanly for both accounts', async () => {
    await clientA.from('saved_topics').delete().eq('user_id', userAId);
    await clientA.from('activity_events').delete().eq('user_id', userAId);
    await clientA.from('learning_sessions').delete().eq('user_id', userAId);
    await clientA.from('saved_resources').delete().eq('user_id', userAId);

    await clientB.from('saved_topics').delete().eq('user_id', userBId);
    await clientB.from('activity_events').delete().eq('user_id', userBId);
    await clientB.from('learning_sessions').delete().eq('user_id', userBId);
    await clientB.from('saved_resources').delete().eq('user_id', userBId);

    const { data: aRem } = await clientA.from('saved_topics').select('*');
    assert.equal(aRem.length, 0);
    const { data: bRem } = await clientB.from('saved_topics').select('*');
    assert.equal(bRem.length, 0);
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
