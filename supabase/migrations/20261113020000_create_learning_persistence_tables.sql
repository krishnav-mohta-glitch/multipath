-- MULTIPATH V2 — Phase 13 Migration
-- Cloud Data Persistence: saved_topics, activity_events, learning_sessions, saved_resources, learning_preferences

-- 1. SAVED TOPICS (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  notes text DEFAULT NULL,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT saved_topics_user_topic_key UNIQUE (user_id, topic_id)
);

ALTER TABLE public.saved_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_topics FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS saved_topics_user_id_idx ON public.saved_topics(user_id, created_at DESC);

CREATE POLICY "Users can select own saved topics"
  ON public.saved_topics FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own saved topics"
  ON public.saved_topics FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own saved topics"
  ON public.saved_topics FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own saved topics"
  ON public.saved_topics FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

REVOKE ALL ON TABLE public.saved_topics FROM anon, public;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.saved_topics TO authenticated;


-- 2. ACTIVITY EVENTS (Immutable audit stream of learning interactions)
CREATE TABLE IF NOT EXISTS public.activity_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  topic_id text NOT NULL,
  subject_id text NOT NULL,
  path_id text DEFAULT NULL,
  details text DEFAULT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  schema_version integer NOT NULL DEFAULT 1,
  timestamp timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT activity_events_type_check CHECK (
    event_type IN (
      'topic_viewed',
      'learning_mode_started',
      'learning_session_completed',
      'topic_bookmarked',
      'assessment_attempted',
      'resource_generated',
      'resource_saved',
      'resource_deleted'
    )
  ),
  CONSTRAINT activity_events_payload_size CHECK (octet_length(payload::text) <= 32768),
  CONSTRAINT activity_events_user_id_key UNIQUE (user_id, id)
);

ALTER TABLE public.activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_events FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS activity_events_user_timestamp_idx ON public.activity_events(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS activity_events_user_topic_idx ON public.activity_events(user_id, topic_id);

CREATE POLICY "Users can select own activity events"
  ON public.activity_events FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own activity events"
  ON public.activity_events FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own activity events"
  ON public.activity_events FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Explicitly NO UPDATE policy to enforce event immutability
REVOKE ALL ON TABLE public.activity_events FROM anon, public;
GRANT SELECT, INSERT, DELETE ON TABLE public.activity_events TO authenticated;


-- 3. LEARNING SESSIONS (Socratic Guided Discovery & Feynman Technique lifecycles)
CREATE TABLE IF NOT EXISTS public.learning_sessions (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  subject_id text NOT NULL,
  mode text NOT NULL,
  status text NOT NULL,
  turn_count integer NOT NULL DEFAULT 0,
  duration_seconds integer NOT NULL DEFAULT 0,
  history jsonb NOT NULL DEFAULT '[]'::jsonb,
  assessment_data jsonb DEFAULT NULL,
  started_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  completed_at timestamptz DEFAULT NULL,
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT learning_sessions_mode_check CHECK (mode IN ('socratic-discovery', 'feynman-technique')),
  CONSTRAINT learning_sessions_status_check CHECK (
    status IN (
      'planned',
      'started',
      'paused',
      'completed',
      'partially_completed',
      'abandoned',
      'skipped',
      'invalidated'
    )
  ),
  CONSTRAINT learning_sessions_history_size CHECK (octet_length(history::text) <= 65536)
);

ALTER TABLE public.learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_sessions FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS learning_sessions_user_status_idx ON public.learning_sessions(user_id, status, started_at DESC);
CREATE INDEX IF NOT EXISTS learning_sessions_user_topic_idx ON public.learning_sessions(user_id, topic_id);

CREATE POLICY "Users can select own learning sessions"
  ON public.learning_sessions FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own learning sessions"
  ON public.learning_sessions FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own learning sessions"
  ON public.learning_sessions FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own learning sessions"
  ON public.learning_sessions FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

REVOKE ALL ON TABLE public.learning_sessions FROM anon, public;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.learning_sessions TO authenticated;


-- 4. SAVED RESOURCES (Adaptive Media: Mind Maps, Podcasts, Video Storyboards)
CREATE TABLE IF NOT EXISTS public.saved_resources (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  subject_id text NOT NULL,
  resource_type text NOT NULL,
  title text NOT NULL,
  associated_gaps text[] NOT NULL DEFAULT '{}',
  content jsonb NOT NULL,
  saved_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT saved_resources_type_check CHECK (resource_type IN ('mindmap', 'podcast', 'video')),
  CONSTRAINT saved_resources_content_size CHECK (octet_length(content::text) <= 131072)
);

ALTER TABLE public.saved_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_resources FORCE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS saved_resources_user_saved_at_idx ON public.saved_resources(user_id, saved_at DESC);
CREATE INDEX IF NOT EXISTS saved_resources_user_topic_idx ON public.saved_resources(user_id, topic_id);

CREATE POLICY "Users can select own saved resources"
  ON public.saved_resources FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own saved resources"
  ON public.saved_resources FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own saved resources"
  ON public.saved_resources FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own saved resources"
  ON public.saved_resources FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

REVOKE ALL ON TABLE public.saved_resources FROM anon, public;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.saved_resources TO authenticated;


-- 5. LEARNING PREFERENCES (Style affinities without duplicating profiles fields)
CREATE TABLE IF NOT EXISTS public.learning_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  primary_style text NOT NULL DEFAULT 'explore-experiment',
  structured_affinity integer NOT NULL DEFAULT 60 CHECK (structured_affinity BETWEEN 0 AND 100),
  visual_affinity integer NOT NULL DEFAULT 78 CHECK (visual_affinity BETWEEN 0 AND 100),
  examples_affinity integer NOT NULL DEFAULT 65 CHECK (examples_affinity BETWEEN 0 AND 100),
  explore_affinity integer NOT NULL DEFAULT 84 CHECK (explore_affinity BETWEEN 0 AND 100),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.learning_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_preferences FORCE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own learning preferences"
  ON public.learning_preferences FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own learning preferences"
  ON public.learning_preferences FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own learning preferences"
  ON public.learning_preferences FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own learning preferences"
  ON public.learning_preferences FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

REVOKE ALL ON TABLE public.learning_preferences FROM anon, public;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.learning_preferences TO authenticated;
