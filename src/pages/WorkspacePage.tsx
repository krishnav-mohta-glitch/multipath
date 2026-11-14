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
    <div className="min-h-screen bg-[#080A0E] text-[#F3F4EC] pb-24 animate-in fade-in duration-200">
      
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

      </main>
    </div>
  );
};
