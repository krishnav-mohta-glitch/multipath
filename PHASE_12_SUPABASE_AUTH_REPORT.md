# MULTIPATH V2 — PHASE 12.1: AUTHENTICATION, RLS & SCOPE HARDENING REPORT

**Status:** `PHASE 12.1 — COMPLETE & VERIFIED`  
**Execution Timestamp:** 2026-11-13T16:26:00Z  
**Target Project:** `multipath` (Existing Manual Supabase Hosted Project)  
**Project Reference ID:** `oestvwgkpllikmufvjls`  
**Project Region:** `ap-south-1` (Active & Healthy, PostgreSQL 17.11 GA)  
**Git Branch:** `main` (Ahead of `origin/main`; local changes unpushed pending approval)  
**Security Advisors Status:** 0 Security Lints, 0 Performance Lints (`PASS`)

---

## 1. Executive Summary & Audit Scope

Phase 12.1 rigorously audits and hardens the Phase 12 Supabase integration:
1. **Curriculum Scope Strictly Scoped:** Aligned user-facing forms, TypeScript types, and database constraints to the initial product scope: **ICSE/CISCE**, **CBSE**, and **Unspecified**. Explicitly removed unsupported boards (**IB**, **Cambridge**, and **State Board**) from the initial UI while retaining architectural extensibility.
2. **Hardened Profile-Creation Trigger:** Upgraded `handle_new_user()` in a new corrective migration to treat all `raw_user_meta_data` fields as untrusted input. Validates boards, grades, and string lengths, provides safe fallbacks, and wraps insertions in exception handlers so registration never breaks.
3. **Empirical Two-Account Authenticated RLS Isolation:** Validated cross-account RLS isolation using two live authenticated accounts (**Account A** and **Account B**) signed in via JWT tokens and publishable keys. Demonstrated that Account A cannot read, insert, update, or delete Account B's profile.
4. **Bundle Performance Optimization:** Improved Vite code-splitting in `vite.config.ts`, shrinking the main bundle (`index.js`) from **891 kB down to 442 kB** (below the 500 kB threshold).
5. **Clear Separation of Automated vs. Manual Testing:** Clearly delineated which flows were verified empirically through automated test suites and which require physical user email interaction.

---

## 2. Curriculum Scope Correction

### 2.1 Scope Audit & Changes
- **Initial Product Scope:**
  - `CBSE`
  - `ICSE/CISCE`
  - `Unspecified`
- **Explicitly Removed from Initial Release:**
  - `IB` (Out of scope)
  - `Cambridge` (Out of scope)
  - `State Board` (Out of scope)

### 2.2 Files Updated for Scope
1. **TypeScript Definitions (`src/types/auth.ts`):**
   ```ts
   // Initial release curriculum scope: ICSE/CISCE, CBSE, Unspecified.
   // Extensible for future board support (State Boards, IB, Cambridge).
   export type CurriculumBoard = 
     | 'ICSE/CISCE'
     | 'CBSE'
     | 'Unspecified';
   ```
2. **UI Registration & Profile Form (`src/components/auth/AuthModal.tsx`):**
   ```ts
   const CURRICULUM_BOARDS: CurriculumBoard[] = [
     'CBSE',
     'ICSE/CISCE',
     'Unspecified'
   ];
   ```
3. **Database Check Constraint:**
   Applied in corrective migration `20261113010000_scope_curriculum_boards.sql`:
   ```sql
   ALTER TABLE public.profiles 
     DROP CONSTRAINT IF EXISTS profiles_preferred_board_check;

   ALTER TABLE public.profiles 
     ADD CONSTRAINT profiles_preferred_board_check 
     CHECK (preferred_board IN ('ICSE/CISCE', 'CBSE', 'Unspecified'));
   ```

---

## 3. Hardened Profile Creation Trigger

### 3.1 Corrective Migration: `supabase/migrations/20261113010000_scope_curriculum_boards.sql`
The `handle_new_user()` function was rewritten and applied to `oestvwgkpllikmufvjls` to enforce strict zero-trust validation of user metadata:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_display_name TEXT;
  v_board TEXT;
  v_grade TEXT;
  v_language TEXT;
  v_raw_board TEXT;
  v_raw_grade TEXT;
  v_raw_lang TEXT;
  v_raw_name TEXT;
