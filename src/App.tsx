import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FeaturePreviewModal } from './components/common/FeaturePreviewModal';
import { AuthModal } from './components/auth/AuthModal';
import { GuestImportModal } from './components/auth/GuestImportModal';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { MyLearningPage } from './pages/MyLearningPage';

const AppContent: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#080A0E] text-[#F3F4EC] font-sans selection:bg-[#B8FF00] selection:text-[#080A0E]">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Main Routed Page Content */}
      <div className="flex-1">
        {currentTab === 'home' && <HomePage />}
        {currentTab === 'library' && <LibraryPage />}
        {currentTab === 'workspace' && <WorkspacePage />}
        {currentTab === 'mylearning' && <MyLearningPage />}
      </div>

      {/* Universal Footer */}
      <Footer />

      {/* Global Core Feature Presentation Modal */}
      <FeaturePreviewModal />

      {/* Supabase Authentication & Profile Modal */}
      <AuthModal />

      {/* Guest-to-Account Migration Modal */}
      <GuestImportModal />
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
