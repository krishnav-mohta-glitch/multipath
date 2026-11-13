-- MULTIPATH V2 — Phase 14: Curriculum Catalogue Architecture
-- Migration: 20261113050000_curriculum_catalog.sql
-- Establishes verified, traceable curriculum structures for CBSE and ICSE/CISCE (Classes 6–10)
-- Strict scope: ICSE/CISCE and CBSE only. No IB, Cambridge, or State Board.

-- ============================================================================
-- 1. CURRICULUM BOARDS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.curriculum_boards (
  code text PRIMARY KEY CHECK (code IN ('CBSE', 'CISCE')),
  name text NOT NULL,
  full_name text NOT NULL,
  country text NOT NULL DEFAULT 'India',
  website_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 2. CURRICULUM YEARS / ACADEMIC COHORTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.curriculum_years (
  id text PRIMARY KEY,
  board_code text NOT NULL REFERENCES public.curriculum_boards(code) ON DELETE CASCADE,
  academic_year text NOT NULL,
  target_cohort text NOT NULL,
  is_current boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 3. CURRICULUM SOURCES (Auditable Provenance)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.curriculum_sources (
  id text PRIMARY KEY,
  board_code text NOT NULL REFERENCES public.curriculum_boards(code) ON DELETE CASCADE,
  title text NOT NULL,
  official_url text NOT NULL,
  document_reference text NOT NULL,
  publication_date text NOT NULL,
  edition_or_session text NOT NULL,
  page_or_section text,
  verification_notes text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 4. CURRICULUM SUBJECTS (Board & Class Prescriptions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.curriculum_subjects (
  id text PRIMARY KEY,
  board_code text NOT NULL REFERENCES public.curriculum_boards(code) ON DELETE CASCADE,
  class_level integer NOT NULL CHECK (class_level BETWEEN 6 AND 10),
  subject_code text,
  subject_name text NOT NULL,
  subject_category text NOT NULL CHECK (subject_category IN ('mathematics', 'science', 'social_sciences', 'languages', 'computing_tech')),
  is_integrated boolean NOT NULL DEFAULT false,
  is_compulsory boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 5. CANONICAL TOPICS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.topics (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  overview text NOT NULL,
  why_it_matters text,
  subject_category text NOT NULL CHECK (subject_category IN ('mathematics', 'science', 'social_sciences', 'languages', 'computing_tech')),
  recommended_grade_band text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Foundational', 'Intermediate', 'Advanced')),
  estimated_minutes integer NOT NULL DEFAULT 20,
  learning_objectives text[] NOT NULL DEFAULT '{}',
  prerequisites text[] NOT NULL DEFAULT '{}',
  key_concepts text[] NOT NULL DEFAULT '{}',
  has_3d_experience boolean NOT NULL DEFAULT false,
  three_experience_id text,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 6. CURRICULUM TOPIC MAPPINGS (Board / Class Syllabus Binding)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.curriculum_topic_mappings (
  id text PRIMARY KEY,
  topic_id text NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  board_code text NOT NULL REFERENCES public.curriculum_boards(code) ON DELETE CASCADE,
  class_level integer NOT NULL CHECK (class_level BETWEEN 6 AND 10),
  subject_id text NOT NULL REFERENCES public.curriculum_subjects(id) ON DELETE CASCADE,
  unit_name text NOT NULL,
  chapter_or_topic text NOT NULL,
  curriculum_year_id text NOT NULL REFERENCES public.curriculum_years(id) ON DELETE CASCADE,
  source_id text NOT NULL REFERENCES public.curriculum_sources(id) ON DELETE CASCADE,
  page_or_section text,
  verification_status text NOT NULL CHECK (verification_status IN ('verified_official', 'framework_supported', 'school_dependent', 'pending_verification')),
  verification_notes text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT curriculum_topic_mappings_unique UNIQUE (board_code, class_level, subject_id, topic_id)
);

-- ============================================================================
-- 7. TOPIC LEARNING PATHS (Pedagogical Content Blocks)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.topic_learning_paths (
  id text PRIMARY KEY,
  topic_id text NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  path_type text NOT NULL CHECK (path_type IN ('structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment')),
  title text NOT NULL,
  introduction text,
  content_blocks jsonb NOT NULL DEFAULT '[]'::jsonb,
  summary_takeaways text[] NOT NULL DEFAULT '{}',
  practice_questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  reflection_prompt text,
  interactive_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT topic_learning_paths_unique UNIQUE (topic_id, path_type)
);

-- ============================================================================
-- INDEXES FOR FAST CATALOG SEARCH & FILTERING
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_curriculum_mappings_board_class 
  ON public.curriculum_topic_mappings (board_code, class_level);

CREATE INDEX IF NOT EXISTS idx_curriculum_mappings_subject 
  ON public.curriculum_topic_mappings (subject_id);

CREATE INDEX IF NOT EXISTS idx_curriculum_mappings_topic 
  ON public.curriculum_topic_mappings (topic_id);

CREATE INDEX IF NOT EXISTS idx_curriculum_mappings_verification 
  ON public.curriculum_topic_mappings (verification_status);

CREATE INDEX IF NOT EXISTS idx_topics_subject_category 
  ON public.topics (subject_category);

CREATE INDEX IF NOT EXISTS idx_topics_difficulty 
  ON public.topics (difficulty);

CREATE INDEX IF NOT EXISTS idx_curriculum_subjects_board_class 
  ON public.curriculum_subjects (board_code, class_level);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) & ACCESS CONTROL
-- ============================================================================

-- Enable and force RLS on all 7 tables
ALTER TABLE public.curriculum_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_boards FORCE ROW LEVEL SECURITY;

ALTER TABLE public.curriculum_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_years FORCE ROW LEVEL SECURITY;

ALTER TABLE public.curriculum_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_sources FORCE ROW LEVEL SECURITY;

ALTER TABLE public.curriculum_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_subjects FORCE ROW LEVEL SECURITY;

ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics FORCE ROW LEVEL SECURITY;

ALTER TABLE public.curriculum_topic_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_topic_mappings FORCE ROW LEVEL SECURITY;

ALTER TABLE public.topic_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_learning_paths FORCE ROW LEVEL SECURITY;

-- Revoke all write privileges from public, anon, and authenticated roles
REVOKE ALL ON TABLE public.curriculum_boards FROM anon, public;
REVOKE ALL ON TABLE public.curriculum_years FROM anon, public;
REVOKE ALL ON TABLE public.curriculum_sources FROM anon, public;
REVOKE ALL ON TABLE public.curriculum_subjects FROM anon, public;
REVOKE ALL ON TABLE public.topics FROM anon, public;
REVOKE ALL ON TABLE public.curriculum_topic_mappings FROM anon, public;
REVOKE ALL ON TABLE public.topic_learning_paths FROM anon, public;

-- Grant SELECT only to anon and authenticated
GRANT SELECT ON TABLE public.curriculum_boards TO anon, authenticated;
GRANT SELECT ON TABLE public.curriculum_years TO anon, authenticated;
GRANT SELECT ON TABLE public.curriculum_sources TO anon, authenticated;
GRANT SELECT ON TABLE public.curriculum_subjects TO anon, authenticated;
GRANT SELECT ON TABLE public.topics TO anon, authenticated;
GRANT SELECT ON TABLE public.curriculum_topic_mappings TO anon, authenticated;
GRANT SELECT ON TABLE public.topic_learning_paths TO anon, authenticated;

-- Service role retains full management rights
GRANT ALL ON TABLE public.curriculum_boards TO service_role;
GRANT ALL ON TABLE public.curriculum_years TO service_role;
GRANT ALL ON TABLE public.curriculum_sources TO service_role;
GRANT ALL ON TABLE public.curriculum_subjects TO service_role;
GRANT ALL ON TABLE public.topics TO service_role;
GRANT ALL ON TABLE public.curriculum_topic_mappings TO service_role;
GRANT ALL ON TABLE public.topic_learning_paths TO service_role;

-- SELECT Policies:
DROP POLICY IF EXISTS "Public can view active boards" ON public.curriculum_boards;
CREATE POLICY "Public can view active boards"
  ON public.curriculum_boards FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Public can view curriculum years" ON public.curriculum_years;
CREATE POLICY "Public can view curriculum years"
  ON public.curriculum_years FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view curriculum sources" ON public.curriculum_sources;
CREATE POLICY "Public can view curriculum sources"
  ON public.curriculum_sources FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view curriculum subjects" ON public.curriculum_subjects;
CREATE POLICY "Public can view curriculum subjects"
  ON public.curriculum_subjects FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view published topics" ON public.topics;
CREATE POLICY "Public can view published topics"
  ON public.topics FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Public can view non-pending mappings" ON public.curriculum_topic_mappings;
CREATE POLICY "Public can view non-pending mappings"
  ON public.curriculum_topic_mappings FOR SELECT
  USING (verification_status != 'pending_verification');

DROP POLICY IF EXISTS "Public can view topic learning paths" ON public.topic_learning_paths;
CREATE POLICY "Public can view topic learning paths"
  ON public.topic_learning_paths FOR SELECT
  USING (true);
