import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FeaturePreviewModal } from './components/common/FeaturePreviewModal';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { MyLearningPage } from './pages/MyLearningPage';

const AppContent: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F1E9] text-[#171C18] font-sans selection:bg-[#C8F36B] selection:text-[#111714]">
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
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
