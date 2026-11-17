import React from 'react';
import { useApp } from '../context/AppContext';
import { TOPICS } from '../data/topics';
import { WorkspaceHeader } from '../components/workspace/WorkspaceHeader';
import { TopicIntro } from '../components/workspace/TopicIntro';
import { UnifiedLearningCanvas } from '../components/workspace/UnifiedLearningCanvas';
import { FeatureBadges } from '../components/workspace/FeatureBadges';
import { AILearningGuideDrawer } from '../components/workspace/AILearningGuideDrawer';
import { ArrowLeft } from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const { activeTopic, backToLibrary } = useApp();

  // If no topic was selected yet, default to the flagship topic
  const currentTopic = activeTopic || TOPICS[0];

  return (
    <div className="min-h-screen bg-[#080A0E] text-[#F3F4EC] pb-24 animate-in fade-in duration-200">
      
      {/* Workspace Sticky Header */}
      <WorkspaceHeader topic={currentTopic} />

      {/* Main Workspace Layout (Sequential 3-Part Learning Architecture) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Conceptual Foundation & Syllabus Context */}
        <TopicIntro topic={currentTopic} />

        {/* Unified 3-Part Sequential Learning Flow */}
        <UnifiedLearningCanvas topic={currentTopic} />

        {/* Core Capabilities Preview Bar (Guided Discovery & Feynman Mode) */}
        <FeatureBadges topic={currentTopic} />

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={backToLibrary}
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#8DA391] hover:text-[#B8FF00] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO CURRICULUM EXPLORER</span>
          </button>

          <div className="font-mono text-xs text-[#8DA391]">
            TOPIC ID: <code className="text-[#B8FF00] bg-white/5 px-2 py-0.5 rounded border border-white/10">{currentTopic.id}</code>
          </div>
        </div>

        {/* Persistent AI Learning Guide Companion Drawer */}
        <AILearningGuideDrawer topic={currentTopic} />

      </main>
    </div>
  );
};
