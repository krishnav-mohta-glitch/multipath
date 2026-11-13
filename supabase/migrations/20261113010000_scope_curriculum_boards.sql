-- MULTIPATH V2 — Phase 12.1: Curriculum Scope Hardening & Safe Trigger Migration
-- 1. Updates preferred_board constraint to initial product scope: ICSE/CISCE, CBSE, Unspecified.
-- 2. Hardens handle_new_user() to treat all raw_user_meta_data as untrusted input with safe fallbacks.

-- Step 1: Normalize any existing rows before altering constraints (idempotent safety)
UPDATE public.profiles 
SET preferred_board = 'Unspecified' 
WHERE preferred_board NOT IN ('ICSE/CISCE', 'CBSE', 'Unspecified');

-- Step 2: Update check constraint on preferred_board
ALTER TABLE public.profiles 
  DROP CONSTRAINT IF EXISTS profiles_preferred_board_check;

ALTER TABLE public.profiles 
  ADD CONSTRAINT profiles_preferred_board_check 
  CHECK (preferred_board IN ('ICSE/CISCE', 'CBSE', 'Unspecified'));

-- Step 3: Hardened handle_new_user() trigger function
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