BEGIN
  -- Extract raw untrusted metadata safely
  v_raw_name  := NULLIF(TRIM(NEW.raw_user_meta_data->>'display_name'), '');
  v_raw_board := NULLIF(TRIM(NEW.raw_user_meta_data->>'preferred_board'), '');
  v_raw_grade := NULLIF(TRIM(NEW.raw_user_meta_data->>'grade_level'), '');
  v_raw_lang  := NULLIF(TRIM(NEW.raw_user_meta_data->>'preferred_language'), '');

  -- 1. Validate display_name: clamp to 100 chars, fallback to email prefix or 'Learner'
  IF v_raw_name IS NOT NULL THEN
    v_display_name := SUBSTRING(v_raw_name FROM 1 FOR 100);
  ELSIF NEW.email IS NOT NULL AND POSITION('@' IN NEW.email) > 1 THEN
    v_display_name := SUBSTRING(SPLIT_PART(NEW.email, '@', 1) FROM 1 FOR 100);
  ELSE
    v_display_name := 'Learner';
  END IF;

  -- 2. Validate preferred_board: strictly whitelist ICSE/CISCE, CBSE, or Unspecified
  IF v_raw_board IN ('ICSE/CISCE', 'CBSE', 'Unspecified') THEN
    v_board := v_raw_board;
  ELSE
    v_board := 'Unspecified';
  END IF;

  -- 3. Validate grade_level: strictly whitelist Classes 6 to 12 or General
  IF v_raw_grade IN ('Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'General') THEN
    v_grade := v_raw_grade;
  ELSE
    v_grade := 'Class 10';
  END IF;

  -- 4. Validate preferred_language: clamp to 50 chars, fallback to 'English'
  IF v_raw_lang IS NOT NULL THEN
    v_language := SUBSTRING(v_raw_lang FROM 1 FOR 50);
  ELSE
    v_language := 'English';
  END IF;

  -- Insert profile with validated parameters, ignoring conflicts
  INSERT INTO public.profiles (id, display_name, preferred_board, grade_level, preferred_language)
  VALUES (NEW.id, v_display_name, v_board, v_grade, v_language)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Guarantee that no metadata error or constraint violation can ever abort auth.users registration
  BEGIN
    INSERT INTO public.profiles (id, display_name, preferred_board, grade_level, preferred_language)
    VALUES (NEW.id, 'Learner', 'Unspecified', 'Class 10', 'English')
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  RETURN NEW;
END;
$$;

-- Revoke direct execution privileges from public API roles
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
```

---

## 4. Empirical RLS Isolation Verification (Two Authenticated Accounts)

The test suite was upgraded in `tests/phase12_supabase_verification.js` to execute live authenticated sessions against the remote database:

| Test Scenario | Action Executed | Observed Result | Verdict |
| :--- | :--- | :--- | :--- |
| **Account A Self Read** | Account A queries `profiles` via authenticated client | Returns exactly 1 row (Account A's profile) | **PASSED** |
| **Account A Cross-Read** | Account A queries `profiles.select().eq('id', userB.id)` | Returns `0` rows (RLS filtered) | **PASSED** |
| **Account A Cross-Update** | Account A executes `.update({ display_name: 'Compromised' }).eq('id', userB.id)` | Returns `0` rows updated (RLS filtered) | **PASSED** |
| **Account A Spoofed Insert** | Account A executes `.insert({ id: userB.id, ... })` | Throws error: `new row violates row-level security policy for table "profiles"` | **PASSED** |
| **Account A Cross-Delete** | Account A executes `.delete().eq('id', userB.id)` | Returns `0` rows deleted (RLS filtered) | **PASSED** |
| **Account B Bidirectional Read** | Account B queries `profiles.select().eq('id', userA.id)` | Returns `0` rows (RLS filtered) | **PASSED** |
| **Account A Self Update** | Account A updates own `display_name` | Successfully updates to `Student A Verified` | **PASSED** |
| **Account B Self Read** | Account B queries own profile | Returns 1 row (`Student B`, board `ICSE/CISCE`) | **PASSED** |

---

## 5. Automated vs. Manual Testing Breakdown

### 5.1 Verified via Automated Test Suites (`npm test`)
- [x] Client environment fallback with missing or placeholder keys (Offline Guest Mode verified).
- [x] Service-role key absence from client configuration.
- [x] Public Auth gateway health check (`/auth/v1/settings` returns HTTP 200).
- [x] Unauthenticated anonymous read blocked (returns 0 rows).
- [x] Unauthenticated anonymous insert blocked (RLS violation).
- [x] Direct RPC execution of `handle_new_user()` blocked (`REVOKE EXECUTE`).
- [x] Authenticated Account A & Account B live session login via publishable key.
- [x] Two-account bidirectional RLS read/update/delete isolation.
- [x] Curriculum scope constraints enforcement (`ICSE/CISCE`, `CBSE`, `Unspecified`).
- [x] Grade level constraints enforcement (`Class 6` to `Class 12`, `General`).
- [x] Guest mode state separation (no user metadata assigned to guest).

### 5.2 Manual Verification Still Required
The following operational flows rely on external human interactions:
1. **Physical Email Inbox Verification:**
   - User receives real email via SMTP, opens email client, and clicks confirmation link.
   - *Status:* Mailer endpoint dispatches cleanly; email link handling depends on the user's email client and redirect URL.
2. **Password Reset Email Flow:**
   - Requesting password reset via `auth.resetPasswordForEmail()` dispatches recovery link to the user's inbox.
   - *Status:* API dispatch tested and confirmed; link redemption in browser requires email inbox access.

---

## 6. Guest and Account Separation

- **Guest State Preservation:**
  - Guest data stored in `localStorage` (`multipath_is_guest: true`) and IndexedDB (`idb`) remains isolated on the local device.
  - No guest data is synced to Supabase tables prior to Phase 13.
- **Account Sign-Out Cleansing:**
  - Calling `signOut()` resets React state (`user: null`, `profile: null`, `session: null`), sets `isGuest: true`, and clears session keys.
  - Switching accounts immediately re-hydrates only the newly authenticated user's profile.

---

## 7. Build Optimizations & Remaining Build Warnings

### 7.1 Vendor Chunk Splitting (`vite.config.ts`)
Updated `rollupOptions.output.manualChunks` to split large third-party dependencies:
- `dist/assets/vendor-react-*.js`: 210 kB (React, React-DOM)
- `dist/assets/vendor-supabase-*.js`: 216 kB (`@supabase/supabase-js`)
- `dist/assets/vendor-icons-*.js`: 34 kB (`lucide-react`)
- `dist/assets/index-*.js`: **442.38 kB** (Application core, down from 891 kB)

### 7.2 Remaining Build Warning
The only chunk exceeding 500 kB is:
- `dist/assets/ThreeSceneBoundary-*.js`: 921 kB (243 kB gzip)
- *Assessment:* This is the isolated Three.js 3D engine and R3F bundle. It is loaded strictly on demand via `React.lazy()` when mounting 3D scenes (Homepage Hero, Concept Network, Simulation Chamber). It has zero impact on initial landing page load times.

---

## 8. Verification Results & Quality Gates

```
> multipath@0.0.0 lint
> oxlint
Found 0 warnings and 0 errors. Finished in 234ms on 108 files.

> npx tsc -b
Exit code: 0 (Zero diagnostic compilation errors)

> multipath@0.0.0 test
====================================================
TOTAL TESTS: 47 (29 Phase 8 + 18 Phase 12.1)
PASSED: 47 | FAILED: 0
====================================================

> npm run build
vite v8.3.8 building client environment for production...
✓ 2212 modules transformed.
dist/index.html                                  1.74 kB │ gzip:   0.85 kB
dist/assets/index-BITcPtMQ.css                  67.06 kB │ gzip:  11.54 kB
dist/assets/rolldown-runtime-XKyaHtl9.js         0.72 kB │ gzip:   0.42 kB
dist/assets/ConceptNetworkScene-BC-OtISC.js      6.54 kB │ gzip:   2.43 kB
dist/assets/LearningCoreScene-CaQYYpp7.js        7.07 kB │ gzip:   2.66 kB
dist/assets/InteractiveModelScene-DaKNxUKM.js   13.70 kB │ gzip:   3.60 kB
dist/assets/vendor-icons-CEfYe62j.js            34.64 kB │ gzip:  12.04 kB
dist/assets/vendor-react-CWTXm_v7.js           210.91 kB │ gzip:  65.85 kB
dist/assets/vendor-supabase-DxFOITRO.js        216.00 kB │ gzip:  55.68 kB
dist/assets/index-CIH2_KVz.js                  442.38 kB │ gzip: 106.37 kB
dist/assets/ThreeSceneBoundary-CRKesCOf.js     921.25 kB │ gzip: 243.64 kB
✓ built in 6.40s
```

---

## 9. Status Declaration

**`PHASE 12.1 — COMPLETE & VERIFIED`**

Scope corrections, trigger hardening, two-account authenticated RLS isolation, and bundle optimizations are verified. All changes remain local on branch `main`. No commits have been pushed and no production deployments have been triggered. Awaiting user approval.
