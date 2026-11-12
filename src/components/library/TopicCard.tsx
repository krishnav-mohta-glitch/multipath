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
    <div className="bg-[#E8EAE1] rounded-3xl border border-[#19211C]/12 hover:border-[#111714] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group text-left">
      
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
            className={`p-1.5 rounded-full border transition-all ${
              bookmarked
                ? 'bg-[#111714] border-[#111714] text-[#C8F36B]'
                : 'bg-white/80 border-[#19211C]/10 text-[#19211C]/40 hover:text-[#111714]'
            }`}
            title={bookmarked ? 'Saved to My Trajectory' : 'Save for later'}
            aria-label={bookmarked ? 'Saved to My Trajectory' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h3
            onClick={() => openTopic(topic.id)}
            className="font-display text-lg font-bold text-[#111714] group-hover:text-black transition-colors cursor-pointer leading-tight"
          >
            {topic.title}
          </h3>
          <p className="text-xs text-[#5F6B62] line-clamp-2 leading-relaxed">
            {topic.subtitle}
          </p>
        </div>

        {/* Core Question Teaser */}
        <div className="p-3 rounded-2xl bg-[#F1F1E9] border border-[#19211C]/08 space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#5E7A65]">
            <HelpCircle className="w-3 h-3 text-[#111714]" />
            <span>Central Inquiry</span>
          </div>
          <p className="text-xs text-[#171C18] font-medium italic line-clamp-2">
            "{topic.coreQuestions[0]}"
          </p>
        </div>
      </div>

      {/* Bottom Section: Path Indicators & Open Action */}
      <div className="px-6 py-4 bg-[#DFE2D7]/60 border-t border-[#19211C]/08 flex items-center justify-between gap-3">
        {/* Duration & Paths available */}
        <div className="flex items-center gap-3 text-xs text-[#19211C]/70">
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#5E7A65]" />
            <span>{topic.estimatedMinutes}m</span>
          </div>

          <div className="h-3 w-px bg-[#19211C]/15" />

          {/* Path icons */}
          <div className="flex items-center gap-1" title="4 Convergent Paths Available">
            {topic.availablePaths.map((pathId) => {
              const PathIcon = pathIconMap[pathId];
              return (
                <div
                  key={pathId}
                  onClick={(e) => {
                    e.stopPropagation();
                    openTopic(topic.id, pathId);
                  }}
                  className="w-5 h-5 rounded-md bg-white border border-[#19211C]/10 flex items-center justify-center text-[#19211C]/60 hover:text-[#111714] hover:bg-[#C8F36B] hover:border-[#C8F36B] transition-all cursor-pointer"
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
          className="inline-flex items-center gap-1 text-xs font-bold text-[#111714] group-hover:text-black group-hover:translate-x-0.5 transition-transform"
        >
          <span>Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
