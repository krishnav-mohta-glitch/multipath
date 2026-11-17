-- MULTIPATH V3 — Senior Secondary (Classes 11 & 12) Expansion
-- Migration: 20261117000000_expand_class_levels_to_12.sql
-- Expands class_level check constraints from [6..10] to [6..12] for CBSE & CISCE

ALTER TABLE public.curriculum_subjects DROP CONSTRAINT IF EXISTS curriculum_subjects_class_level_check;
ALTER TABLE public.curriculum_subjects ADD CONSTRAINT curriculum_subjects_class_level_check CHECK (class_level BETWEEN 6 AND 12);

ALTER TABLE public.curriculum_topic_mappings DROP CONSTRAINT IF EXISTS curriculum_topic_mappings_class_level_check;
ALTER TABLE public.curriculum_topic_mappings ADD CONSTRAINT curriculum_topic_mappings_class_level_check CHECK (class_level BETWEEN 6 AND 12);
