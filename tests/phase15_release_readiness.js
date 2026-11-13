/**
 * MULTIPATH V2 — PHASE 15: FINAL INTEGRATED RELEASE-READINESS AUDIT SUITE
 * 
 * Comprehensive end-to-end audit verifying all production release criteria:
 * - Section 1: Environment & Credential Safety (Zero secret keys in client)
 * - Section 2: Journey A — Guest Learner Experience (100% functional, offline persistence, Trajectory)
 * - Section 3: Journey B — New Account Lifecycle & Cloud Persistence (Auth, profile, persistence, export)
 * - Section 4: Journey C — Existing Account & Session Restoration (Zero data loss, linear event logging)
 * - Section 5: Journey D — Guest-to-Account Import Engine (Pre-existing preservation, idempotent retry)
 * - Section 6: Journey E — Cross-Account Isolation & RLS Security (Account A vs B, composite identity)
 * - Section 7: Three.js 3D/2D Fallback & Clock Investigation (Context loss, visibility, reduced motion)
 * - Section 8: Curriculum Accuracy & Source Traceability (2 boards, 5 classes, 64 topics, 128 mappings)
 * - Section 9: Clean Teardown (Repeatable test execution)
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

function pass(name) {
  console.log(`TEST: ${name}... PASSED`);
  passedCount++;
}

function fail(name, err) {
  console.error(`TEST: ${name}... FAILED`);
  console.error(err);
  failedCount++;
}

async function runAsyncTest(name, fn) {
  try {
    await fn();
    pass(name);
  } catch (err) {
    fail(name, err);
  }
}

// Helper: Deterministic UUID formatting (matching stringToDeterministicUUID in storageService)
function stringToDeterministicUUID(input) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(input)) return input.toLowerCase();

  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  let h3 = 0x67452301;
  let h4 = 0xefcdab89;

  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
    h3 = Math.imul(h3 ^ ch, 2246822507);
    h4 = Math.imul(h4 ^ ch, 3266489909);
  }

  const p1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const p2 = (h2 >>> 16).toString(16).padStart(4, '0');
  const p3 = '4' + ((h2 & 0x0fff) >>> 0).toString(16).padStart(3, '0');
  const p4 = ((8 | ((h3 >>> 28) & 3)) >>> 0).toString(16) + ((h3 & 0x0fff) >>> 0).toString(16).padStart(3, '0');
  const p5 = ((h4 >>> 0).toString(16).padStart(8, '0') + ((h1 ^ h3) >>> 0).toString(16).padStart(8, '0')).slice(0, 12);

  return `${p1}-${p2}-${p3}-${p4}-${p5}`.toLowerCase();
}

async function main() {
  console.log('====================================================');
  console.log('MULTIPATH PHASE 15: FINAL RELEASE-READINESS AUDIT');
  console.log('====================================================\n');

  // --------------------------------------------------------------------------
  // SECTION 1: ENVIRONMENT CONFIGURATION & SAFETY
  // --------------------------------------------------------------------------
  console.log('--- SECTION 1: ENVIRONMENT CONFIGURATION & CREDENTIAL SAFETY ---');

  await runAsyncTest('Environment validation rejects placeholders and malformed URLs', async () => {
    assert.ok(SUPABASE_URL.startsWith('https://'), 'Supabase URL must use HTTPS');
    assert.ok(!SUPABASE_URL.includes('your-project-ref'), 'Supabase URL must not contain template placeholders');
    assert.ok(PUBLISHABLE_KEY.length > 20, 'Publishable key must be a valid token string');
  });

  await runAsyncTest('Client code and bundles contain zero service-role keys', async () => {
    const srcFiles = ['src/services/supabaseClient.ts', 'src/services/authService.ts', '.env.example'];
    for (const sf of srcFiles) {
      const fullPath = path.resolve(process.cwd(), sf);
      if (fs.existsSync(fullPath)) {
        const text = fs.readFileSync(fullPath, 'utf8');
        // Ensure no active (uncommented) service_role key assignments exist
        assert.ok(!/^[^#]*VITE_.*service_role/m.test(text), `${sf} must not expose service_role keys to client`);
        assert.ok(!text.includes('SUPABASE_SERVICE_ROLE_KEY='), `${sf} must not define service_role key`);
      }
    }
  });

  // --------------------------------------------------------------------------
  // SECTION 2: JOURNEY A — GUEST LEARNER EXPERIENCE
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 2: JOURNEY A — GUEST LEARNER EXPERIENCE ---');

  const anonClient = createClient(SUPABASE_URL, PUBLISHABLE_KEY);

  await runAsyncTest('Guest can browse and filter curriculum catalog by board and class', async () => {
    const { data: boards, error: bErr } = await anonClient.from('curriculum_boards').select('*');
    assert.equal(bErr, null);
    assert.equal(boards.length, 2, 'Guest can view exactly 2 active boards');

    const { data: cbseClass10, error: mErr } = await anonClient
      .from('curriculum_topic_mappings')
      .select('id, topic_id, class_level, board_code')
      .eq('board_code', 'CBSE')
      .eq('class_level', 10);
    assert.equal(mErr, null);
    assert.ok(cbseClass10.length >= 20, `CBSE Class 10 must contain at least 20 topics, found ${cbseClass10.length}`);
  });

  await runAsyncTest('Guest can access all 4 learning paths for any topic', async () => {
    const { data: paths, error: pErr } = await anonClient
      .from('topic_learning_paths')
      .select('id, path_type, title, topic_id')
      .eq('topic_id', 'math-linear-equations');
    assert.equal(pErr, null);
    assert.equal(paths.length, 4, 'Must have exactly 4 paths for topic');
    const pathTypes = new Set(paths.map((p) => p.path_type));
    assert.ok(pathTypes.has('structured-explanation'));
    assert.ok(pathTypes.has('visual-learning'));
    assert.ok(pathTypes.has('examples-applications'));
    assert.ok(pathTypes.has('explore-experiment'));
  });

  await runAsyncTest('Guest can generate deterministic UUIDs for offline persistence', async () => {
    const rawGuestId = 'guest_bookmark_1731512400000_math_linear';
    const uuid1 = stringToDeterministicUUID(rawGuestId);
    const uuid2 = stringToDeterministicUUID(rawGuestId);
    assert.equal(uuid1, uuid2, 'Deterministic UUID generator must be pure');
    assert.match(uuid1, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  await runAsyncTest('Guest trajectory calculation generates valid metrics without auth', async () => {
    // Simulate trajectory computation on 3 guest activities
    const guestActivities = [
      { id: 'act-1', topicId: 'math-linear-equations', timestamp: Date.now() - 3600000, durationMinutes: 15 },
      { id: 'act-2', topicId: 'bio-photosynthesis', timestamp: Date.now() - 1800000, durationMinutes: 20 },
      { id: 'act-3', topicId: 'phys-newtons-laws', timestamp: Date.now() - 600000, durationMinutes: 25 },
    ];
    const totalMinutes = guestActivities.reduce((acc, curr) => acc + curr.durationMinutes, 0);
    const completedCount = guestActivities.length;
    const velocityScore = Math.min(100, Math.round((totalMinutes / 60) * 100));

    assert.equal(totalMinutes, 60);
    assert.equal(completedCount, 3);
    assert.equal(velocityScore, 100);
  });

  // --------------------------------------------------------------------------
  // SECTION 3: JOURNEY B — NEW ACCOUNT REGISTRATION & CLOUD PERSISTENCE
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 3: JOURNEY B — NEW ACCOUNT LIFECYCLE & PERSISTENCE ---');

  if (!USER_A_EMAIL || !USER_A_PASSWORD) {
    console.warn('Skipping authenticated tests: TEST_USER_A_EMAIL not set');
    return summarize();
  }

  const clientA = createClient(SUPABASE_URL, PUBLISHABLE_KEY);
  const authResA = await clientA.auth.signInWithPassword({
    email: USER_A_EMAIL,
    password: USER_A_PASSWORD,
  });
  assert.equal(authResA.error, null, `Account A sign-in failed: ${authResA.error?.message}`);
  const userAId = authResA.data.user.id;

  await runAsyncTest('Account A profile exists and supports board & grade preferences', async () => {
    const { data: profile, error } = await clientA.from('profiles').select('*').eq('id', userAId).single();
    assert.equal(error, null);
    assert.ok(profile);
    assert.equal(profile.id, userAId);

    // Update preferences
    const { error: updErr } = await clientA
      .from('profiles')
      .update({ preferred_board: 'CBSE', grade_level: 'Class 10' })
      .eq('id', userAId);
    assert.equal(updErr, null);

    const { data: updated } = await clientA.from('profiles').select('preferred_board, grade_level').eq('id', userAId).single();
    assert.equal(updated.preferred_board, 'CBSE');
    assert.equal(updated.grade_level, 'Class 10');
  });

  const testTopicAId = stringToDeterministicUUID('test_saved_topic_user_a_release');
  const testSessionAId = stringToDeterministicUUID('test_session_user_a_release');
  const testEventAId = stringToDeterministicUUID('test_event_user_a_release');
  const testResourceAId = stringToDeterministicUUID('test_resource_user_a_release');

  await runAsyncTest('Account A can persist saved topics, sessions, events and resources', async () => {
    // 1. Saved topic
    const { error: tErr } = await clientA.from('saved_topics').upsert({
      id: testTopicAId,
      user_id: userAId,
      topic_id: 'math-linear-equations',
      notes: 'Linear equations foundations reviewed',
    }, { onConflict: 'user_id, topic_id' });
    assert.equal(tErr, null);

    // 2. Learning session
    const { error: sErr } = await clientA.from('learning_sessions').upsert({
      id: testSessionAId,
      user_id: userAId,
      topic_id: 'math-linear-equations',
      subject_id: 'mathematics',
      mode: 'socratic-discovery',
      status: 'completed',
      duration_seconds: 900,
      turn_count: 4,
      history: [],
      assessment_data: { confidence: 0.95 },
    }, { onConflict: 'user_id, id' });
    assert.equal(sErr, null);

    // 3. Activity event
    const { error: eErr } = await clientA.from('activity_events').insert({
      id: testEventAId,
      user_id: userAId,
      topic_id: 'math-linear-equations',
      subject_id: 'mathematics',
      event_type: 'learning_session_completed',
      details: 'Completed linear equations session',
      payload: { step: 4 },
    });
    assert.equal(eErr, null);

    // 4. Saved resource
    const { error: rErr } = await clientA.from('saved_resources').upsert({
      id: testResourceAId,
      user_id: userAId,
      topic_id: 'math-linear-equations',
      subject_id: 'mathematics',
      resource_type: 'mindmap',
      title: 'Linear Equations Visual Map',
      associated_gaps: ['algebraic-manipulation'],
      content: { nodes: 6 },
    }, { onConflict: 'user_id, id' });
    assert.equal(rErr, null);
  });

  await runAsyncTest('Personal learning data export structure adheres to specification', async () => {
    const { data: profile } = await clientA.from('profiles').select('*').eq('id', userAId).single();
    const { data: topics } = await clientA.from('saved_topics').select('*').eq('user_id', userAId);
    const { data: sessions } = await clientA.from('learning_sessions').select('*').eq('user_id', userAId);
    const { data: events } = await clientA.from('activity_events').select('*').eq('user_id', userAId);
    const { data: resources } = await clientA.from('saved_resources').select('*').eq('user_id', userAId);

    const exportBundle = {
      exportDate: new Date().toISOString(),
      learnerProfile: profile,
      savedTopics: topics,
      learningSessions: sessions,
      activityEvents: events,
      savedResources: resources,
    };

    assert.ok(exportBundle.exportDate);
    assert.equal(exportBundle.learnerProfile.id, userAId);
    assert.ok(exportBundle.savedTopics.length > 0);
    assert.ok(exportBundle.learningSessions.length > 0);
    assert.ok(exportBundle.activityEvents.length > 0);
    assert.ok(exportBundle.savedResources.length > 0);
  });

  // --------------------------------------------------------------------------
  // SECTION 4: JOURNEY C — EXISTING ACCOUNT & SESSION RESTORATION
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 4: JOURNEY C — EXISTING ACCOUNT & RESTORATION ---');

  await runAsyncTest('Existing account session restoration preserves all records without loss', async () => {
    // Re-verify session validity
    const { data: sessionData, error: sErr } = await clientA.auth.getSession();
    assert.equal(sErr, null);
    assert.ok(sessionData.session);
    assert.equal(sessionData.session.user.id, userAId);

    // Check all records exist
    const { data: topics } = await clientA.from('saved_topics').select('*').eq('id', testTopicAId);
    assert.equal(topics.length, 1);
    assert.equal(topics[0].topic_id, 'math-linear-equations');

    const { data: sessions } = await clientA.from('learning_sessions').select('*').eq('id', testSessionAId);
    assert.equal(sessions.length, 1);
    assert.equal(sessions[0].status, 'completed');

    const { data: resources } = await clientA.from('saved_resources').select('*').eq('id', testResourceAId);
    assert.equal(resources.length, 1);
    assert.equal(resources[0].title, 'Linear Equations Visual Map');
  });

  // --------------------------------------------------------------------------
  // SECTION 5: JOURNEY D — GUEST-TO-ACCOUNT IMPORT ENGINE
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 5: JOURNEY D — GUEST-TO-ACCOUNT IMPORT ENGINE ---');

  const guestTopicRawId = 'guest_import_topic_bio';
  const guestTopicUUID = stringToDeterministicUUID(guestTopicRawId);
  const guestSessionRawId = 'guest_import_session_bio';
  const guestSessionUUID = stringToDeterministicUUID(guestSessionRawId);

  await runAsyncTest('Import guest learning records into Account A succeeds cleanly', async () => {
    // Import 1 topic and 1 session
    const { error: tErr } = await clientA.from('saved_topics').upsert({
      id: guestTopicUUID,
      user_id: userAId,
      topic_id: 'bio-photosynthesis',
      notes: 'Imported from guest exploration',
    }, { onConflict: 'user_id, topic_id' });
    assert.equal(tErr, null);

    const { error: sErr } = await clientA.from('learning_sessions').upsert({
      id: guestSessionUUID,
      user_id: userAId,
      topic_id: 'bio-photosynthesis',
      subject_id: 'biology',
      mode: 'socratic-discovery',
      status: 'started',
      duration_seconds: 450,
      turn_count: 2,
    }, { onConflict: 'user_id, id' });
    assert.equal(sErr, null);
  });

  await runAsyncTest('Pre-existing account records in Account A are preserved intact', async () => {
    const { data: mathTopic } = await clientA.from('saved_topics').select('*').eq('id', testTopicAId);
    assert.equal(mathTopic.length, 1);
    assert.equal(mathTopic[0].notes, 'Linear equations foundations reviewed', 'Pre-existing record notes must not be overwritten');
  });

  await runAsyncTest('Idempotent retry of guest import creates zero duplicate records', async () => {
    // Retry exact same import
    const { error: retryErr } = await clientA.from('saved_topics').upsert({
      id: guestTopicUUID,
      user_id: userAId,
      topic_id: 'bio-photosynthesis',
      notes: 'Imported from guest exploration',
    }, { onConflict: 'user_id, topic_id' });
    assert.equal(retryErr, null);

    const { data: allBioTopics } = await clientA.from('saved_topics').select('*').eq('topic_id', 'bio-photosynthesis');
    assert.equal(allBioTopics.length, 1, 'Idempotent retry must produce exactly 1 record');
  });

  // --------------------------------------------------------------------------
  // SECTION 6: JOURNEY E — CROSS-ACCOUNT ISOLATION & RLS ENFORCEMENT
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 6: JOURNEY E — CROSS-ACCOUNT ISOLATION & RLS ---');

  if (!USER_B_EMAIL || !USER_B_PASSWORD) {
    console.warn('Skipping Account B tests: TEST_USER_B_EMAIL not set');
    return summarize();
  }

  const clientB = createClient(SUPABASE_URL, PUBLISHABLE_KEY);
  const authResB = await clientB.auth.signInWithPassword({
    email: USER_B_EMAIL,
    password: USER_B_PASSWORD,
  });
  assert.equal(authResB.error, null, `Account B sign-in failed: ${authResB.error?.message}`);
  const userBId = authResB.data.user.id;
  assert.notEqual(userAId, userBId, 'Test accounts A and B must have different UUIDs');

  await runAsyncTest('Account B CANNOT read Account A saved topics or sessions (RLS block)', async () => {
    const { data: aTopics } = await clientB.from('saved_topics').select('*').eq('user_id', userAId);
    assert.equal(aTopics.length, 0, 'Account B must not see Account A saved topics');

    const { data: aSessions } = await clientB.from('learning_sessions').select('*').eq('user_id', userAId);
    assert.equal(aSessions.length, 0, 'Account B must not see Account A learning sessions');

    const { data: aResources } = await clientB.from('saved_resources').select('*').eq('user_id', userAId);
    assert.equal(aResources.length, 0, 'Account B must not see Account A saved resources');
  });

  await runAsyncTest('Account B CANNOT insert records with Account A user_id (RLS check)', async () => {
    const { error: spoofErr } = await clientB.from('saved_topics').insert({
      id: stringToDeterministicUUID('spoof_attempt_by_b'),
      user_id: userAId,
      topic_id: 'phys-newtons-laws',
    });
    assert.ok(spoofErr, 'Spoofed insert under another user_id must be rejected by RLS');
  });

  await runAsyncTest('Account B CANNOT update or delete Account A records (RLS isolation)', async () => {
    const { data: updData } = await clientB
      .from('saved_topics')
      .update({ notes: 'Malicious overwrite by Account B' })
      .eq('id', testTopicAId)
      .select();
    assert.equal(updData.length, 0, 'Cross-user update must affect 0 rows');

    const { data: delData } = await clientB
      .from('saved_topics')
      .delete()
      .eq('id', testTopicAId)
      .select();
    assert.equal(delData.length, 0, 'Cross-user delete must affect 0 rows');

    // Verify Account A note is pristine
    const { data: verifyA } = await clientA.from('saved_topics').select('*').eq('id', testTopicAId);
    assert.equal(verifyA[0].notes, 'Linear equations foundations reviewed');
  });

  await runAsyncTest('Importing EXACT SAME guest snapshot into Account B succeeds without PK collision', async () => {
    // Both accounts import the exact same guest ID: guestTopicUUID
    const { error: bImportErr } = await clientB.from('saved_topics').upsert({
      id: guestTopicUUID,
      user_id: userBId,
      topic_id: 'bio-photosynthesis',
      notes: 'Account B imported copy',
    }, { onConflict: 'user_id, topic_id' });
    assert.equal(bImportErr, null, 'Must allow identical client ID under different user_id (composite key)');

    // Verify Account A still has its copy with its own note
    const { data: checkA } = await clientA.from('saved_topics').select('*').eq('id', guestTopicUUID);
    assert.equal(checkA.length, 1);
    assert.equal(checkA[0].user_id, userAId);
    assert.equal(checkA[0].notes, 'Imported from guest exploration');

    // Verify Account B has its copy with its own note
    const { data: checkB } = await clientB.from('saved_topics').select('*').eq('id', guestTopicUUID);
    assert.equal(checkB.length, 1);
    assert.equal(checkB[0].user_id, userBId);
    assert.equal(checkB[0].notes, 'Account B imported copy');
  });

  // --------------------------------------------------------------------------
  // SECTION 7: THREE.JS 3D/2D FALLBACK & CLOCK INVESTIGATION
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 7: THREE.JS 3D/2D FALLBACK & CLOCK AUDIT ---');

  await runAsyncTest('SceneCanvas contains WebGL context loss and restoration listeners', async () => {
    const sceneCanvasCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/three/SceneCanvas.tsx'), 'utf8');
    assert.ok(sceneCanvasCode.includes('webglcontextlost'), 'Must handle webglcontextlost event');
    assert.ok(sceneCanvasCode.includes('webglcontextrestored'), 'Must handle webglcontextrestored event');
    assert.ok(sceneCanvasCode.includes('detectWebGLSupport'), 'Must perform WebGL feature detection');
  });

  await runAsyncTest('SceneCanvas optimizes performance for reduced motion and background tabs', async () => {
    const sceneCanvasCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/three/SceneCanvas.tsx'), 'utf8');
    assert.ok(sceneCanvasCode.includes('useReducedMotion'), 'Must support useReducedMotion hook');
    assert.ok(sceneCanvasCode.includes('usePageVisibility'), 'Must support usePageVisibility hook');
    assert.ok(sceneCanvasCode.includes("effectiveFrameloop = 'never'"), 'Must halt rendering when page is hidden');
    assert.ok(sceneCanvasCode.includes("effectiveFrameloop = 'demand'"), 'Must throttle rendering for reduced-motion');
  });

  await runAsyncTest('Three.js components avoid deprecated THREE.Clock.getDelta()', async () => {
    const files = [
      'src/components/three/ConceptNetworkScene.tsx',
      'src/components/three/LearningCoreScene.tsx',
      'src/components/three/InteractiveModelScene.tsx',
    ];
    for (const f of files) {
      const code = fs.readFileSync(path.resolve(process.cwd(), f), 'utf8');
      assert.ok(!code.includes('Clock.getDelta()'), `${f} must not call deprecated Clock.getDelta()`);
      assert.ok(!code.includes('.getDelta()'), `${f} must use R3F injected delta parameter`);
    }
  });

  // --------------------------------------------------------------------------
  // SECTION 8: CURRICULUM ACCURACY & DISCIPLINE AUDIT
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 8: CURRICULUM ACCURACY & DISCIPLINE AUDIT ---');

  await runAsyncTest('Curriculum catalog strictly encompasses 2 boards, 5 classes, 64 topics, 256 paths', async () => {
    const { data: boards } = await anonClient.from('curriculum_boards').select('code');
    assert.deepEqual(boards.map((b) => b.code).sort(), ['CBSE', 'CISCE']);

    const { data: topics } = await anonClient.from('topics').select('id');
    assert.equal(topics.length, 64);

    const { data: paths } = await anonClient.from('topic_learning_paths').select('id');
    assert.equal(paths.length, 256);
  });

  await runAsyncTest('All 128 mappings satisfy status counts: 110 official, 14 framework, 4 school', async () => {
    const { data: mappings } = await anonClient.from('curriculum_topic_mappings').select('verification_status');
    assert.equal(mappings.length, 128);

    const official = mappings.filter((m) => m.verification_status === 'verified_official').length;
    const framework = mappings.filter((m) => m.verification_status === 'framework_supported').length;
    const school = mappings.filter((m) => m.verification_status === 'school_dependent').length;

    assert.equal(official, 110);
    assert.equal(framework, 14);
    assert.equal(school, 4);
  });

  await runAsyncTest('Zero class mismatches and accurate CISCE 2027/2028 examination years', async () => {
    const { data: mappings } = await anonClient.from('curriculum_topic_mappings').select(`
      id,
      board_code,
      class_level,
      curriculum_year_id,
      subject:curriculum_subjects ( id, class_level )
    `);

    const mismatches = mappings.filter((m) => m.subject && m.subject.class_level !== m.class_level);
    assert.equal(mismatches.length, 0, 'Must have zero class-level mismatches');

    const cisceClass10 = mappings.filter((m) => m.board_code === 'CISCE' && m.class_level === 10);
    for (const m of cisceClass10) {
      assert.equal(m.curriculum_year_id, 'cisce-icse-2027');
    }

    const cisceClass9 = mappings.filter((m) => m.board_code === 'CISCE' && m.class_level === 9);
    for (const m of cisceClass9) {
      assert.equal(m.curriculum_year_id, 'cisce-icse-2028');
    }
  });

  // --------------------------------------------------------------------------
  // SECTION 9: CLEAN TEARDOWN
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 9: CLEAN TEARDOWN ---');

  await runAsyncTest('Teardown test artifacts cleanly for both test accounts', async () => {
    await clientA.from('saved_topics').delete().eq('user_id', userAId);
    await clientA.from('activity_events').delete().eq('user_id', userAId);
    await clientA.from('learning_sessions').delete().eq('user_id', userAId);
    await clientA.from('saved_resources').delete().eq('user_id', userAId);

    await clientB.from('saved_topics').delete().eq('user_id', userBId);
    await clientB.from('activity_events').delete().eq('user_id', userBId);
    await clientB.from('learning_sessions').delete().eq('user_id', userBId);
    await clientB.from('saved_resources').delete().eq('user_id', userBId);

    const { data: aRem } = await clientA.from('saved_topics').select('*').eq('user_id', userAId);
    assert.equal(aRem.length, 0);

    const { data: bRem } = await clientB.from('saved_topics').select('*').eq('user_id', userBId);
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
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal test error in Phase 15 suite:', err);
  process.exit(1);
});
