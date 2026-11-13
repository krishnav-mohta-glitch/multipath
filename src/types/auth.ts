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

export interface StudentProfile {
  id: string;
  display_name: string | null;
  preferred_board: CurriculumBoard;
  grade_level: GradeLevel;
  preferred_language: string;
  created_at: string;
  updated_at: string;
}

export type AuthModalMode = 'login' | 'register' | 'forgot-password' | 'verification-sent' | 'profile';

export interface SignUpMetadata {
  displayName: string;
  preferredBoard: CurriculumBoard;
  gradeLevel: GradeLevel;
  preferredLanguage: string;
}

export interface ProfileUpdatePayload {
  display_name?: string;
  preferred_board?: CurriculumBoard;
  grade_level?: GradeLevel;
  preferred_language?: string;
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
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: AuthModalMode) => void;

  // Guest-to-Account Migration Modal State
  isGuestImportModalOpen: boolean;
  openGuestImportModal: () => void;
  closeGuestImportModal: () => void;
  importGuestDataToAccount: () => Promise<GuestImportResult>;

  // Actions
  signUp: (email: string, password: string, meta: SignUpMetadata) => Promise<{ success: boolean; needsVerification: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resendVerification: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: ProfileUpdatePayload) => Promise<{ success: boolean; error?: string }>;
  continueAsGuest: () => void;
  refreshProfile: () => Promise<void>;
}

