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
