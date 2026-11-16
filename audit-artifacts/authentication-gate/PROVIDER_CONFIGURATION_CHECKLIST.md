# Provider Configuration & Verification Checklist
**Controlling Directive**: `GOAL-MULTIPATH-AUTH-PROVIDER-VERIFICATION-V1` & `FINAL_RELEASE_READINESS_RECONCILIATION`  
**Project Ref**: `oestvwgkpllikmufvjls`  
**Gateway URL**: `https://oestvwgkpllikmufvjls.supabase.co`  
**Callback URL**: `https://oestvwgkpllikmufvjls.supabase.co/auth/v1/callback`  
**Application Redirect**: `https://multipath-one.vercel.app/?tab=workspace`  
**Audit Date**: 2026-11-16  

---

## 1. Four-Stage Provider Verification Matrix

Each authentication provider is evaluated across four distinct operational stages:
1. **Stage 1 (Code Implementation Present)**: Client SDK method wired, types defined, and UI triggers mounted in `AuthModal.tsx`.
2. **Stage 2 (Authorization Initiation)**: Authorization endpoint URL generated correctly without client-side syntax error.
3. **Stage 3 (Dashboard Configuration)**: Provider registered, enabled, and successfully resolved by Supabase with valid third-party client credentials.
4. **Stage 4 (End-to-End Verified)**: Complete external authentication and callback flow establish a valid user session, unlock route guards, and hydrate state.

> **Important Invariant**: A passing URL-generation test (Stage 2) is NOT an end-to-end authentication test (Stage 4). Providers without active Stage 3 dashboard credentials remain strictly classified as **BLOCKED**.

| # | Provider | Protocol / Identifier | Stage 1: Implementation | Stage 2: Initiation | Stage 3: Dashboard | Stage 4: End-to-End | Verified Status |
|:---:|---|---|:---:|:---:|:---:|:---:|:---:|
| **1** | **Email / Password** | Built-in Supabase GoTrue | **PASS** | **PASS** | **PASS** | **PASS** | **PASS (LIVE)** |
| **2** | **Google** | Built-in OAuth2 (`google`) | **PASS** | **PASS** | **BLOCKED** | **BLOCKED** | **BLOCKED** |
| **3** | **Facebook** | Built-in OAuth2 (`facebook`) | **PASS** | **PASS** | **BLOCKED** | **BLOCKED** | **BLOCKED** |
| **4** | **Instagram** | Custom OAuth2 (`custom:instagram`) | **PASS** | **PASS** | **BLOCKED** | **BLOCKED** | **BLOCKED (INCOMPATIBLE WITH STUDENT ACCOUNTS)** |
| **5** | **X (Twitter)** | Built-in OAuth2 (`twitter`) | **PASS** | **PASS** | **BLOCKED** | **BLOCKED** | **BLOCKED** |

---

## 2. Technical Provider Audits & Exact Verification Findings

### Provider 1: Email and Password
- **Classification**: **PASS (Production Ready & Verified)**
- **Architecture**: Native Supabase GoTrue identity store with bcrypt hashing and JWT issuance.
- **Stage 1 (Code Implementation)**: PASS (`src/services/authService.ts` -> `signInWithPassword`, `signUp`).
- **Stage 2 (Initiation)**: PASS (Direct JSON POST to `/auth/v1/token?grant_type=password`).
- **Stage 3 (Dashboard Configuration)**: PASS (Email auth enabled by default on project `oestvwgkpllikmufvjls`).
- **Stage 4 (End-to-End Verified)**: PASS (Automated and live verified with `test.student.a.multipath@gmail.com`).
- **Automated Test Coverage**:
  - `AUTH-06`: Valid sign-in returns JWT access token & user object.
  - `AUTH-07`: Invalid credentials return `400: Invalid login credentials`.
  - `AUTH-10`: Refresh restores valid session via persisted token.
  - `AUTH-11`: Sign-out revokes session and clears local storage.
  - `AUTH-12`: Multi-tenant RLS isolation strictly prevents cross-account reads and writes (verified with live inserted rows).
  - `AUTH-15`: Input validation rejects short password (< 6 chars) and invalid email format.
  - `AUTH-16`: Anti-enumeration security returns user with empty identities `[]` for duplicate registration.
  - `AUTH-17`: Email confirmation requirement leaves session `null` until confirmed or enforces rate limit (429).
- **Owner Action Required**: None. Operational and verified as the primary student authentication method.

---

### Provider 2: Google OAuth
- **Classification**: **BLOCKED (Code Ready — Awaiting Supabase Dashboard Configuration)**
- **Architecture**: Native Supabase built-in OAuth provider (`google`).
- **Stage 1 (Code Implementation)**: PASS (`signInWithOAuth({ provider: 'google', options: { redirectTo } })`).
- **Stage 2 (Initiation)**: PASS (Produces `https://oestvwgkpllikmufvjls.supabase.co/auth/v1/authorize?provider=google&redirect_to=...`).
- **Stage 3 (Dashboard Configuration)**: **BLOCKED** — Gateway returns HTTP 400:
  ```json
  {
    "code": 400,
    "error_code": "validation_failed",
    "msg": "Unsupported provider: provider is not enabled"
  }
  ```
