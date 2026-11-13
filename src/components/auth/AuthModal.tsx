import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  BookOpen, 
  GraduationCap, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  LogOut, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { CurriculumBoard, GradeLevel, StudentProfile, AuthModalMode } from '../../types/auth';

const CURRICULUM_BOARDS: CurriculumBoard[] = [
  'CBSE',
  'ICSE/CISCE',
  'Unspecified'
];

const GRADE_LEVELS: GradeLevel[] = [
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'General'
];

// ----------------------------------------------------------------------------
// 1. SIGN IN VIEW
// ----------------------------------------------------------------------------
const SignInView: React.FC<{
  onSuccess: () => void;
  switchMode: (m: AuthModalMode) => void;
  onContinueGuest: () => void;
  isConfigured: boolean;
}> = ({ onSuccess, switchMode, onContinueGuest, isConfigured }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await signIn(email, password);
    setIsSubmitting(false);

    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
          Student Email
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8DA391]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
            required
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
            Password
          </label>
          <button
            type="button"
            onClick={() => switchMode('forgot-password')}
            className="text-xs text-[#5E7A65] hover:text-[#111714] underline underline-offset-2"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8DA391]" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isConfigured}
        className="w-full py-2.5 px-4 rounded-xl bg-[#111714] text-[#F3F4EC] hover:bg-[#19211C] font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs"
      >
        {isSubmitting ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C8F36B]" />
            <span>Authenticating...</span>
          </>
        ) : (
          <>
            <span>Sign In to MULTIPATH</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8F36B]" />
          </>
        )}
      </button>

      <div className="pt-2 border-t border-[#DFE2D7] flex flex-col gap-2.5 text-center">
        <button
          type="button"
          onClick={onContinueGuest}
          className="w-full py-2 px-3 rounded-xl bg-[#E8EAE1] hover:bg-[#DFE2D7] text-xs text-[#171C18] font-medium transition-colors"
        >
          Continue as Guest Learner (No Account Required)
        </button>

        <p className="text-xs text-[#5E7A65]">
          Need an account?{' '}
          <button
            type="button"
            onClick={() => switchMode('register')}
            className="font-bold text-[#111714] underline underline-offset-2"
          >
            Register here
          </button>
        </p>
      </div>
    </form>
  );
};

// ----------------------------------------------------------------------------
// 2. REGISTRATION VIEW
// ----------------------------------------------------------------------------
const RegisterView: React.FC<{
  onSuccess: (needsVerification: boolean, email: string) => void;
  switchMode: (m: AuthModalMode) => void;
  isConfigured: boolean;
}> = ({ onSuccess, switchMode, isConfigured }) => {
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredBoard, setPreferredBoard] = useState<CurriculumBoard>('CBSE');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('Class 10');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    const res = await signUp(email, password, {
      displayName: displayName.trim() || email.split('@')[0],
      preferredBoard,
      gradeLevel,
      preferredLanguage: preferredLanguage.trim() || 'English',
    });
    setIsSubmitting(false);

    if (res.success) {
      onSuccess(res.needsVerification, email);
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1">
        <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
          Student Name
        </label>
        <div className="relative">
          <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8DA391]" />
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Arjun Sharma"
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
            Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8DA391]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              required
              className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
            Password (6+ chars)
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8DA391]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#111714]" />
            <span>Curriculum Board</span>
          </label>
          <select
            value={preferredBoard}
            onChange={(e) => setPreferredBoard(e.target.value as CurriculumBoard)}
            className="w-full px-3 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
          >
            {CURRICULUM_BOARDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#111714]" />
            <span>Grade / Class</span>
          </label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
            className="w-full px-3 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
          >
            {GRADE_LEVELS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#111714]" />
          <span>Instruction Language</span>
        </label>
        <input
          type="text"
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
          placeholder="e.g. English, Hindi"
          className="w-full px-3.5 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isConfigured}
        className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#111714] text-[#F3F4EC] hover:bg-[#19211C] font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs"
      >
        {isSubmitting ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C8F36B]" />
            <span>Creating Profile...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-[#C8F36B]" />
            <span>Register Student Account</span>
          </>
        )}
      </button>

      <div className="pt-2 border-t border-[#DFE2D7] text-center text-xs text-[#5E7A65]">
        Already registered?{' '}
        <button
          type="button"
          onClick={() => switchMode('login')}
          className="font-bold text-[#111714] underline underline-offset-2"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

// ----------------------------------------------------------------------------
// 3. FORGOT PASSWORD VIEW
// ----------------------------------------------------------------------------
const ForgotPasswordView: React.FC<{
  switchMode: (m: AuthModalMode) => void;
  isConfigured: boolean;
}> = ({ switchMode, isConfigured }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!email) {
      setError('Please enter your account email address.');
      return;
    }

    setIsSubmitting(true);
    const res = await resetPassword(email);
    setIsSubmitting(false);

    if (res.success) {
      setMessage('Password recovery email dispatched. Please check your inbox.');
    } else {
      setError(res.error || 'Failed to dispatch password recovery link.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xs text-[#5E7A65] leading-relaxed">
        Enter your registered student email address. We will dispatch a secure recovery link to reset your credentials.
      </p>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="p-3 rounded-xl bg-[#C8F36B]/20 border border-[#C8F36B]/40 text-[#111714] text-xs flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#5E7A65]" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
          Registered Email
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8DA391]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
            required
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isConfigured}
        className="w-full py-2.5 px-4 rounded-xl bg-[#111714] text-[#F3F4EC] hover:bg-[#19211C] font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Sending Recovery Link...' : 'Send Recovery Email'}
      </button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => switchMode('login')}
          className="text-xs text-[#5E7A65] hover:text-[#111714] underline underline-offset-2"
        >
          Back to Sign In
        </button>
      </div>
    </form>
  );
};

