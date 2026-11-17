import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FeaturePreviewModal } from './components/common/FeaturePreviewModal';
import { AuthModal } from './components/auth/AuthModal';
import { GuestImportModal } from './components/auth/GuestImportModal';
import { StudentPassionOnboardingModal } from './components/onboarding/StudentPassionOnboardingModal';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { MyLearningPage } from './pages/MyLearningPage';

const AppContent: React.FC = () => {
  const { currentTab, navigateTo } = useApp();
  const { user, isLoading, openAuthModal } = useAuth();

  // Strict application-level route guard: unauthenticated users cannot access protected views
  useEffect(() => {
    if (!isLoading && !user && currentTab !== 'home') {
      navigateTo('home');
      openAuthModal('login', 'Authentication required. Please sign in or register to access the curriculum and workspaces.');
    }
  }, [isLoading, user, currentTab, navigateTo, openAuthModal]);

  // Distinct session loading state to eliminate flash of protected content
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#080A0E] text-[#F3F4EC] font-mono text-xs gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#B8FF00] border-t-transparent animate-spin" />
        <span className="text-[#8DA391] uppercase tracking-wider">Resolving Secure Observatory Session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080A0E] text-[#F3F4EC] font-sans selection:bg-[#B8FF00] selection:text-[#080A0E]">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Main Routed Page Content with Strict Authentication Boundary */}
      <div className="flex-1">
        {currentTab === 'home' && <HomePage />}
        {user && currentTab === 'library' && <LibraryPage />}
        {user && currentTab === 'workspace' && <WorkspacePage />}
        {user && currentTab === 'mylearning' && <MyLearningPage />}
      </div>

      {/* Universal Footer */}
      <Footer />

      {/* Global Core Feature Presentation Modal */}
      <FeaturePreviewModal />

      {/* Supabase Authentication & Profile Modal */}
      <AuthModal />

      {/* Guest-to-Account Migration Modal */}
      <GuestImportModal />

      {/* Student Passion Onboarding & Personalization Interview Modal */}
      <StudentPassionOnboardingModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
