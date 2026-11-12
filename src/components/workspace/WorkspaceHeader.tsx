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
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={backToLibrary}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Library</span>
          </button>

          {/* Quick Actions: Bookmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(topic.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                bookmarked
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{bookmarked ? 'Saved to My Learning' : 'Save Topic'}</span>
            </button>
          </div>
        </div>

        {/* Title, Subject, & Metadata */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <SubjectBadge subjectId={topic.subjectId} />
            <DifficultyBadge difficulty={topic.difficulty} />
            <div className="inline-flex items-center gap-1 text-xs text-slate-500 ml-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{topic.estimatedMinutes} mins estimated</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {topic.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {topic.subtitle}
          </p>
        </div>

      </div>
    </div>
  );
};
