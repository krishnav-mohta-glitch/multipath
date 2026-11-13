-- MULTIPATH V2 — Phase 14.1: Curriculum Accuracy & Source Traceability Hardening
-- 1. Adds cisce-icse-2028 to curriculum_years for Class 9 cohort (appearing in 2028).
-- 2. Adds src-cisce-icse-2028 to curriculum_sources.
-- 3. Adds missing middle-school subjects (cisce-hist-6, cisce-cs-8, cbse-it-8, etc.) to curriculum_subjects.
-- 4. Corrects CISCE Class 9 mappings from 2026 examination to 2028 examination.
-- 5. Corrects subject-class mismatches on map-cisce-6-hist-indus, map-cbse-8-cs-computational-thinking, and map-cisce-8-cs-computational-thinking.
-- 6. Adds covering indexes for all foreign keys flagged by Supabase Performance Advisor.

-- Step 1: Ensure cisce-icse-2028 exists in curriculum_years
INSERT INTO public.curriculum_years (id, board_code, academic_year, target_cohort, is_current, notes)
VALUES (
  'cisce-icse-2028',
  'CISCE',
  '2028 Examination',
  'ICSE Class 9 (Entering Class 9 in 2026–27, appearing 2028 Examination)',
  true,
  'Official Regulations and Syllabuses for the ICSE Year 2028 Examination (Class IX Two-Year Course Year 1).'
)
ON CONFLICT (id) DO UPDATE SET
  academic_year = EXCLUDED.academic_year,
  target_cohort = EXCLUDED.target_cohort,
  is_current = EXCLUDED.is_current,
  notes = EXCLUDED.notes;

-- Step 2: Ensure src-cisce-icse-2028 exists in curriculum_sources
INSERT INTO public.curriculum_sources (id, board_code, title, official_url, document_reference, publication_date, edition_or_session, verification_notes)
VALUES (
  'src-cisce-icse-2028',
  'CISCE',
  'CISCE Regulations and Syllabuses for the Year 2028 Examination (Class IX Initial Year)',
  'https://cisce.org/regulations-and-syllabuses-icse-2028/',
  'ICSE-SYLL-2028',
  '2026-04-01',
  '2028 Examination Year',
  'Official prescribed syllabus for candidates admitted to Class IX in academic year 2026–27 appearing for the ICSE examination in March 2028.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  official_url = EXCLUDED.official_url,
  document_reference = EXCLUDED.document_reference,
  publication_date = EXCLUDED.publication_date,
  edition_or_session = EXCLUDED.edition_or_session,
  verification_notes = EXCLUDED.verification_notes;

-- Step 3: Add middle-school subjects for exact class-level alignment
INSERT INTO public.curriculum_subjects (id, board_code, class_level, subject_code, subject_name, subject_category, is_integrated, is_compulsory)
VALUES
  ('cisce-hist-6', 'CISCE', 6, '50', 'History & Civics', 'social_sciences', false, true),
  ('cisce-geo-6', 'CISCE', 6, '50', 'Geography', 'social_sciences', false, true),
  ('cisce-cs-6', 'CISCE', 6, NULL, 'Computer Studies', 'computing_tech', false, false),
  ('cisce-hist-7', 'CISCE', 7, '50', 'History & Civics', 'social_sciences', false, true),
  ('cisce-geo-7', 'CISCE', 7, '50', 'Geography', 'social_sciences', false, true),
  ('cisce-cs-7', 'CISCE', 7, NULL, 'Computer Studies', 'computing_tech', false, false),
  ('cisce-hist-8', 'CISCE', 8, '50', 'History & Civics', 'social_sciences', false, true),
  ('cisce-geo-8', 'CISCE', 8, '50', 'Geography', 'social_sciences', false, true),
  ('cisce-cs-8', 'CISCE', 8, NULL, 'Computer Studies', 'computing_tech', false, false),
  ('cbse-it-8', 'CBSE', 8, NULL, 'Information Technology & Computational Thinking', 'computing_tech', false, false)
ON CONFLICT (id) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  subject_category = EXCLUDED.subject_category,
  is_compulsory = EXCLUDED.is_compulsory;

-- Step 4: Correct Class 9 CISCE examination year and source attribution (from 2026 to 2028)
UPDATE public.curriculum_topic_mappings
SET 
  curriculum_year_id = 'cisce-icse-2028',
  source_id = 'src-cisce-icse-2028',
  verification_notes = 'Prescribed under CISCE Regulations and Syllabuses for the Year 2028 Examination for Class IX (Course Year 1).'
WHERE board_code = 'CISCE' AND class_level = 9;

-- Step 5: Correct specific subject-class mismatches
UPDATE public.curriculum_topic_mappings
SET subject_id = 'cisce-hist-6'
WHERE id = 'map-cisce-6-hist-indus';

UPDATE public.curriculum_topic_mappings
SET subject_id = 'cbse-it-8'
WHERE id = 'map-cbse-8-cs-computational-thinking';

UPDATE public.curriculum_topic_mappings
SET subject_id = 'cisce-cs-8'
WHERE id = 'map-cisce-8-cs-computational-thinking';

-- Step 6: Add covering indexes for foreign keys (Performance & Traceability)
CREATE INDEX IF NOT EXISTS idx_curriculum_mappings_year 
  ON public.curriculum_topic_mappings(curriculum_year_id);

CREATE INDEX IF NOT EXISTS idx_curriculum_mappings_source 
  ON public.curriculum_topic_mappings(source_id);

CREATE INDEX IF NOT EXISTS idx_curriculum_sources_board 
  ON public.curriculum_sources(board_code);

CREATE INDEX IF NOT EXISTS idx_curriculum_years_board 
  ON public.curriculum_years(board_code);
