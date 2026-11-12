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
    <div className="min-h-screen bg-slate-50/60 pb-20 animate-in fade-in duration-200">
      
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
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={backToLibrary}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Learning Library</span>
          </button>

          <div className="text-xs text-slate-500">
            Topic ID: <code className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{currentTopic.id}</code>
          </div>
        </div>

      </main>
    </div>
  );
};
