import React, { useState } from 'react';
import { ArrowLeft, Clock, Bookmark, Headphones } from 'lucide-react';
import type { Topic } from '../../types/topic';
import { SubjectBadge, DifficultyBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { AdaptiveMediaStudioModal } from './adaptiveMedia/AdaptiveMediaStudioModal';

interface WorkspaceHeaderProps {
  topic: Topic;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ topic }) => {
  const { backToLibrary, toggleBookmark, isBookmarked } = useApp();
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const bookmarked = isBookmarked(topic.id);

  return (
    <div className="bg-[#080A0E]/95 backdrop-blur-md border-b border-white/10 sticky top-16 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={backToLibrary}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#8DA391] hover:text-[#B8FF00] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>LIBRARY / {topic.subjectId.toUpperCase()}</span>
          </button>

          {/* Quick Actions: Adaptive Media Studio & Bookmark */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsMediaModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-[#161D26] hover:bg-[#1E2836] border border-white/15 text-white transition-all cursor-pointer shadow-xs"
              title="Open Adaptive Media Studio for interactive podcasts and diagrammatic videos"
            >
              <Headphones className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span>MEDIA STUDIO (AUDIO &amp; VIDEO)</span>
            </button>

            <button
              onClick={() => toggleBookmark(topic.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer ${
                bookmarked
                  ? 'bg-[#B8FF00] text-[#080A0E] border-[#B8FF00] shadow-sm font-bold'
                  : 'bg-white/5 border-white/10 text-[#8DA391] hover:text-white hover:bg-white/10'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#080A0E] text-[#080A0E]' : ''}`} />
              <span>{bookmarked ? 'SAVED TO TRAJECTORY' : 'SAVE TOPIC'}</span>
            </button>
          </div>
        </div>

        {/* Title, Subject, & Metadata */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SubjectBadge subjectId={topic.subjectId} />
            <DifficultyBadge difficulty={topic.difficulty} />
            <div className="inline-flex items-center gap-1 font-mono text-xs text-[#8DA391]">
              <Clock className="w-3.5 h-3.5" />
              <span>{topic.estimatedMinutes} MINS ESTIMATED</span>
            </div>
            <span className="font-mono text-[10px] text-[#8DA391]/60 border-l border-white/10 pl-2.5">
              ID: {topic.id}
            </span>
          </div>

          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight break-words">
            {topic.title}
          </h1>

          <p className="text-sm sm:text-base text-[#8DA391] leading-relaxed max-w-3xl">
            {topic.subtitle}
          </p>
        </div>

      </div>

      {/* Adaptive Media Studio Modal */}
      <AdaptiveMediaStudioModal
        topic={topic}
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
      />
    </div>
  );
};
