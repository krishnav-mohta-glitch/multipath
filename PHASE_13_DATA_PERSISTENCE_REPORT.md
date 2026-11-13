# MULTIPATH V2 — PHASE 13: CLOUD DATA PERSISTENCE & GUEST-TO-ACCOUNT SYNCHRONIZATION REPORT

**Date:** 2026-11-13  
**Status:** 🟢 Completed & Empirically Verified  
**Repository:** [github.com/krishnav-mohta-glitch/multipath](https://github.com/krishnav-mohta-glitch/multipath) (`main` @ `a7f7283`)  
**Target Supabase Project:** `multipath` (`oestvwgkpllikmufvjls` in `ap-south-1`)  
**Test Suite Pass Rate:** **82 / 82 Tests Passed (100%)** *(Includes Phase 13.1 Data Integrity Suite)*

---

## 1. Executive Summary

Phase 13 establishes persistent cloud synchronization for authenticated learners on Supabase while safeguarding the core architectural pillar of MULTIPATH: **a 100% functional, private, local-first guest experience**.

Guest learners can freely explore Socratic guided discovery, teach in Feynman mode, generate adaptive media (Mind Maps, Podcasts, Video Storyboards), and track their concept mastery using local browser storage (IndexedDB and LocalStorage) with zero network calls or credentials required.

When a learner chooses to register or log into an account, MULTIPATH detects the local guest learning stream and presents an **explicit, non-destructive, preview-driven Guest Import Modal**. The migration engine guarantees **idempotency and duplicate prevention** via deterministic RFC4122 UUID translation, preserves all pre-existing cloud records, keeps original guest data intact until import verification succeeds, and enforces **strict PostgreSQL Row Level Security (RLS)** across all user-scoped tables.

---

## 2. Architecture & Data Flow

```
                                  +---------------------------------------+
                                  |         LEARNER CONTEXT               |
                                  +-------------------+-------------------+
                                                      |
                                     Is Authenticated?|
                                    +-----------------+-----------------+
                                    |                                   |
                             NO (Guest Mode)                     YES (Signed In)
                                    |                                   |
                                    v                                   v
                     +----------------------------+      +----------------------------+
                     |    StorageService (Local)  |      |   StorageService (Scoped)  |
                     +--------------+-------------+      +--------------+-------------+
                                    |                                   |
                  +-----------------+-----------------+                 v
                  |                                   |  +----------------------------+
                  v                                   v  |   CloudPersistenceService  |
       +--------------------+               +-----------+|       (User-Scoped Cache)  |
       |  IndexedDB Store   |               | LocalStrg |+--------------+-------------+
       | (activities, topic |               |  Backup   |               |
       |  media_resources)  |               +-----------+               | Authenticated JWT +
       +--------------------+                                           | Publishable Key
                                                                        v
                                                         +----------------------------+
                                                         |   Supabase PostgreSQL      |
                                                         |  (Row Level Security / RLS)|
                                                         +--------------+-------------+
                                                                        |
                                   +-------------------+----------------+-------------------+
                                   |                   |                |                   |
                                   v                   v                v                   v
                          +-----------------+ +----------------+ +----------------+ +----------------+
                          |  saved_topics   | |activity_events | |learning_sessions| |saved_resources |
                          |  (Bookmarks)    | |  (Immutable)   | | (Discovery &   | | (Mindmaps,     |
                          |                 | |                | |    Feynman)     | |  Podcasts, etc)|
                          +-----------------+ +----------------+ +----------------+ +----------------+
```

### Data Flow Invariants:
1. **Guest Isolation**: Unauthenticated operations never make network requests to Supabase data tables.
2. **Account Scoping**: When authenticated, in-memory state and local fallback caches are strictly partitioned by `multipath_user_${userId}_*`.
3. **Session Switch & Teardown**: On logout, user-scoped memory caches are evicted immediately. Guest records remain untouched. On account switch, cached data from Account A is never exposed to Account B.
4. **Honest Metrics**: Empty accounts display genuine 0-metric empty states without synthetic demo data contamination.

---

## 3. Database Tables, Schemas & Constraints

All tables live in the `public` schema and link to `auth.users(id)` with `ON DELETE CASCADE`.

### 3.1. `public.saved_topics`
Stores learner bookmarks and personal topic reflections.
- `id`: `uuid DEFAULT gen_random_uuid()`
- `user_id`: `uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `topic_id`: `text NOT NULL`
- `notes`: `text DEFAULT NULL`
- `created_at`: `timestamptz NOT NULL DEFAULT timezone('utc'::text, now())`
- **Primary Key**: `PRIMARY KEY (user_id, id)`
- **Constraint**: `saved_topics_user_topic_key UNIQUE (user_id, topic_id)`
- **Index**: `saved_topics_user_id_idx ON (user_id, created_at DESC)`

### 3.2. `public.activity_events`
An update-protected event stream tracking genuine learner interactions.
- `id`: `uuid DEFAULT gen_random_uuid()` (supports deterministic client UUIDs)
- `user_id`: `uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `event_type`: `text NOT NULL`
- `topic_id`: `text NOT NULL`
- `subject_id`: `text NOT NULL`
- `path_id`: `text DEFAULT NULL`
- `details`: `text DEFAULT NULL`
- `payload`: `jsonb NOT NULL DEFAULT '{}'::jsonb`
- `schema_version`: `integer NOT NULL DEFAULT 1`
- `timestamp`: `timestamptz NOT NULL DEFAULT timezone('utc'::text, now())`
- **Primary Key**: `PRIMARY KEY (user_id, id)`
- **Constraints**:
  - `activity_events_type_check`: Validates standard and legacy event names (`topic_viewed`, `learning_mode_started`, `learning_session_completed`, `topic_bookmarked`, `assessment_attempted`, `resource_generated`, `resource_saved`, `resource_deleted`, `topic-opened`, `path-changed`, `discovery-session`, `feynman-explanation`, `feynman-assessed`, `media-generated`).
  - `activity_events_payload_size`: `octet_length(payload::text) <= 32768` (32 KB payload bound).
- **Indexes**:
  - `activity_events_user_timestamp_idx ON (user_id, timestamp DESC)`
  - `activity_events_user_topic_idx ON (user_id, topic_id)`

### 3.3. `public.learning_sessions`
Persists the full lifecycle and evaluation records of Socratic Discovery and Feynman Technique teaching sessions.
- `id`: `text NOT NULL` (client-generated session identifier)
- `user_id`: `uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `topic_id`: `text NOT NULL`
- `subject_id`: `text NOT NULL`
- `mode`: `text NOT NULL CHECK (mode IN ('socratic-discovery', 'feynman-technique'))`
- `status`: `text NOT NULL CHECK (status IN ('planned', 'started', 'paused', 'completed', 'partially_completed', 'abandoned', 'skipped', 'invalidated'))`
- `turn_count`: `integer NOT NULL DEFAULT 0`
- `duration_seconds`: `integer NOT NULL DEFAULT 0`
- `history`: `jsonb NOT NULL DEFAULT '[]'::jsonb`
- `assessment_data`: `jsonb DEFAULT NULL`
- `started_at`: `timestamptz NOT NULL DEFAULT timezone('utc'::text, now())`
- `completed_at`: `timestamptz DEFAULT NULL`
- `updated_at`: `timestamptz NOT NULL DEFAULT timezone('utc'::text, now())`
- **Primary Key**: `PRIMARY KEY (user_id, id)`
- **Constraint**: `learning_sessions_history_size CHECK (octet_length(history::text) <= 65536)` (64 KB history bound).
- **Indexes**:
  - `learning_sessions_user_status_idx ON (user_id, status, started_at DESC)`
  - `learning_sessions_user_topic_idx ON (user_id, topic_id)`

### 3.4. `public.saved_resources`
Persists adaptive media generated by learners (Mind Maps, Podcasts, Video Storyboards).
- `id`: `text NOT NULL`
- `user_id`: `uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `topic_id`: `text NOT NULL`
- `subject_id`: `text NOT NULL`
- `resource_type`: `text NOT NULL CHECK (resource_type IN ('mindmap', 'podcast', 'video'))`
- `title`: `text NOT NULL`
- `associated_gaps`: `text[] NOT NULL DEFAULT '{}'`
- `content`: `jsonb NOT NULL`
- `saved_at`: `timestamptz NOT NULL DEFAULT timezone('utc'::text, now())`
- **Primary Key**: `PRIMARY KEY (user_id, id)`
- **Constraint**: `saved_resources_content_size CHECK (octet_length(content::text) <= 131072)` (128 KB content bound).
- **Indexes**:
  - `saved_resources_user_saved_at_idx ON (user_id, saved_at DESC)`
  - `saved_resources_user_topic_idx ON (user_id, topic_id)`

### 3.5. `public.learning_preferences`
Stores personal style affinities without duplicating educational profile fields (`preferred_board`, `grade_level`, `preferred_language` in `public.profiles`).
- `user_id`: `uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`
- `primary_style`: `text NOT NULL DEFAULT 'explore-experiment'`
- `structured_affinity`: `integer NOT NULL DEFAULT 60 CHECK (structured_affinity BETWEEN 0 AND 100)`
- `visual_affinity`: `integer NOT NULL DEFAULT 78 CHECK (visual_affinity BETWEEN 0 AND 100)`
- `examples_affinity`: `integer NOT NULL DEFAULT 65 CHECK (examples_affinity BETWEEN 0 AND 100)`
- `explore_affinity`: `integer NOT NULL DEFAULT 84 CHECK (explore_affinity BETWEEN 0 AND 100)`
- `updated_at`: `timestamptz NOT NULL DEFAULT timezone('utc'::text, now())`

---

## 4. Row Level Security & Data API Grants

Every table enforces PostgreSQL Row Level Security (`FORCE ROW LEVEL SECURITY`). Anonymous (`anon`) role access is completely revoked across all five persistence tables.

```sql
-- Pattern applied across user tables
ALTER TABLE public.saved_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_topics FORCE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own saved topics"
  ON public.saved_topics FOR SELECT TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own saved topics"
  ON public.saved_topics FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own saved topics"
  ON public.saved_topics FOR UPDATE TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own saved topics"
  ON public.saved_topics FOR DELETE TO authenticated
  USING ((select auth.uid()) = user_id);

REVOKE ALL ON TABLE public.saved_topics FROM anon, public;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.saved_topics TO authenticated;
```

### Event Update Protection Guarantee
On `public.activity_events`, **no UPDATE policy exists** in PostgreSQL RLS:
```sql
-- RLS policies for activity_events:
CREATE POLICY "Users can select own activity events"
  ON public.activity_events FOR SELECT TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own activity events"
  ON public.activity_events FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own activity events"
  ON public.activity_events FOR DELETE TO authenticated
  USING ((select auth.uid()) = user_id);
```
Any attempt to update recorded events (even by the record owner) is strictly rejected by Postgres RLS, maintaining immutable audit trail integrity for historical events. Users retain the ability to delete their own records for privacy compliance and account teardown, but in-place modifications are structurally prevented by the database engine.

---

## 5. Guest-to-Account Synchronization & Migration Engine

### 5.1. Explicit Non-Silent Import
1. When an authenticated session is initialized, `AuthProvider` checks `storageService.hasGuestData()`.
2. If local guest records exist, `GuestImportModal` is opened.
3. The modal displays an itemized preview card:
   - Saved Topics count
   - Learning Activity Events count
   - Teaching Sessions count
   - Adaptive Media Resources count
4. Two explicit user actions:
   - **"Import to Account"**: Triggers idempotent cloud sync.
   - **"Keep Separate"**: Closes modal and leaves local guest data untouched.

### 5.2. Deterministic Deduplication & Conflict Strategy
- **Saved Topics**: Upserted on conflict `(user_id, topic_id)`: `{ onConflict: 'user_id,topic_id' }`. Pre-existing account topics and reflection notes are preserved.
- **Activity Events**: Converted from arbitrary client IDs (e.g. `guest_act_12345`) to RFC4122 v4 UUIDs using a deterministic hash (`stringToDeterministicUUID`). Retrying or repeating the import generates the **identical UUID**, resolving conflicts via `ON CONFLICT (user_id, id)` with `ignoreDuplicates: true` and zero row duplication.
- **Learning Sessions**: Evaluated assessments from guest topic history are mapped to `learning_sessions` with deterministic session IDs (`feyn_import_${topicId}_${index}_${hash}`). Upserted with `{ onConflict: 'user_id,id', ignoreDuplicates }`.
- **Saved Resources**: Upserted with `{ onConflict: 'user_id,id', ignoreDuplicates }`.
- **Learning Preferences**: Upserted with `{ onConflict: 'user_id' }`.
- **Pre-Existing Account Records**: Never deleted or overwritten during guest import.
- **Failure Resilience**: Local guest data is retained if an import fails or is interrupted. `storageService.clearGuestDataOnly()` is called only after the cloud persistence transaction verifies 100% completion.

---

## 6. Personal Learning Data Portability & Export

Authenticated learners can export their complete learning history as standard RFC-compliant JSON at any time from the **My Trajectory** dashboard.

Export Structure:
```json
{
  "application": "MULTIPATH Educational Platform",
  "version": "2.0.0",
  "exportedAt": "2026-11-13T11:23:45.123Z",
  "account": {
    "userId": "e6cc0640-2f0b-4c30-b067-253d508ea2ba",
    "profile": {
      "display_name": "Test Student A",
      "preferred_board": "CBSE",
      "grade_level": "Class 10",
      "preferred_language": "English"
    }
  },
  "learningData": {
    "savedTopics": ["math-linear-equations", "bio-photosynthesis"],
    "activityEvents": [...],
    "learningSessions": [...],
    "savedResources": [...],
    "preferences": {
      "primaryStyle": "visual-learning",
      "visualAffinity": 90,
      "structuredAffinity": 70
    }
  },
  "privacySummary": "Personal learning data export provided under student data ownership and portability guarantees. Enforced via authenticated PostgreSQL Row Level Security."
}
```

---

## 7. Verification Test Results

Unified test suite execution:
`npm test` ➔ `node tests/phase8_verification.js && node tests/phase12_supabase_verification.js && node tests/phase13_persistence_verification.js`

### Test Breakdown

| Suite | Focus Area | Tests | Status |
|---|---|---|---|
| **Phase 8** | Core Backend & AI Socratic/Feynman Reliability | 29 | 🟢 29/29 Passed |
| **Phase 12.1** | Supabase Gateway & Authenticated Auth Hardening | 18 | 🟢 18/18 Passed |
| **Phase 13** | Cloud Persistence & Dual-Account RLS Isolation | 22 | 🟢 22/22 Passed |
| **Phase 13.1** | Cross-Account Composite Identity & Import Collision Audit | 13 | 🟢 13/13 Passed |
| **Total Project Suite** | **Complete System End-to-End** | **82** | **🟢 82/82 Passed (100%)** |

### Verified Security & RLS Invariants
- `Account B CANNOT read Account A saved topics`: PASSED (0 rows returned)
- `Account B CANNOT read Account A activity events`: PASSED (0 rows returned)
- `Account B CANNOT read Account A learning sessions`: PASSED (0 rows returned)
- `Account B CANNOT read Account A saved resources`: PASSED (0 rows returned)
- `Account B CANNOT read Account A learning preferences`: PASSED (0 rows returned)
- `Account B CANNOT spoof insert under Account A user_id`: PASSED (RLS WITH CHECK violation error)
- `Account B CANNOT cross-update Account A saved topics`: PASSED (0 rows affected)
- `Account B CANNOT cross-delete Account A saved resources`: PASSED (0 rows affected)
- `Activity events are immutable: UPDATE blocked by RLS even for owner`: PASSED (0 rows affected, database values unchanged)
- `Guest-to-account import retry idempotency`: PASSED (Re-importing identical snapshot resulted in 0 duplicate records)

---

## 8. Supabase Advisor Audit

- **Security Advisor (`get_advisors(security)`):**
  - **0 Table Lints**: All tables have RLS enabled and forced, no security definer leaks, no public access.
  - Only informational warning is `auth_leaked_password_protection` (an auth-service password check option on Supabase free tier).
- **Performance Advisor (`get_advisors(performance)`):**
  - Foreign key and composite indexes on `saved_topics`, `activity_events`, `learning_sessions`, and `saved_resources` are verified and active.
  - Zero critical or high-impact performance lints.

---

## 9. Quality Gates Summary

- **Linter (`oxlint`)**: **0 errors, 0 warnings** across 111 files.
- **TypeScript Compiler (`tsc -b`)**: **0 errors**.
- **Production Build (`npm run build`)**: Succeeded in 2.72s. Main bundle footprint is **465.99 kB** (gzip: 110.84 kB), well within the 500 kB limit.
- **Git State**: Local modifications and untracked files are staged/ready locally; nothing has been pushed to remote repository or deployed to Vercel without user directive.
