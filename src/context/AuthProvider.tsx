import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { cloudPersistenceService } from '../services/cloudPersistenceService';
import { AuthContext } from './AuthContextType';
import type { 
  StudentProfile, 
  AuthContextValue, 
  AuthModalMode, 
  SignUpMetadata, 
  ProfileUpdatePayload 
} from '../types/auth';
import type { GuestImportResult } from '../types/cloudPersistence';

const GUEST_STORAGE_KEY = 'multipath_is_guest';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const configured = useMemo(() => isSupabaseConfigured(), []);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => isSupabaseConfigured());
  const [error, setError] = useState<string | null>(null);

  // Derived state: guest if no authenticated user and not loading
  const isGuest = !user && !isLoading;

  // Modal UI State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');
  const [authPromptReason, setAuthPromptReason] = useState<string | null>(null);

  // Guest-to-Account Migration Modal State
  const [isGuestImportModalOpen, setIsGuestImportModalOpen] = useState<boolean>(false);

  // Student Passion Onboarding Modal State
  const [isPassionModalOpen, setIsPassionModalOpen] = useState<boolean>(false);
  const openPassionModal = useCallback(() => setIsPassionModalOpen(true), []);
  const closePassionModal = useCallback(() => setIsPassionModalOpen(false), []);

  // Strict onboarding gate: if user is authenticated and hasn't finished onboarding, lock access
  const isOnboardingLocked = Boolean(user && (!profile || !profile.onboarding_completed));

  const deleteAccount = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'No authenticated user to delete.' };
    }
    try {
      setIsLoading(true);
      if (supabase) {
        await supabase.from('profiles').delete().eq('id', user.id);
        await supabase.from('saved_topics').delete().eq('user_id', user.id);
        await supabase.from('activity_events').delete().eq('user_id', user.id);
        await supabase.from('learning_sessions').delete().eq('user_id', user.id);
        await supabase.from('saved_resources').delete().eq('user_id', user.id);
        await supabase.from('user_preferences').delete().eq('user_id', user.id);
        await supabase.auth.signOut();
      }
      localStorage.clear();
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : 'Failed to delete account';
      return { success: false, error: msg };
    }
  }, [user]);

  // Fetch or sync profile for authenticated user
  const loadProfileForUser = useCallback(async (userId: string) => {
    try {
      const p = await authService.getProfile(userId);
      setProfile(p);
      // If user has not completed passion profiling, open onboarding modal
      if (p && !p.onboarding_completed) {
        setIsPassionModalOpen(true);
      }
    } catch (err) {
      console.warn('[AuthProvider] Error loading student profile:', err);
    }
  }, []);

  const updatePassion = useCallback(async (passion: string, details?: string) => {
    if (user) {
      try {
        await authService.updateProfile(user.id, {
          passion,
          passion_details: details,
          onboarding_completed: true,
        });
        await loadProfileForUser(user.id);
      } catch (err) {
        console.warn('[AuthProvider] updatePassion error:', err);
      }
    } else {
      localStorage.setItem('multipath_student_passion', passion);
      if (details) localStorage.setItem('multipath_student_passion_details', details);
      setProfile((prev) => prev ? {
        ...prev,
        passion,
        passion_details: details,
        onboarding_completed: true,
      } : {
        id: 'guest',
        display_name: 'Guest Learner',
        preferred_board: 'ICSE/CISCE',
        grade_level: 'Class 9',
        preferred_language: 'English',
        passion,
        passion_details: details,
        onboarding_completed: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    setIsPassionModalOpen(false);
  }, [user, loadProfileForUser]);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await loadProfileForUser(user.id);
    }
  }, [user, loadProfileForUser]);

  // Initial session hydration and real-time auth state listener
  useEffect(() => {
    if (!configured || !supabase) {
      return;
    }

    let isMounted = true;

    // 1. Initial session retrieval
    supabase.auth.getSession().then(({ data: { session: initialSession }, error: sessionError }) => {
      if (!isMounted) return;
      if (sessionError) {
        console.warn('[AuthProvider] getSession error:', sessionError.message);
      }

      if (initialSession?.user) {
        setSession(initialSession);
        setUser(initialSession.user);
        localStorage.setItem(GUEST_STORAGE_KEY, 'false');
        storageService.setActiveUserId(initialSession.user.id);

        // Check if guest data exists to offer migration
        if (storageService.hasGuestData()) {
          setIsGuestImportModalOpen(true);
        }

        loadProfileForUser(initialSession.user.id).finally(() => {
          if (isMounted) setIsLoading(false);
        });
      } else {
        setSession(null);
        setUser(null);
        setProfile(null);
        storageService.setActiveUserId(null);
        setIsLoading(false);
      }
    }).catch((err) => {
      console.warn('[AuthProvider] Session retrieval exception:', err);
      if (isMounted) {
        setIsLoading(false);
        storageService.setActiveUserId(null);
      }
    });

    // 2. Subscribe to auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!isMounted) return;

      if (currentSession?.user) {
        setSession(currentSession);
        setUser(currentSession.user);
        localStorage.setItem(GUEST_STORAGE_KEY, 'false');
        storageService.setActiveUserId(currentSession.user.id);

        if (event === 'SIGNED_IN' && storageService.hasGuestData()) {
          setIsGuestImportModalOpen(true);
        }

        await loadProfileForUser(currentSession.user.id);
      } else {
        setSession(null);
        setUser(null);
        setProfile(null);
        storageService.setActiveUserId(null);
        setIsGuestImportModalOpen(false);
      }

      if (event === 'SIGNED_OUT') {
        localStorage.setItem(GUEST_STORAGE_KEY, 'true');
        storageService.setActiveUserId(null);
        setIsGuestImportModalOpen(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [configured, loadProfileForUser]);

  // Open modal helper
  const openAuthModal = useCallback((mode: AuthModalMode = 'login', reason?: string) => {
    setAuthModalMode(mode);
    setAuthPromptReason(reason || null);
    setIsAuthModalOpen(true);
    setError(null);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setAuthPromptReason(null);
    setError(null);
  }, []);

  // Guest Import Modal Controls
  const openGuestImportModal = useCallback(() => {
    setIsGuestImportModalOpen(true);
  }, []);

  const closeGuestImportModal = useCallback(() => {
    setIsGuestImportModalOpen(false);
  }, []);

  const importGuestDataToAccount = useCallback(async (): Promise<GuestImportResult> => {
    if (!user) {
      return {
        success: false,
        importedCounts: { bookmarks: 0, activities: 0, sessions: 0, resources: 0 },
        errors: ['No authenticated user found to associate imported data.']
      };
    }

    const snapshot = await storageService.getGuestDataSnapshot();
    const result = await cloudPersistenceService.importGuestData(user.id, snapshot);
    if (result.success) {
      await storageService.syncUserBookmarksFromCloud(user.id);
    }
    return result;
  }, [user]);

  // Continue as Guest: returns to public overview without granting access to protected learning
  const continueAsGuest = useCallback(() => {
    setAuthPromptReason(null);
    storageService.setActiveUserId(null);
    closeAuthModal();
  }, [closeAuthModal]);

  // Sign up
  const signUp = useCallback(async (email: string, password: string, meta: SignUpMetadata) => {
    setError(null);
    const res = await authService.signUp(email, password, meta);
    if (!res.success) {
      setError(res.error || 'Registration failed');
      return { success: false, needsVerification: false, error: res.error };
    }

    if (res.needsVerification) {
      setAuthModalMode('verification-sent');
      return { success: true, needsVerification: true };
    }

    closeAuthModal();
    return { success: true, needsVerification: false };
  }, [closeAuthModal]);

  // Sign in
  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const res = await authService.signIn(email, password);
    if (!res.success) {
      setError(res.error || 'Authentication failed');
      return { success: false, error: res.error };
    }

    closeAuthModal();
    return { success: true };
  }, [closeAuthModal]);

  // Sign in with OAuth
  const signInWithOAuth = useCallback(async (provider: 'google' | 'facebook' | 'custom:instagram' | 'twitter') => {
    setError(null);
    const res = await authService.signInWithOAuth(provider);
    if (!res.success) {
      setError(res.error || `Authentication with ${provider} failed`);
      return { success: false, error: res.error };
    }
    return { success: true, url: res.url };
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    await authService.signOut();
    storageService.setActiveUserId(null);
    setUser(null);
    setProfile(null);
    setSession(null);
    setIsGuestImportModalOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(GUEST_STORAGE_KEY, 'true');
    }
    closeAuthModal();
  }, [closeAuthModal]);

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    setError(null);
    const res = await authService.resetPassword(email);
    if (!res.success) {
      setError(res.error || 'Failed to send password reset');
      return { success: false, error: res.error };
    }
    return { success: true };
  }, []);

  // Resend verification
  const resendVerification = useCallback(async (email: string) => {
    setError(null);
    const res = await authService.resendVerification(email);
    if (!res.success) {
      setError(res.error || 'Failed to resend verification email');
      return { success: false, error: res.error };
    }
    return { success: true };
  }, []);

  // Update profile
  const updateProfile = useCallback(async (updates: ProfileUpdatePayload) => {
    if (!user) {
      return { success: false, error: 'No authenticated user to update' };
    }
    const res = await authService.updateProfile(user.id, updates);
    if (res.success && res.profile) {
      setProfile(res.profile);
      return { success: true };
    }
    return { success: false, error: res.error };
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    profile,
    session,
    isLoading,
    isGuest,
    isConfigured: configured,
    error,

    isAuthModalOpen,
    authModalMode,
    authPromptReason,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
    setAuthPromptReason,

    isGuestImportModalOpen,
    openGuestImportModal,
    closeGuestImportModal,
    importGuestDataToAccount,

    isPassionModalOpen,
    isOnboardingLocked,
    openPassionModal,
    closePassionModal,
    updatePassion,

    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    deleteAccount,
    resetPassword,
    resendVerification,
    updateProfile,
    continueAsGuest,
    refreshProfile
  }), [
    user,
    profile,
    session,
    isLoading,
    isGuest,
    configured,
    error,
    isAuthModalOpen,
    authModalMode,
    authPromptReason,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
    setAuthPromptReason,
    isGuestImportModalOpen,
    openGuestImportModal,
    closeGuestImportModal,
    importGuestDataToAccount,
    isPassionModalOpen,
    isOnboardingLocked,
    openPassionModal,
    closePassionModal,
    updatePassion,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    deleteAccount,
    resetPassword,
    resendVerification,
    updateProfile,
    continueAsGuest,
    refreshProfile
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
