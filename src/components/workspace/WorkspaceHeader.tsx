import React from 'react';
import { ArrowLeft, Clock, Bookmark } from 'lucide-react';
import type { Topic } from '../../types/topic';
import { SubjectBadge, DifficultyBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

interface WorkspaceHeaderProps {
  topic: Topic;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ topic }) => {
  const { backToLibrary, toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(topic.id);

  return (
    <div className="bg-[#F1F1E9] border-b border-[#DFE2D7] sticky top-16 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={backToLibrary}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#171C18]/70 hover:text-[#171C18] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>LIBRARY / {topic.subjectId.toUpperCase()}</span>
          </button>

          {/* Quick Actions: Bookmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(topic.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold border transition-all ${
                bookmarked
                  ? 'bg-[#111714] text-[#C8F36B] border-[#111714] shadow-xs'
                  : 'bg-[#E8EAE1] border-[#DFE2D7] text-[#171C18] hover:bg-[#DFE2D7]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#C8F36B] text-[#C8F36B]' : ''}`} />
              <span>{bookmarked ? 'SAVED TO MY LEARNING' : 'SAVE TOPIC'}</span>
            </button>
          </div>
        </div>

        {/* Title, Subject, & Metadata */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <SubjectBadge subjectId={topic.subjectId} />
            <DifficultyBadge difficulty={topic.difficulty} />
            <div className="inline-flex items-center gap-1 font-mono text-xs text-[#171C18]/60">
              <Clock className="w-3.5 h-3.5" />
              <span>{topic.estimatedMinutes} MINS ESTIMATED</span>
            </div>
            <span className="font-mono text-[10px] text-[#171C18]/40 border-l border-[#DFE2D7] pl-2.5">
              ID: {topic.id}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171C18] tracking-tight">
            {topic.title}
          </h1>

          <p className="text-sm sm:text-base text-[#171C18]/80 leading-relaxed max-w-3xl">
            {topic.subtitle}
          </p>
        </div>

      </div>
    </div>
  );
};
