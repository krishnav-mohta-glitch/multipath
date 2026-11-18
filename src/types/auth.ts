import type { User, Session } from '@supabase/supabase-js';
import type { GuestImportResult } from './cloudPersistence';

// Initial release curriculum scope: ICSE/CISCE, CBSE, Unspecified.
// Extensible for future board support (State Boards, IB, Cambridge).
export type CurriculumBoard = 
  | 'ICSE/CISCE'
  | 'CBSE'
  | 'Unspecified';

export type GradeLevel = 
  | 'Class 6'
  | 'Class 7'
  | 'Class 8'
  | 'Class 9'
  | 'Class 10'
  | 'Class 11'
  | 'Class 12'
  | 'General';

export type StudentPassion = 
  | 'football'
  | 'cricket'
  | 'gaming'
  | 'space'
  | 'music'
  | 'robotics'
  | 'anime'
  | 'art'
  | 'cinema'
  | 'custom';

export interface StudentProfile {
  id: string;
  display_name: string | null;
  preferred_board: CurriculumBoard;
  grade_level: GradeLevel;
  preferred_language: string;
  passion?: string | null;
  passion_details?: string | null;
  interests?: string[];
  hobbies?: string[];
  learning_preferences?: string[];
  subject_familiarity?: Record<string, string>;
  onboarding_completed?: boolean;
  created_at: string;
  updated_at: string;
}

export type AuthModalMode = 'login' | 'register' | 'forgot-password' | 'verification-sent' | 'profile';

export interface SignUpMetadata {
  displayName: string;
  preferredBoard: CurriculumBoard;
  gradeLevel: GradeLevel;
  preferredLanguage: string;
  passion?: string;
  passionDetails?: string;
  interests?: string[];
  hobbies?: string[];
  learningPreferences?: string[];
  subjectFamiliarity?: Record<string, string>;
}

export interface ProfileUpdatePayload {
  display_name?: string;
  preferred_board?: CurriculumBoard;
  grade_level?: GradeLevel;
  preferred_language?: string;
  passion?: string;
  passion_details?: string;
  interests?: string[];
  hobbies?: string[];
  learning_preferences?: string[];
  subject_familiarity?: Record<string, string>;
  onboarding_completed?: boolean;
}

export interface ParsedStudentPreferences {
  interests: string[];
  hobbies: string[];
  learningPreferences: string[];
  subjectFamiliarity: Record<string, string>;
  activeInterest: string;
}

export function parseStudentPreferences(profile?: StudentProfile | null): ParsedStudentPreferences {
  const fallbackInterest = profile?.passion || 'football';
  let parsedJson: Partial<ParsedStudentPreferences> = {};

  if (profile?.passion_details) {
    try {
      if (profile.passion_details.trim().startsWith('{')) {
        parsedJson = JSON.parse(profile.passion_details);
      }
    } catch {
      // plain text details, ignore JSON parse
    }
  }

  return {
    interests: profile?.interests || parsedJson.interests || [fallbackInterest],
    hobbies: profile?.hobbies || parsedJson.hobbies || ['Exploring science'],
    learningPreferences: profile?.learning_preferences || parsedJson.learningPreferences || ['Step-by-step explanations', 'Interactive experiments'],
    subjectFamiliarity: profile?.subject_familiarity || parsedJson.subjectFamiliarity || {},
    activeInterest: parsedJson.activeInterest || fallbackInterest,
  };
}

export interface AuthState {
  user: User | null;
  profile: StudentProfile | null;
  session: Session | null;
  isLoading: boolean;
  isGuest: boolean;
  isConfigured: boolean;
  error: string | null;
}

export interface AuthContextValue extends AuthState {
  // Modal State
  isAuthModalOpen: boolean;
  authModalMode: AuthModalMode;
  authPromptReason: string | null;
  openAuthModal: (mode?: AuthModalMode, reason?: string) => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: AuthModalMode) => void;
  setAuthPromptReason: (reason: string | null) => void;

  // Guest-to-Account Migration Modal State
  isGuestImportModalOpen: boolean;
  openGuestImportModal: () => void;
  closeGuestImportModal: () => void;
  importGuestDataToAccount: () => Promise<GuestImportResult>;

  // Student Passion Onboarding Modal State
  isPassionModalOpen: boolean;
  isOnboardingLocked: boolean;
  openPassionModal: () => void;
  closePassionModal: () => void;
  updatePassion: (passion: string, details?: string) => Promise<void>;

  // Actions
  signUp: (email: string, password: string, meta: SignUpMetadata) => Promise<{ success: boolean; needsVerification: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithOAuth: (provider: 'google' | 'facebook' | 'custom:instagram' | 'twitter') => Promise<{ success: boolean; error?: string; url?: string }>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resendVerification: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: ProfileUpdatePayload) => Promise<{ success: boolean; error?: string }>;
  continueAsGuest: () => void;
  refreshProfile: () => Promise<void>;
}

