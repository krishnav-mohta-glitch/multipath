-- Migration: 20261117010000_add_student_passion_profile.sql
-- Adds student passion profiling and onboarding completion flags to profiles

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS passion text DEFAULT 'football',
ADD COLUMN IF NOT EXISTS passion_details text,
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;

-- Allow students to update their own passion preferences under existing RLS
COMMENT ON COLUMN public.profiles.passion IS 'Student personal hobby or passion (e.g. football, cricket, gaming, space, music, robotics)';
COMMENT ON COLUMN public.profiles.passion_details IS 'Specific sub-interest or favorite aspect within the chosen passion';
COMMENT ON COLUMN public.profiles.onboarding_completed IS 'Flag indicating whether the student completed the onboarding passion interview';
