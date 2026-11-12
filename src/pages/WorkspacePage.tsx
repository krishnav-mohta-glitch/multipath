import React from 'react';
import { useApp } from '../context/AppContext';
import { TOPICS } from '../data/topics';
import { WorkspaceHeader } from '../components/workspace/WorkspaceHeader';
import { TopicIntro } from '../components/workspace/TopicIntro';
import { PathSelector } from '../components/workspace/PathSelector';
import { PathViewer } from '../components/workspace/PathViewer';
import { FeatureBadges } from '../components/workspace/FeatureBadges';
import { ArrowLeft } from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const { activeTopic, activePath, setActivePath, backToLibrary } = useApp();

  // If no topic was selected yet, default to the flagship topic
  const currentTopic = activeTopic || TOPICS[0];

  return (
    <div className="min-h-screen bg-[#F1F1E9] text-[#171C18] pb-20 animate-in fade-in duration-200">
      
      {/* Workspace Sticky Header */}
      <WorkspaceHeader topic={currentTopic} />

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Topic Introduction & Foundation Card */}
        <TopicIntro topic={currentTopic} />

        {/* Learning Path Selection Area */}
        <PathSelector
          activePath={activePath}
          onSelectPath={setActivePath}
          availablePaths={currentTopic.availablePaths}
        />

        {/* Central Content Area (Adapts to Active Learning Path) */}
        <PathViewer
          topic={currentTopic}
          activePath={activePath}
          onSwitchPath={setActivePath}
        />

        {/* Core Capabilities Preview Bar (Guided Discovery & Feynman Mode) */}
        <FeatureBadges topic={currentTopic} />

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-[#DFE2D7] flex items-center justify-between">
          <button
            onClick={backToLibrary}
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#171C18]/70 hover:text-[#171C18] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO LEARNING LIBRARY</span>
          </button>

          <div className="font-mono text-xs text-[#5E7A65]">
            TOPIC ID: <code className="text-[#111714] bg-[#E8EAE1] px-2 py-0.5 rounded border border-[#DFE2D7]">{currentTopic.id}</code>
          </div>
        </div>

      </main>
    </div>
  );
};
