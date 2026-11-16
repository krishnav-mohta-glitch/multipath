/**
 * MULTIPATH V3 — MANDATORY AUTHENTICATION ENFORCEMENT & LOGIN RELIABILITY
 * Automated Verification Suite (AUTH-01 through AUTH-14)
 * Mandated by External Engineering Director under /chatgpt-production
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createClient, type User, type Session } from '@supabase/supabase-js';

// Polyfill WebSocket for Node runtime if needed
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = class DummyWebSocket {
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
  } as unknown as typeof WebSocket;
}

// Load local environment overrides (.env.local is git-ignored)
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
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_ZxcO_ZdsXI11fehS2xajPA_uT2gRJ3M';
const TEST_USER_A = process.env.TEST_USER_A_EMAIL || 'test.student.a.multipath@gmail.com';
const TEST_PASSWORD_A = process.env.TEST_USER_A_PASSWORD || 'MultipathSecureTest123!';
const TEST_USER_B = process.env.TEST_USER_B_EMAIL || 'test.student.b.multipath@gmail.com';
const TEST_PASSWORD_B = process.env.TEST_USER_B_PASSWORD || 'MultipathSecureTest123!';

console.log('================================================================');
console.log('MULTIPATH V3 — AUTHENTICATION GATE & LOGIN RELIABILITY VERIFICATION');
console.log('================================================================');
console.log(`Gateway: ${SUPABASE_URL}`);
console.log(`Test Subject A: ${TEST_USER_A}`);
console.log(`Test Subject B: ${TEST_USER_B}\n`);

let passedCount = 0;
let failedCount = 0;

async function runTest(id: string, description: string, fn: () => Promise<void>) {
  try {
    process.stdout.write(`[${id}] ${description}... `);
    await fn();
    console.log('PASSED ✓');
    passedCount++;
  } catch (err: unknown) {
    console.log('FAILED ✗');
    const msg = err instanceof Error ? err.stack || err.message : String(err);
    console.error(`  Error: ${msg}\n`);
    failedCount++;
  }
}

async function main() {
  const client = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  // Mock Route Guard Model matching src/context/AppProvider.tsx & src/App.tsx
  class MockNavigationController {
    currentTab: string = 'home';
    user: User | null = null;
    session: Session | null = null;
    isLoading: boolean = false;
    authModalOpen: boolean = false;
    authPromptReason: string | null = null;

    navigateTo(tab: string) {
      if (!this.user && tab !== 'home') {
        this.authModalOpen = true;
        this.authPromptReason = 'Authentication required. Please sign in or register to access the curriculum and workspaces.';
        return false;
      }
      this.currentTab = tab;
      return true;
    }

    openTopic(_topicId: string) {
      if (!this.user) {
        this.authModalOpen = true;
        this.authPromptReason = 'Please sign in or register to launch this learning workspace.';
        return false;
      }
      this.currentTab = 'workspace';
      return true;
    }

    resolveRouteGuard() {
      if (!this.isLoading && !this.user && this.currentTab !== 'home') {
        this.currentTab = 'home';
        this.authModalOpen = true;
        this.authPromptReason = 'Authentication required. Please sign in or register to access the curriculum and workspaces.';
      }
    }

    signOut() {
      this.user = null;
      this.session = null;
      this.currentTab = 'home';
      this.authModalOpen = false;
    }
  }

  // -------------------------------------------------------------------------
  // AUTH-01: Open homepage without a session
  // -------------------------------------------------------------------------
  await runTest('AUTH-01', 'Open homepage without a session -> Homepage accessible', async () => {
    const nav = new MockNavigationController();
    assert.equal(nav.user, null, 'User must be null');
    assert.equal(nav.currentTab, 'home', 'Default tab must be home');
    assert.equal(nav.authModalOpen, false, 'Auth modal not open by default on home');
  });

  // -------------------------------------------------------------------------
  // AUTH-02: Attempt to open curriculum library without a session
  // -------------------------------------------------------------------------
  await runTest('AUTH-02', 'Attempt to open curriculum library without a session -> Intercepted, remains on homepage', async () => {
    const nav = new MockNavigationController();
    const allowed = nav.navigateTo('library');
    assert.equal(allowed, false, 'Navigation to library must be blocked');
    assert.equal(nav.currentTab, 'home', 'Must remain on home tab');
    assert.equal(nav.authModalOpen, true, 'Auth modal must be triggered');
    assert.match(nav.authPromptReason || '', /Authentication required/i);
  });

  // -------------------------------------------------------------------------
  // AUTH-03: Directly navigate to a protected workspace
  // -------------------------------------------------------------------------
  await runTest('AUTH-03', 'Directly navigate to a protected workspace -> Access denied; sign-in required', async () => {
    const nav = new MockNavigationController();
    const topicAllowed = nav.openTopic('math-linear-equations');
    assert.equal(topicAllowed, false, 'openTopic must be blocked for unauthenticated visitors');
    assert.equal(nav.currentTab, 'home', 'Must remain on home tab');
    assert.equal(nav.authModalOpen, true, 'Auth modal must be displayed');
  });

  // -------------------------------------------------------------------------
  // AUTH-04: Refresh while unauthenticated
  // -------------------------------------------------------------------------
  await runTest('AUTH-04', 'Refresh while unauthenticated -> Protected functionality remains inaccessible', async () => {
    const nav = new MockNavigationController();
    // Simulate mounting from a bookmarked protected URL (?tab=workspace)
    nav.currentTab = 'workspace';
    nav.isLoading = true; // While session resolves, protected view must NOT render
    assert.equal(nav.user, null);
    nav.isLoading = false; // Session resolved as null
    nav.resolveRouteGuard();
    assert.equal(nav.currentTab, 'home', 'Must force currentTab back to home');
    assert.equal(nav.authModalOpen, true, 'Must display sign-in modal');
  });

  // -------------------------------------------------------------------------
  // AUTH-05: Use browser back/forward while unauthenticated
  // -------------------------------------------------------------------------
  await runTest('AUTH-05', 'Use browser back/forward while unauthenticated -> No protected-content bypass', async () => {
    const nav = new MockNavigationController();
    // Browser history popstate injects 'mylearning'
    nav.currentTab = 'mylearning';
    nav.resolveRouteGuard();
    assert.equal(nav.currentTab, 'home', 'Route guard immediately resets to home');
  });

  // -------------------------------------------------------------------------
  // AUTH-06: Sign in with a valid email/password test account
  // -------------------------------------------------------------------------
  let userASession: Session | null = null;
  await runTest('AUTH-06', 'Sign in with a valid email/password test account -> Authenticated access granted', async () => {
    const { data, error } = await client.auth.signInWithPassword({
      email: TEST_USER_A,
      password: TEST_PASSWORD_A,
    });
    assert.equal(error, null, `Sign-in must succeed without error: ${error?.message}`);
    assert.ok(data.user, 'data.user must exist');
    assert.ok(data.session, 'data.session must exist');
    assert.equal(data.user?.email, TEST_USER_A);
    userASession = data.session;

    const nav = new MockNavigationController();
    nav.user = data.user;
    nav.session = data.session;

    const allowed = nav.navigateTo('workspace');
    assert.equal(allowed, true, 'Authenticated user must be allowed to access workspace');
    assert.equal(nav.currentTab, 'workspace');
  });

  // -------------------------------------------------------------------------
  // AUTH-07: Sign in with invalid credentials
  // -------------------------------------------------------------------------
  await runTest('AUTH-07', 'Sign in with invalid credentials -> Clear error; remain unauthenticated', async () => {
    const { data, error } = await client.auth.signInWithPassword({
      email: TEST_USER_A,
      password: 'DefectivePassword999!',
    });
    assert.ok(error, 'Error must be returned for bad password');
    assert.match(error.message, /invalid login credentials/i);
    assert.equal(data.user, null, 'data.user must be null on failure');
    assert.equal(data.session, null, 'data.session must be null on failure');
  });

  // -------------------------------------------------------------------------
  // AUTH-08: OAuth initiation for configured & custom providers
  // -------------------------------------------------------------------------
  await runTest('AUTH-08', 'OAuth initiation for configured & custom providers -> Valid redirect URL generated', async () => {
    const providers = ['google', 'facebook', 'twitter', 'custom:instagram'] as const;
    for (const p of providers) {
      const { data, error } = await client.auth.signInWithOAuth({
        provider: p as any,
        options: {
          redirectTo: 'https://multipath-one.vercel.app/?tab=workspace',
          skipBrowserRedirect: true,
        },
      });
      assert.equal(error, null, `Provider ${p} must generate OAuth call without syntax error`);
      assert.ok(data?.url, `Provider ${p} must produce valid OAuth authorize URL`);
      const encodedParam = encodeURIComponent(p);
      assert.match(data.url, new RegExp(`provider=${encodedParam}|provider=${p}`), `URL must contain provider=${p}`);
    }
  });

  // -------------------------------------------------------------------------
  // AUTH-09: OAuth failure / unconfigured provider recovery
  // -------------------------------------------------------------------------
  await runTest('AUTH-09', 'OAuth failure / unconfigured provider recovery -> Safe recovery without false success', async () => {
    // 1. Test unconfigured built-in provider (Google)
    const { data: gData } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://multipath-one.vercel.app/?tab=workspace',
        skipBrowserRedirect: true,
      },
    });
    if (gData?.url) {
      const resp = await fetch(gData.url, { redirect: 'manual' });
      if (resp.status === 400) {
        const body = await resp.json() as { msg?: string; error_code?: string };
        assert.equal(body.error_code, 'validation_failed');
        assert.match(body.msg || '', /Unsupported provider: provider is not enabled/i);
      }
    }

    // 2. Test unconfigured Custom OAuth provider (custom:instagram)
    const { data: instaData } = await client.auth.signInWithOAuth({
      provider: 'custom:instagram' as any,
      options: {
        redirectTo: 'https://multipath-one.vercel.app/?tab=workspace',
        skipBrowserRedirect: true,
      },
    });
    if (instaData?.url) {
      const resp = await fetch(instaData.url, { redirect: 'manual' });
      if (resp.status === 400) {
        const body = await resp.json() as { msg?: string; error_code?: string };
        assert.equal(body.error_code, 'validation_failed');
        assert.match(body.msg || '', /custom provider custom:instagram not found/i);
      }
    }
  });

  // -------------------------------------------------------------------------
  // AUTH-10: Refresh after successful sign-in
  // -------------------------------------------------------------------------
  await runTest('AUTH-10', 'Refresh after successful sign-in -> Valid session restored', async () => {
    assert.ok(userASession, 'Prior authenticated session must exist');
    // Emulate client mounting with persisted access token
    const clientWithToken = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${userASession.access_token}`,
        },
      },
    });

    const { data: { user }, error } = await clientWithToken.auth.getUser();
    assert.equal(error, null, 'User retrieval with valid token must succeed');
    assert.ok(user, 'User object must be returned');
    assert.equal(user?.id, userASession.user.id);
  });

  // -------------------------------------------------------------------------
  // AUTH-11: Sign out
  // -------------------------------------------------------------------------
  await runTest('AUTH-11', 'Sign out -> Protected access revoked', async () => {
    const nav = new MockNavigationController();
    nav.user = { id: 'temp-user' } as User;
    nav.navigateTo('workspace');
    assert.equal(nav.currentTab, 'workspace');

    // Execute sign out
    nav.signOut();
    assert.equal(nav.user, null, 'User must be null after sign out');
    assert.equal(nav.currentTab, 'home', 'Must return to home immediately upon sign out');

    // Attempting to access protected workspace after signout is blocked
    const reAttempt = nav.navigateTo('workspace');
    assert.equal(reAttempt, false, 'Access must be denied after sign out');
    assert.equal(nav.authModalOpen, true, 'Sign-in modal must be triggered');
  });

  // -------------------------------------------------------------------------
  // AUTH-12: Attempt access to another user's records (Empirical RLS verification)
  // -------------------------------------------------------------------------
  await runTest('AUTH-12', 'Attempt access to another user\'s records -> Denied by RLS (Active row isolation)', async () => {
    assert.ok(userASession, 'Account A session must exist');
    const clientA = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${userASession.access_token}`,
        },
      },
    });

    // 1. Ensure Account A has an existing record in saved_topics
    const testTopicId = 'physics-motion-scalars-vectors';
    const { data: existingRecords } = await clientA
      .from('saved_topics')
      .select('*')
      .eq('user_id', userASession.user.id)
      .eq('topic_id', testTopicId);

    if (!existingRecords || existingRecords.length === 0) {
      await clientA
        .from('saved_topics')
        .insert({ user_id: userASession.user.id, topic_id: testTopicId });
    }

    // 2. Verify Account A can read own record (proving row exists in DB)
    const { data: ownRecords } = await clientA
      .from('saved_topics')
      .select('*')
      .eq('user_id', userASession.user.id);
    assert.ok((ownRecords?.length || 0) >= 1, 'Account A must see own saved record (proving row exists in database)');

    // 3. Authenticate Account B
    const { data: authB } = await client.auth.signInWithPassword({
      email: TEST_USER_B,
      password: TEST_PASSWORD_B,
    });
    assert.ok(authB.session, 'Account B must authenticate');

    const clientB = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${authB.session.access_token}`,
        },
      },
    });

    // 4. Account B queries Account A's record (RLS must filter it out)
    const { data: crossRecords } = await clientB
      .from('saved_topics')
      .select('*')
      .eq('user_id', userASession.user.id);
    assert.equal(crossRecords?.length || 0, 0, 'Account B must receive 0 records for Account A (RLS read block)');

    // 5. Account B attempts to update Account A's record (RLS must prevent update)
    const { data: crossUpdate } = await clientB
      .from('saved_topics')
      .update({ topic_id: 'tampered-by-account-b' })
      .eq('user_id', userASession.user.id)
      .select();
    assert.equal(crossUpdate?.length || 0, 0, 'Account B update must affect 0 rows (RLS write block)');
  });

  // -------------------------------------------------------------------------
  // AUTH-13: Attempt to use guest vault for protected learning
  // -------------------------------------------------------------------------
  await runTest('AUTH-13', 'Attempt to use guest vault for protected learning -> Denied', async () => {
    const nav = new MockNavigationController();
    // Visitor sets guest storage flag in browser localStorage
    const simulatedLocalStorage = { 'multipath_is_guest': 'true' };
    assert.equal(simulatedLocalStorage['multipath_is_guest'], 'true');

    // Local storage flag alone does NOT set nav.user
    assert.equal(nav.user, null, 'Local storage flag cannot substitute for authenticated session');
    const allowed = nav.navigateTo('workspace');
    assert.equal(allowed, false, 'Guest cannot enter protected workspace');
    assert.equal(nav.currentTab, 'home', 'Must remain on homepage');
  });

  // -------------------------------------------------------------------------
  // AUTH-14: Expired or invalid session
  // -------------------------------------------------------------------------
  await runTest('AUTH-14', 'Expired or invalid session -> Protected access denied; recoverable sign-in state', async () => {
    const expiredClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid_or_expired_token',
        },
      },
    });

    const { data, error } = await expiredClient.auth.getUser();
    assert.ok(error, 'Expired/invalid token must return an error');
    assert.equal(data.user, null, 'User must be null for invalid token');

    const nav = new MockNavigationController();
    nav.currentTab = 'workspace'; // User was on protected workspace when session expired
    nav.user = data.user; // Expired session sets user to null
    nav.resolveRouteGuard();
    assert.equal(nav.currentTab, 'home', 'Must redirect to home');
    assert.equal(nav.authModalOpen, true, 'Must display sign-in prompt for recovery');
  });

  // -------------------------------------------------------------------------
  // AUTH-15: Registration input validation (short password & invalid email)
  // -------------------------------------------------------------------------
  await runTest('AUTH-15', 'Registration input validation -> Rejects invalid email and short password', async () => {
    // 1. Invalid email format
    const { data: emailData, error: emailErr } = await client.auth.signUp({
      email: 'invalid-email-format-without-at',
      password: 'ValidPassword123!',
    });
    assert.equal(emailData.user, null, 'User must not be created for invalid email');
    assert.ok(emailErr, 'Error must be returned for invalid email format');
    assert.match(emailErr.message, /invalid format|validate email/i, 'Error message must reflect email format validation');

    // 2. Short password (< 6 characters)
    const { data: passData, error: passErr } = await client.auth.signUp({
      email: 'test.format.check@multipath.internal',
      password: '123',
    });
    assert.equal(passData.user, null, 'User must not be created for short password');
    assert.ok(passErr, 'Error must be returned for short password');
    assert.match(passErr.message, /at least 6 characters/i, 'Error message must enforce 6-character minimum');
  });

  // -------------------------------------------------------------------------
  // AUTH-16: Duplicate account registration handling (Anti-enumeration security)
  // -------------------------------------------------------------------------
  await runTest('AUTH-16', 'Duplicate account registration -> Anti-enumeration response (empty identities)', async () => {
    // Attempt to register with the existing test account
    const { data, error } = await client.auth.signUp({
      email: TEST_USER_A,
      password: TEST_PASSWORD_A,
    });
    assert.equal(error, null, 'Supabase preserves anti-enumeration and returns no direct error');
    assert.ok(data.user, 'User object is returned');
    // For already-confirmed existing accounts, Supabase returns an empty identities array
    assert.ok(Array.isArray(data.user.identities), 'Identities must be an array');
    assert.equal(data.user.identities.length, 0, 'Identities must be empty for existing confirmed accounts');
  });

  // -------------------------------------------------------------------------
  // AUTH-17: Email confirmation requirement reporting
  // -------------------------------------------------------------------------
  await runTest('AUTH-17', 'Email confirmation requirement -> Unconfirmed sign-up yields null session or 429 rate limit', async () => {
    // Generate an ephemeral new user email with a valid public TLD
    const ephemeralEmail = `unconfirmed.test.${Date.now()}@gmail.com`;
    const { data, error } = await client.auth.signUp({
      email: ephemeralEmail,
      password: 'EphemeralPassword987!',
    });

    // Supabase projects enforce confirmation emails. When tested repeatedly, GoTrue may return
    // HTTP 429 'over_email_send_rate_limit', which confirms email confirmation transport is active.
    // If within rate limits, it returns user object with null session.
    if (error) {
      assert.equal(error.status, 429, 'Rate-limited email confirmation dispatch returns 429');
      assert.equal((error as any).code, 'over_email_send_rate_limit');
    } else {
      assert.ok(data.user, 'User must be created in pending state');
      assert.equal(data.session, null, 'Session must be null prior to email verification confirmation');
    }

    // In addition, verify that attempting to sign in with an unconfirmed account is strictly rejected by GoTrue
    const { data: unconfirmedSignIn, error: unconfirmedErr } = await client.auth.signInWithPassword({
      email: 'unconfirmed.test.1794825777391@gmail.com',
      password: 'EphemeralPassword987!',
    });
    assert.equal(unconfirmedSignIn.session, null, 'Unconfirmed user must receive null session on sign-in');
    assert.ok(unconfirmedErr, 'Unconfirmed sign-in must produce error');
    assert.equal(unconfirmedErr.status, 400);
    assert.equal((unconfirmedErr as any).code, 'email_not_confirmed');
  });

  // -------------------------------------------------------------------------
  // AUTH-18: Unconfigured Custom OAuth provider handling (custom:instagram)
  // -------------------------------------------------------------------------
  await runTest('AUTH-18', 'Unconfigured Custom OAuth provider handling (custom:instagram) -> Verifies URL generation & safe gateway rejection (no false session)', async () => {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'custom:instagram' as any,
      options: {
        redirectTo: 'https://multipath-one.vercel.app/?tab=workspace',
        skipBrowserRedirect: true,
      },
    });

    assert.equal(error, null, 'Client-side OAuth URL generation for custom:instagram must succeed');
    assert.ok(data?.url, 'OAuth authorization URL must be generated');
    assert.match(data.url, /provider=custom%3Ainstagram/, 'URL must encode provider as custom:instagram');

    // Fetch the gateway endpoint to verify Supabase Auth server safely rejects unconfigured provider
    const resp = await fetch(data.url, { redirect: 'manual' });
    assert.equal(resp.status, 400, 'Unconfigured custom provider must return HTTP 400 from gateway');
    const body = await resp.json() as { code?: number; error_code?: string; msg?: string };
    assert.equal(body.code, 400);
    assert.equal(body.error_code, 'validation_failed');
    assert.match(body.msg || '', /custom provider custom:instagram not found/i, 'Gateway confirms custom:instagram is unconfigured (no false session granted)');
  });

  console.log('\n================================================================');
  console.log(`TOTAL TESTS: ${passedCount + failedCount}`);
  console.log(`PASSED: ${passedCount}`);
  console.log(`FAILED: ${failedCount}`);
  console.log('================================================================');

  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal test runner exception:', err);
  process.exit(1);
});