// ----------------------------------------------------------------------------
// 4. VERIFICATION SENT VIEW
// ----------------------------------------------------------------------------
const VerificationSentView: React.FC<{
  email: string;
  switchMode: (m: AuthModalMode) => void;
}> = ({ email, switchMode }) => {
  const { resendVerification } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setIsSubmitting(true);
    setError(null);
    setMessage(null);
    const res = await resendVerification(email);
    setIsSubmitting(false);

    if (res.success) {
      setMessage('Verification email has been resent to your inbox.');
    } else {
      setError(res.error || 'Failed to resend verification email.');
    }
  };

  return (
    <div className="space-y-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#C8F36B]/20 border border-[#C8F36B]/40 text-[#111714] flex items-center justify-center mx-auto">
        <Mail className="w-6 h-6 text-[#111714]" />
      </div>

      <div className="space-y-1">
        <h3 className="font-mono text-sm uppercase tracking-wider font-bold text-[#111714]">
          Verification Email Dispatched
        </h3>
        <p className="text-xs text-[#5E7A65] leading-relaxed">
          We sent a confirmation link to <strong className="text-[#171C18]">{email || 'your email'}</strong>. Please verify your address to finalize account activation.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-left flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="p-3 rounded-xl bg-[#C8F36B]/20 border border-[#C8F36B]/40 text-[#111714] text-xs text-left flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#5E7A65]" />
          <span>{message}</span>
        </div>
      )}

      <div className="pt-2 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleResend}
          disabled={isSubmitting}
          className="py-2.5 px-4 rounded-xl bg-[#111714] text-[#F3F4EC] font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Resending...' : 'Resend Verification Email'}
        </button>

        <button
          type="button"
          onClick={() => switchMode('login')}
          className="py-2 px-3 rounded-xl bg-[#E8EAE1] hover:bg-[#DFE2D7] text-xs text-[#171C18]"
        >
          Return to Sign In
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 5. PROFILE SETTINGS VIEW
// ----------------------------------------------------------------------------
const ProfileSettingsView: React.FC<{
  profile: StudentProfile | null;
  userEmail?: string;
  onClose: () => void;
}> = ({ profile, userEmail, onClose }) => {
  const { updateProfile, signOut } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [preferredBoard, setPreferredBoard] = useState<CurriculumBoard>(profile?.preferred_board || 'CBSE');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>(profile?.grade_level || 'Class 10');
  const [preferredLanguage, setPreferredLanguage] = useState(profile?.preferred_language || 'English');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    setIsSubmitting(true);
    const res = await updateProfile({
      display_name: displayName.trim() || undefined,
      preferred_board: preferredBoard,
      grade_level: gradeLevel,
      preferred_language: preferredLanguage.trim() || 'English',
    });
    setIsSubmitting(false);

    if (res.success) {
      setMessage('Educational profile saved successfully.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setError(res.error || 'Failed to update profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3.5 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#5E7A65]">
            Signed in as
          </div>
          <div className="text-xs font-bold text-[#111714]">
            {userEmail || 'Authenticated User'}
          </div>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="p-3 rounded-xl bg-[#C8F36B]/20 border border-[#C8F36B]/40 text-[#111714] text-xs flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#5E7A65]" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-1">
        <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Student Name"
          className="w-full px-3.5 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
            Curriculum Board
          </label>
          <select
            value={preferredBoard}
            onChange={(e) => setPreferredBoard(e.target.value as CurriculumBoard)}
            className="w-full px-3 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
          >
            {CURRICULUM_BOARDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
            Grade Level
          </label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
            className="w-full px-3 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
          >
            {GRADE_LEVELS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-mono text-xs text-[#5E7A65] uppercase tracking-wider block">
          Instruction Language
        </label>
        <input
          type="text"
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
          placeholder="e.g. English, Hindi"
          className="w-full px-3.5 py-2 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] text-xs text-[#171C18] focus:outline-hidden focus:border-[#111714]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 rounded-xl bg-[#111714] text-[#F3F4EC] hover:bg-[#19211C] font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Saving Profile...' : 'Save Profile Changes'}
      </button>
    </form>
  );
};

// ----------------------------------------------------------------------------
// MAIN AUTH MODAL CONTAINER
// ----------------------------------------------------------------------------
export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    closeAuthModal, 
    setAuthModalMode, 
    continueAsGuest,
    user,
    profile,
    isConfigured,
  } = useAuth();

  const [registeredEmail, setRegisteredEmail] = useState('');

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        className="w-full max-w-md bg-[#F1F1E9] text-[#171C18] rounded-3xl border border-[#DFE2D7] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#111714] text-[#F3F4EC] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8F36B] shadow-[0_0_8px_rgba(200,243,107,0.6)]" />
            <h2 id="auth-modal-title" className="font-mono text-xs uppercase tracking-wider font-semibold text-[#F3F4EC]">
              {authModalMode === 'login' && 'Student Access • Sign In'}
              {authModalMode === 'register' && 'New Learner • Profile Registration'}
              {authModalMode === 'forgot-password' && 'Account Recovery'}
              {authModalMode === 'verification-sent' && 'Verify Email Address'}
              {authModalMode === 'profile' && 'Learner Profile Settings'}
            </h2>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-xl hover:bg-white/10 text-[#8DA391] hover:text-[#F3F4EC] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#C8F36B]"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Unconfigured Warning Banner */}
        {!isConfigured && (
          <div className="px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-amber-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Supabase credentials not configured. Operating in Offline Guest Mode.</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          {authModalMode === 'login' && (
            <SignInView
              onSuccess={closeAuthModal}
              switchMode={setAuthModalMode}
              onContinueGuest={continueAsGuest}
              isConfigured={isConfigured}
            />
          )}

          {authModalMode === 'register' && (
            <RegisterView
              onSuccess={(needsVerification, em) => {
                if (needsVerification) {
                  setRegisteredEmail(em);
                  setAuthModalMode('verification-sent');
                } else {
                  closeAuthModal();
                }
              }}
              switchMode={setAuthModalMode}
              isConfigured={isConfigured}
            />
          )}

          {authModalMode === 'forgot-password' && (
            <ForgotPasswordView
              switchMode={setAuthModalMode}
              isConfigured={isConfigured}
            />
          )}

          {authModalMode === 'verification-sent' && (
            <VerificationSentView
              email={registeredEmail}
              switchMode={setAuthModalMode}
            />
          )}

          {authModalMode === 'profile' && (
            <ProfileSettingsView
              profile={profile}
              userEmail={user?.email}
              onClose={closeAuthModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};
