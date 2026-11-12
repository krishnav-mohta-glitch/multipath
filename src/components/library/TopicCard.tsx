import React from 'react';
import {
  Clock,
  Bookmark,
  ArrowRight,
  BookOpen,
  Eye,
  Wrench,
  FlaskConical,
  HelpCircle,
} from 'lucide-react';
import type { Topic } from '../../types/topic';
import type { LearningPathId } from '../../types/learningPath';
import { SubjectBadge, DifficultyBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

interface TopicCardProps {
  topic: Topic;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const { openTopic, toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(topic.id);

  const pathIconMap: Record<LearningPathId, React.FC<{ className?: string }>> = {
    'structured-explanation': BookOpen,
    'visual-learning': Eye,
    'examples-applications': Wrench,
    'explore-experiment': FlaskConical,
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      
      {/* Top Section */}
      <div className="p-6 space-y-4">
        {/* Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <SubjectBadge subjectId={topic.subjectId} />
            <DifficultyBadge difficulty={topic.difficulty} />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(topic.id);
            }}
            className={`p-1.5 rounded-lg border transition-colors ${
              bookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title={bookmarked ? 'Saved to My Learning' : 'Save for later'}
            aria-label={bookmarked ? 'Saved to My Learning' : 'Save for later'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h3
            onClick={() => openTopic(topic.id)}
            className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors cursor-pointer"
          >
            {topic.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {topic.subtitle}
          </p>
        </div>

        {/* Core Question Teaser */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
            <span>Central Question</span>
          </div>
          <p className="text-xs text-slate-700 font-medium italic line-clamp-2">
            "{topic.coreQuestions[0]}"
          </p>
        </div>
      </div>

      {/* Bottom Section: Path Indicators & Open Action */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Duration & Paths available */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{topic.estimatedMinutes}m</span>
          </div>

          <div className="h-3 w-px bg-slate-200" />

          {/* Path icons */}
          <div className="flex items-center gap-1" title="4 Learning Paths Available">
            {topic.availablePaths.map((pathId) => {
              const PathIcon = pathIconMap[pathId];
              return (
                <div
                  key={pathId}
                  onClick={(e) => {
                    e.stopPropagation();
                    openTopic(topic.id, pathId);
                  }}
                  className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:border-brand-300 transition-colors cursor-pointer"
                  title={`Open via ${pathId.replace('-', ' ')}`}
                >
                  <PathIcon className="w-3 h-3" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Open workspace button */}
        <button
          onClick={() => openTopic(topic.id)}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Open Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
