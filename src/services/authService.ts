import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { 
  StudentProfile, 
  SignUpMetadata, 
  ProfileUpdatePayload 
} from '../types/auth';

export class AuthService {
  /**
   * Register a new student account with initial educational profile metadata
   */
  async signUp(email: string, password: string, meta: SignUpMetadata) {
    if (!isSupabaseConfigured() || !supabase) {
      return { 
        success: false, 
        needsVerification: false, 
        error: 'Supabase authentication is not configured in this environment.' 
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: meta.displayName,
            preferred_board: meta.preferredBoard,
            grade_level: meta.gradeLevel,
            preferred_language: meta.preferredLanguage,
          },
        },
      });

      if (error) {
        return { success: false, needsVerification: false, error: error.message };
      }

      // If session is null, email confirmation is required by Supabase Auth settings
      const needsVerification = !data.session && !!data.user;

      return { 
        success: true, 
        needsVerification, 
        user: data.user, 
        session: data.session 
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown registration error';
      return { success: false, needsVerification: false, error: msg };
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured() || !supabase) {
      return { 
        success: false, 
        error: 'Supabase authentication is not configured in this environment.' 
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user, session: data.session };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown login error';
      return { success: false, error: msg };
    }
  }

  /**
   * Sign out current user session
   */
  async signOut() {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('[AuthService] signOut error:', err);
      }
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string) {
    if (!isSupabaseConfigured() || !supabase) {
      return { 
        success: false, 
        error: 'Supabase authentication is not configured in this environment.' 
      };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/?tab=workspace` : undefined,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown password reset error';
      return { success: false, error: msg };
    }
  }

  /**
   * Resend signup verification email
   */
  async resendVerification(email: string) {
    if (!isSupabaseConfigured() || !supabase) {
      return { 
        success: false, 
        error: 'Supabase authentication is not configured in this environment.' 
      };
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown verification resend error';
      return { success: false, error: msg };
    }
  }

  /**
   * Fetch user's profile from profiles table enforcing RLS
   */
  async getProfile(userId: string): Promise<StudentProfile | null> {
    if (!isSupabaseConfigured() || !supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('[AuthService] getProfile error:', error.message);
        return null;
      }

      return data as StudentProfile | null;
    } catch (err) {
      console.warn('[AuthService] getProfile exception:', err);
      return null;
    }
  }

  /**
   * Update student profile fields
   */
  async updateProfile(userId: string, updates: ProfileUpdatePayload): Promise<{ success: boolean; profile?: StudentProfile; error?: string }> {
    if (!isSupabaseConfigured() || !supabase) {
      return { success: false, error: 'Supabase is not configured' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, profile: data as StudentProfile };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Profile update failed';
      return { success: false, error: msg };
    }
  }
}

export const authService = new AuthService();
