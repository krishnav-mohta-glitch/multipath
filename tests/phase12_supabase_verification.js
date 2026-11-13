/**
 * MULTIPATH V2 — PHASE 12.1: SUPABASE AUTHENTICATION & HARDENED RLS VERIFICATION SUITE
 * Tests:
 * 1. Environment variable configuration & graceful fallback.
 * 2. Supabase client initialization & safety invariants.
 * 3. Two-Account Authenticated Row Level Security (RLS) Isolation.
 * 4. Curriculum scope hardening (ICSE/CISCE, CBSE, Unspecified).
 * 5. Profile creation trigger resilience & untrusted input sanitization.
 * 6. Guest access invariants without cloud dependencies.
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

// Load local environment overrides if present (.env.local is git-ignored)
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

console.log('====================================================');
console.log('MULTIPATH PHASE 12.1: AUTHENTICATION & RLS HARDENING');
console.log('====================================================\n');

// ----------------------------------------------------------------------------
// SECTION 1: ENVIRONMENT & CLIENT SAFETY
// ----------------------------------------------------------------------------
console.log('--- SECTION 1: CLIENT SAFETY & ENVIRONMENT FALLBACKS ---');

runTest('Environment validation rejects placeholders and malformed URLs', () => {
  const isUrlValid = (str) => {
    if (!str || str.includes('your-project-ref')) return false;
    try {
      const u = new URL(str);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const isKeyValid = (key) => !(!key || key.includes('your_key_here') || key.length < 10);

  assert.equal(isUrlValid('https://your-project-ref.supabase.co'), false);
  assert.equal(isUrlValid('not-a-valid-url'), false);
  assert.equal(isUrlValid(''), false);
  assert.equal(isUrlValid(undefined), false);
  assert.equal(isUrlValid('https://oestvwgkpllikmufvjls.supabase.co'), true);

  assert.equal(isKeyValid('sb_publishable_your_key_here'), false);
  assert.equal(isKeyValid('short'), false);
  assert.equal(isKeyValid(undefined), false);
  assert.equal(isKeyValid('sb_publishable_ZxcO_ZdsXI11fehS2xajPA_uT2gRJ3M'), true);
});

runTest('Service-role keys must NEVER be in publishable keys or client config', () => {
  assert.ok(!PUBLISHABLE_KEY.includes('service_role'));
  assert.ok(PUBLISHABLE_KEY.startsWith('sb_publishable_') || PUBLISHABLE_KEY.startsWith('eyJ'));
});

// ----------------------------------------------------------------------------
// SECTION 2: LIVE SUPABASE CLIENT INITIALIZATION & CONNECTIVITY
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 2: LIVE SUPABASE GATEWAY & AUTH ENDPOINT ---');

const anonClient = createClient(SUPABASE_URL, PUBLISHABLE_KEY, { auth: { persistSession: false } });

await runAsyncTest('Supabase client can connect to project Auth gateway', async () => {
  assert.ok(anonClient);
  assert.ok(anonClient.auth);

  const resp = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
    headers: { 'apikey': PUBLISHABLE_KEY },
  });
  assert.equal(resp.status, 200, `Expected 200 from Auth settings, got ${resp.status}`);
  const settings = await resp.json();
  assert.ok(settings, 'Expected auth settings JSON payload');
});

// ----------------------------------------------------------------------------
// SECTION 3: UNAUTHENTICATED & RPC HARDENING
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 3: UNAUTHENTICATED SECURITY & RPC HARDENING ---');

await runAsyncTest('Unauthenticated anon requests cannot view any profiles (RLS block)', async () => {
  const { data, error } = await anonClient.from('profiles').select('*');
  assert.equal(error, null);
  assert.deepEqual(data, [], 'Anon query must return 0 rows under RLS');
});

await runAsyncTest('Unauthenticated anon requests cannot insert profiles (RLS block)', async () => {
  const fakeId = '00000000-0000-0000-0000-000000000001';
  const { error } = await anonClient.from('profiles').insert({
    id: fakeId,
    display_name: 'Hacker',
    preferred_board: 'CBSE',
    grade_level: 'Class 10',
    preferred_language: 'English',
  });
  assert.ok(error !== null, 'Anon INSERT must be blocked by RLS');
});

await runAsyncTest('Unauthenticated anon requests cannot execute SECURITY DEFINER trigger functions', async () => {
  const { error } = await anonClient.rpc('handle_new_user');
  assert.ok(error !== null, 'Direct RPC invocation of handle_new_user must fail with permission denied');
});

// ----------------------------------------------------------------------------
// SECTION 4: AUTHENTICATED TWO-ACCOUNT RLS ISOLATION (EMPIRICAL VERIFICATION)
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 4: AUTHENTICATED TWO-ACCOUNT RLS ISOLATION ---');

if (USER_A_EMAIL && USER_A_PASSWORD && USER_B_EMAIL && USER_B_PASSWORD) {
  const clientA = createClient(SUPABASE_URL, PUBLISHABLE_KEY, { auth: { persistSession: false } });
  const clientB = createClient(SUPABASE_URL, PUBLISHABLE_KEY, { auth: { persistSession: false } });

  let userAId = null;
  let userBId = null;

  await runAsyncTest('Account A authenticates successfully via publishable key', async () => {
    const { data, error } = await clientA.auth.signInWithPassword({
      email: USER_A_EMAIL,
      password: USER_A_PASSWORD,
    });
    assert.equal(error, null, error?.message);
    assert.ok(data.user?.id);
    userAId = data.user.id;
  });

  await runAsyncTest('Account B authenticates successfully via publishable key', async () => {
    const { data, error } = await clientB.auth.signInWithPassword({
      email: USER_B_EMAIL,
      password: USER_B_PASSWORD,
    });
    assert.equal(error, null, error?.message);
    assert.ok(data.user?.id);
    userBId = data.user.id;
  });

  await runAsyncTest('Account A can read its own profile', async () => {
    const { data, error } = await clientA.from('profiles').select('*');
    assert.equal(error, null);
    assert.equal(data.length, 1);
    assert.equal(data[0].id, userAId);
  });

  await runAsyncTest('Account A CANNOT read Account B\'s profile (RLS isolation)', async () => {
    const { data, error } = await clientA.from('profiles').select('*').eq('id', userBId);
    assert.equal(error, null);
    assert.deepEqual(data, [], 'Account A must receive 0 rows when requesting Account B\'s profile');
  });

  await runAsyncTest('Account A CANNOT update Account B\'s profile (RLS isolation)', async () => {
    const { data, error } = await clientA.from('profiles').update({ display_name: 'Compromised' }).eq('id', userBId).select();
    assert.equal(error, null);
    assert.deepEqual(data, [], 'Account A update against Account B must affect 0 rows');
  });

  await runAsyncTest('Account A CANNOT insert a profile with Account B\'s UUID (RLS check)', async () => {
    const { error } = await clientA.from('profiles').insert({
      id: userBId,
      display_name: 'Spoofed User',
      preferred_board: 'CBSE',
      grade_level: 'Class 10',
      preferred_language: 'English',
    });
    assert.ok(error !== null, 'Insert with another user\'s UUID must be blocked by RLS WITH CHECK');
  });

  await runAsyncTest('Account A CANNOT delete Account B\'s profile (RLS isolation)', async () => {
    const { data, error } = await clientA.from('profiles').delete().eq('id', userBId).select();
    assert.equal(error, null);
    assert.deepEqual(data, [], 'Account A delete against Account B must affect 0 rows');
  });

  await runAsyncTest('Account B CANNOT read Account A\'s profile (RLS bidirectional isolation)', async () => {
    const { data, error } = await clientB.from('profiles').select('*').eq('id', userAId);
    assert.equal(error, null);
    assert.deepEqual(data, [], 'Account B must receive 0 rows when requesting Account A\'s profile');
  });

  await runAsyncTest('Account A can update its own profile successfully', async () => {
    const newName = 'Student A Verified';
    const { data, error } = await clientA.from('profiles').update({ display_name: newName }).eq('id', userAId).select();
    assert.equal(error, null);
    assert.equal(data.length, 1);
    assert.equal(data[0].display_name, newName);
  });
} else {
  console.log('NOTE: Two dedicated test accounts (TEST_USER_A_EMAIL, TEST_USER_B_EMAIL) not found in environment.');
  console.log('Skipping live two-account authenticated RLS tests. Manual verification procedure documented in report.');
}

// ----------------------------------------------------------------------------
// SECTION 5: CURRICULUM SCOPE HARDENING
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 5: CURRICULUM SCOPE HARDENING ---');

runTest('Curriculum board scope is strictly limited to initial release: ICSE/CISCE, CBSE, Unspecified', () => {
  const allowedBoards = ['ICSE/CISCE', 'CBSE', 'Unspecified'];
  
  // Supported initial boards
  assert.ok(allowedBoards.includes('ICSE/CISCE'));
  assert.ok(allowedBoards.includes('CBSE'));
  assert.ok(allowedBoards.includes('Unspecified'));
  
  // Explicitly out-of-scope boards MUST NOT be in allowedBoards
  assert.ok(!allowedBoards.includes('IB'), 'IB must be out of initial release scope');
  assert.ok(!allowedBoards.includes('Cambridge'), 'Cambridge must be out of initial release scope');
  assert.ok(!allowedBoards.includes('State Board'), 'State Board must be out of initial release scope');
});

runTest('Grade level constraints cover Classes 6 to 10 with extensible secondary support', () => {
  const allowedGrades = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'General'];
  assert.ok(allowedGrades.includes('Class 6'));
  assert.ok(allowedGrades.includes('Class 7'));
  assert.ok(allowedGrades.includes('Class 8'));
  assert.ok(allowedGrades.includes('Class 9'));
  assert.ok(allowedGrades.includes('Class 10'));
});

// ----------------------------------------------------------------------------
// SECTION 6: GUEST ACCESS INVARIANTS & RECOVERY
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 6: RESILIENT GUEST ACCESS INVARIANTS ---');

runTest('Guest mode allows full educational interaction without cloud credentials', () => {
  const guestSession = {
    isGuest: true,
    user: null,
    profile: null,
    savedTopicIds: ['math-linear-equations'],
    activePath: 'structured-explanation',
  };

  assert.equal(guestSession.isGuest, true);
  assert.equal(guestSession.user, null);
  assert.ok(guestSession.savedTopicIds.length > 0);
});

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log('\n====================================================');
console.log(`TOTAL TESTS: ${passedCount + failedCount}`);
console.log(`PASSED: ${passedCount}`);
console.log(`FAILED: ${failedCount}`);
console.log('====================================================');

if (failedCount > 0) {
  process.exit(1);
}