- **Stage 4 (End-to-End Verified)**: BLOCKED (Pending Stage 3).
- **UI State**: Modal badge clearly displays `(Pending)`. Clicking button produces clear message: *"Google sign-in is currently pending provider credential registration in the Supabase Dashboard. Please sign in with your student Email & Password below."*
- **Owner Action Required**:
  1. Open [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
  2. Create an **OAuth 2.0 Client ID** (Web application).
  3. Set Authorized Redirect URI:
     `https://oestvwgkpllikmufvjls.supabase.co/auth/v1/callback`
  4. In Supabase Dashboard -> **Authentication** -> **Providers** -> **Google**:
     - Toggle "Enable Google provider" to **ON**.
     - Paste Client ID and Client Secret.
     - Click **Save**.

---

### Provider 3: Facebook Login
- **Classification**: **BLOCKED (Code Ready — Awaiting Supabase Dashboard Configuration)**
- **Architecture**: Native Supabase built-in OAuth provider (`facebook`).
- **Stage 1 (Code Implementation)**: PASS (`signInWithOAuth({ provider: 'facebook', options: { redirectTo } })`).
- **Stage 2 (Initiation)**: PASS (Produces `https://oestvwgkpllikmufvjls.supabase.co/auth/v1/authorize?provider=facebook&redirect_to=...`).
- **Stage 3 (Dashboard Configuration)**: **BLOCKED** — Gateway returns HTTP 400:
  ```json
  {
    "code": 400,
    "error_code": "validation_failed",
    "msg": "Unsupported provider: provider is not enabled"
  }
  ```
- **Stage 4 (End-to-End Verified)**: BLOCKED (Pending Stage 3).
- **UI State**: Modal badge clearly displays `(Pending)`.
- **Owner Action Required**:
  1. Open [Meta for Developers](https://developers.facebook.com/apps/).
  2. Create an App with the **Facebook Login** product.
  3. Under Facebook Login Settings, add Valid OAuth Redirect URI:
     `https://oestvwgkpllikmufvjls.supabase.co/auth/v1/callback`
  4. In Supabase Dashboard -> **Authentication** -> **Providers** -> **Facebook**:
     - Toggle "Enable Facebook provider" to **ON**.
     - Paste App ID and App Secret.
     - Click **Save**.

---

### Provider 4: Instagram (Custom OAuth2 & Meta Platform Limitation Analysis)
- **Classification**: **BLOCKED — STRUCTURALLY INCOMPATIBLE WITH GENERAL STUDENT ACCOUNTS**
- **Architecture**: Supabase **Custom OAuth2 Provider** using slug `custom:instagram`.
- **Official Documentation Findings**:
  1. **Supabase Custom OAuth Specification**:
     [Supabase Custom OAuth Providers](https://supabase.com/docs/guides/auth/custom-oauth-providers) defines how custom OAuth2 providers must be registered with authorization, token, and user-info endpoints.
  2. **Meta Instagram Login API Constraint**:
     [Meta Instagram API with Instagram Login](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login) explicitly documents:
     > *"Instagram Login is supported only for Instagram Professional accounts (Business and Creator accounts). It does NOT support personal Instagram accounts."*
  3. **Legacy API Deprecation**: Meta officially deprecated the legacy "Instagram Basic Display API" (which historically supported consumer personal accounts) on December 4, 2024.
- **Impact on MULTIPATH Student Journey**:
  - High school students (minors in CBSE Classes 9–12) hold standard personal Instagram accounts. They do not operate Instagram Business or Creator accounts.
  - Therefore, Meta's currently supported Instagram Login flow **CANNOT satisfy MULTIPATH's intended student-account use case**.
  - General student accounts attempting to log in via Meta's Instagram Login will be rejected by Meta with authorization errors.
- **Stage 1 (Code Implementation)**: PASS (`custom:instagram` slug mapped in `authService.ts`).
- **Stage 2 (Initiation)**: PASS (Produces `provider=custom%3Ainstagram` URL).
- **Stage 3 (Dashboard Configuration)**: **BLOCKED** — Gateway returns HTTP 400 (`validation_failed: custom provider custom:instagram not found`).
- **Stage 4 (End-to-End Verified)**: BLOCKED.
- **UI State**: Modal badge displays `(Setup Req.)`. Clicking button produces clear message: *"Instagram OAuth is currently unconfigured in the dashboard. In addition, Meta restricts Instagram Login to Professional/Creator accounts, which does not support standard student personal accounts. Please sign in with Email & Password."*
- **Engineering Recommendation**: Do NOT promote Instagram login for students. Direct all students to Email/Password or Google OAuth.

---

### Provider 5: X (Twitter)
- **Classification**: **BLOCKED (Code Ready — Awaiting Supabase Dashboard Configuration)**
- **Architecture**: Native Supabase built-in OAuth provider (`twitter`).
- **Stage 1 (Code Implementation)**: PASS (`signInWithOAuth({ provider: 'twitter', options: { redirectTo } })`).
- **Stage 2 (Initiation)**: PASS (Produces `https://oestvwgkpllikmufvjls.supabase.co/auth/v1/authorize?provider=twitter&redirect_to=...`).
- **Stage 3 (Dashboard Configuration)**: **BLOCKED** — Gateway returns HTTP 400:
  ```json
  {
    "code": 400,
    "error_code": "validation_failed",
    "msg": "Unsupported provider: provider is not enabled"
  }
  ```
- **Stage 4 (End-to-End Verified)**: BLOCKED (Pending Stage 3).
- **UI State**: Modal badge clearly displays `(Pending)`.
- **Owner Action Required**:
  1. Open [X Developer Portal](https://developer.x.com/en/portal/dashboard).
  2. Create a Project & App; enable User Authentication Settings (OAuth 2.0 or OAuth 1.0a).
  3. Set Callback URI / Redirect URL to:
     `https://oestvwgkpllikmufvjls.supabase.co/auth/v1/callback`
  4. In Supabase Dashboard -> **Authentication** -> **Providers** -> **Twitter**:
     - Toggle "Enable Twitter provider" to **ON**.
     - Paste API Key (Consumer Key) and API Secret Key (Consumer Secret).
     - Click **Save**.
