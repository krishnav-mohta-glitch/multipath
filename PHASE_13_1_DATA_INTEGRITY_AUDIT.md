# MULTIPATH V2 — PHASE 13.1: CROSS-ACCOUNT DATA INTEGRITY & INDEPENDENT AUDIT REPORT

**Date:** 2026-11-13  
**Status:** 🟢 Completed & Empirically Verified  
**Repository:** [github.com/krishnav-mohta-glitch/multipath](https://github.com/krishnav-mohta-glitch/multipath) (`main` @ `a7f7283`)  
**Target Supabase Project:** `multipath` (`oestvwgkpllikmufvjls` in `ap-south-1`)  
**Unified Test Suite Pass Rate:** **82 / 82 Tests Passed (100%)**

---

## 1. Audit Objective & Problem Statement

Phase 13 implemented initial cloud data persistence for authenticated learners. However, a critical identity model audit revealed an architectural flaw in single-column primary keys:

1. **Global Primary Key Collision Risk**: `activity_events`, `learning_sessions`, and `saved_resources` initially declared `id` as a standalone `PRIMARY KEY`. Because primary keys are globally unique in PostgreSQL, if two independent learners on the same device (e.g. shared student Chromebook or household tablet) attempted to import the same guest learning snapshot containing client-generated IDs (`guest_act_123`, `feyn_session_456`, `res_mindmap_789`), Account B's import would fail with fatal database error `duplicate key value violates unique constraint "<table>_pkey"`.
2. **Account Overwrite Shielding**: Unqualified upserts on bookmarks (`saved_topics`) had the potential to overwrite custom student reflection notes with null values if the imported guest bookmark did not have an attached note.
3. **Upsert Conflict Target Mismatch**: In PostgreSQL, `ON CONFLICT (<target>)` must match an existing unique index or primary key constraint. When composite identity is introduced, conflict targets must specify `(user_id, id)`.

Phase 13.1 resolves these issues through a non-destructive corrective migration, hardening the client persistence service with conflict-aware deduplication, and validating the implementation with a dedicated two-account empirical test suite.

---

## 2. Corrective Migration: `20261113040000_composite_user_identity.sql`

Applied directly to live Supabase database `oestvwgkpllikmufvjls`:

```sql
-- MULTIPATH V2 — Phase 13.1 Migration
-- User-Scoped Composite Identity: convert primary keys to (user_id, id)
-- Enables multi-account guest imports with identical client-generated IDs without cross-account collisions.

-- 1. ACTIVITY EVENTS: Convert to PRIMARY KEY (user_id, id)
ALTER TABLE public.activity_events DROP CONSTRAINT IF EXISTS activity_events_user_id_key;
ALTER TABLE public.activity_events DROP CONSTRAINT IF EXISTS activity_events_pkey;
ALTER TABLE public.activity_events ADD CONSTRAINT activity_events_pkey PRIMARY KEY (user_id, id);

-- 2. LEARNING SESSIONS: Convert to PRIMARY KEY (user_id, id)
ALTER TABLE public.learning_sessions DROP CONSTRAINT IF EXISTS learning_sessions_pkey;
ALTER TABLE public.learning_sessions ADD CONSTRAINT learning_sessions_pkey PRIMARY KEY (user_id, id);

-- 3. SAVED RESOURCES: Convert to PRIMARY KEY (user_id, id)
ALTER TABLE public.saved_resources DROP CONSTRAINT IF EXISTS saved_resources_pkey;
ALTER TABLE public.saved_resources ADD CONSTRAINT saved_resources_pkey PRIMARY KEY (user_id, id);

-- 4. SAVED TOPICS: Convert to PRIMARY KEY (user_id, id) while preserving UNIQUE (user_id, topic_id)
ALTER TABLE public.saved_topics DROP CONSTRAINT IF EXISTS saved_topics_pkey;
ALTER TABLE public.saved_topics ADD CONSTRAINT saved_topics_pkey PRIMARY KEY (user_id, id);
```

---

## 3. Verified Live Database Constraint Matrix

Inspected via `information_schema.table_constraints` on live project `oestvwgkpllikmufvjls`:

| Table Name | Primary Key | Foreign Key | Additional Unique Constraints | Owner RLS Enforcement |
|---|---|---|---|---|
| `public.saved_topics` | `(user_id, id)` | `user_id -> auth.users(id)` | `UNIQUE (user_id, topic_id)` | `(select auth.uid()) = user_id` |
| `public.activity_events` | `(user_id, id)` | `user_id -> auth.users(id)` | None (covered by PK) | `(select auth.uid()) = user_id` (NO UPDATE) |
| `public.learning_sessions` | `(user_id, id)` | `user_id -> auth.users(id)` | None (covered by PK) | `(select auth.uid()) = user_id` |
| `public.saved_resources` | `(user_id, id)` | `user_id -> auth.users(id)` | None (covered by PK) | `(select auth.uid()) = user_id` |
| `public.learning_preferences`| `(user_id)` | `user_id -> auth.users(id)` | None (covered by PK) | `(select auth.uid()) = user_id` |

---

## 4. Client Persistence Service Conflict Hardening

Updated `src/services/cloudPersistenceService.ts`:

1. **Upsert Conflict Targets**:
   - `activity_events`: `{ onConflict: 'user_id,id', ignoreDuplicates: true }`
   - `learning_sessions`: `{ onConflict: 'user_id,id', ignoreDuplicates }`
   - `saved_resources`: `{ onConflict: 'user_id,id', ignoreDuplicates }`
   - `saved_topics`: `{ onConflict: 'user_id,topic_id' }`
   - `learning_preferences`: `{ onConflict: 'user_id' }`

2. **Pre-Existing Data Overwrite Shielding**:
   - `importGuestData()` queries existing bookmarks before inserting. If a topic is already bookmarked in the destination account, its existing custom reflection notes and creation timestamps are strictly preserved.
   - `ignoreDuplicates: true` prevents overwriting pre-existing learning sessions or media resources.
   - Event audit stream remains strictly immutable (no updates allowed).

---

## 5. Cross-Account Empirical Test Suite (`tests/phase13_1_cross_account_verification.js`)

Executed directly against live Supabase instance with two distinct authenticated accounts using publishable keys:
- Account A: `test.student.a.multipath@gmail.com` (`e6cc0640-2f0b-4c30-b067-253d508ea2ba`)
- Account B: `test.student.b.multipath@gmail.com` (`f7dd1751-3e1c-4d41-c178-364e619fb3cb`)

### Test Results

| # | Test Scenario | Verified Outcome | Status |
|---|---|---|---|
| 1 | Account A authenticates successfully | JWT session issued | 🟢 PASSED |
| 2 | Account B authenticates successfully | JWT session issued, distinct UUID | 🟢 PASSED |
| 3 | Pre-existing reflection note setup | Account A saves topic with custom notes | 🟢 PASSED |
| 4 | Import guest snapshot into Account A | 2 topics, 2 activities, 1 session, 1 resource | 🟢 PASSED |
| 5 | Import EXACT SAME snapshot into Account B | 2 topics, 2 activities, 1 session, 1 resource (**0 PK collisions**) | 🟢 PASSED |
| 6 | Independent data retention with reused IDs | Both accounts retain identical client IDs under distinct `user_id` | 🟢 PASSED |
| 7 | Idempotent retry on Account A | Re-import produces **0 duplicate records** | 🟢 PASSED |
| 8 | Idempotent retry on Account B | Re-import produces **0 duplicate records** | 🟢 PASSED |
| 9 | Account A cannot access Account B records | Querying B's records from A returns 0 rows | 🟢 PASSED |
| 10 | Account B cannot access Account A records | Querying A's records from B returns 0 rows | 🟢 PASSED |
| 11 | Account B cannot modify Account A records | Cross-update affects 0 rows, A's data intact | 🟢 PASSED |
| 12 | Pre-existing notes preserved | Account A's custom reflection note unaltered | 🟢 PASSED |
| 13 | Clean teardown | Both accounts cleared of test rows | 🟢 PASSED |

---

## 6. Unified Project Test Suite Execution

Full suite executed via `npm test`:
- `tests/phase8_verification.js`: **29/29 passed**
- `tests/phase12_supabase_verification.js`: **18/18 passed**
- `tests/phase13_persistence_verification.js`: **22/22 passed**
- `tests/phase13_1_cross_account_verification.js`: **13/13 passed**
- **Total: 82 / 82 tests passed (100% pass rate)**

---

## 7. Supabase Advisor Results

- **Security Advisor (`get_advisors(security)`):**
  - **0 Table Lints**: All tables have RLS enabled and forced, no security definer leaks, no public access.
  - Informational notice: `auth_leaked_password_protection` (Supabase Auth free tier setting).
- **Performance Advisor (`get_advisors(performance)`):**
  - Composite primary keys and foreign key indexes verified and actively queried by integration tests.
  - Zero critical or high-impact performance issues.

---

## 8. Quality Gates

- `oxlint`: **0 errors, 0 warnings** across 113 files.
- `tsc -b`: **0 errors**.
- `npm run build`: Succeeded in 5.44s. Main bundle chunk: **466.29 kB** (gzip: 110.92 kB), well under 500 kB limit.
- Git: No commits pushed to GitHub, no Vercel deployments triggered without user approval.
