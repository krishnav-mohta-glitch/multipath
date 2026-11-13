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
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    if (!isSupabaseConfigured()) return true;
    if (typeof window !== 'undefined') {
      return localStorage.getItem(GUEST_STORAGE_KEY) === 'true';
    }
    return true;
  });
  const [error, setError] = useState<string | null>(null);

  // Modal UI State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');

  // Guest-to-Account Migration Modal State
  const [isGuestImportModalOpen, setIsGuestImportModalOpen] = useState<boolean>(false);

  // Fetch or sync profile for authenticated user
  const loadProfileForUser = useCallback(async (userId: string) => {
    try {
      const p = await authService.getProfile(userId);
      setProfile(p);
    } catch (err) {
      console.warn('[AuthProvider] Error loading student profile:', err);
    }
  }, []);

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
        setIsGuest(false);
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
        setIsGuest(true);
        storageService.setActiveUserId(null);
        setIsLoading(false);
      }
    }).catch((err) => {
      console.warn('[AuthProvider] Session retrieval exception:', err);
      if (isMounted) {
        setIsLoading(false);
        setIsGuest(true);
        storageService.setActiveUserId(null);
      }
    });

    // 2. Subscribe to auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!isMounted) return;

      if (currentSession?.user) {
        setSession(currentSession);
        setUser(currentSession.user);
        setIsGuest(false);
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
        setIsGuest(true);
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
  const openAuthModal = useCallback((mode: AuthModalMode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setError(null);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
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

  // Continue as Guest without cloud account
  const continueAsGuest = useCallback(() => {
    setIsGuest(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(GUEST_STORAGE_KEY, 'true');
    }
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

  // Sign out
  const signOut = useCallback(async () => {
    await authService.signOut();
    storageService.setActiveUserId(null);
    setUser(null);
    setProfile(null);
    setSession(null);
    setIsGuest(true);
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
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,

    isGuestImportModalOpen,
    openGuestImportModal,
    closeGuestImportModal,
    importGuestDataToAccount,

    signUp,
    signIn,
    signOut,
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
    openAuthModal,
    closeAuthModal,
    isGuestImportModalOpen,
    openGuestImportModal,
    closeGuestImportModal,
    importGuestDataToAccount,
    signUp,
    signIn,
    signOut,
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
