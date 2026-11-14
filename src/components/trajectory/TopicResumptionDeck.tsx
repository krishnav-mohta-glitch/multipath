import React from 'react';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Eye,
  Wrench,
  FlaskConical,
  Sparkles,
} from 'lucide-react';
import { TOPICS } from '../../data/topics';
import type { RecentTopicVisit } from '../../types/session';
import type { LearningPathId } from '../../types/learningPath';
import { SubjectBadge, DifficultyBadge } from '../common/Badge';

interface TopicResumptionDeckProps {
  recentVisits: RecentTopicVisit[];
  onOpenTopic: (topicId: string, pathId?: LearningPathId) => void;
  onExploreLibrary: () => void;
}

export const TopicResumptionDeck: React.FC<TopicResumptionDeckProps> = ({
  recentVisits,
  onOpenTopic,
  onExploreLibrary,
}) => {
  const pathIconMap: Record<LearningPathId, React.FC<{ className?: string }>> = {
    'structured-explanation': BookOpen,
    'visual-learning': Eye,
    'examples-applications': Wrench,
    'explore-experiment': FlaskConical,
  };

  const recentWithTopicData = recentVisits
    .map((v) => ({
      visit: v,
      topic: TOPICS.find((t) => t.id === v.topicId),
    }))
    .filter((item): item is { visit: RecentTopicVisit; topic: (typeof TOPICS)[0] } => Boolean(item.topic));

  if (recentWithTopicData.length === 0) {
    return (
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 sm:p-8 text-center space-y-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 text-[#B8FF00] border border-slate-700 flex items-center justify-center mx-auto">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1 max-w-sm mx-auto">
          <h4 className="font-display text-sm font-bold text-[#FAF9F5]">No Active Topics In Progress</h4>
          <p className="text-xs text-slate-400">
            Open any topic in the curriculum library to begin exploring across its four convergent learning paths.
          </p>
        </div>
        <button
          onClick={onExploreLibrary}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
        >
          <Compass className="w-3.5 h-3.5 text-[#B8FF00]" />
          <span>Browse Curriculum</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B8FF00]" />
          <h3 className="font-display text-sm font-bold text-[#FAF9F5] tracking-tight">
            Active Topics &amp; Fast Workspace Resumption
          </h3>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
          {recentWithTopicData.length} In Progress
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentWithTopicData.slice(0, 6).map(({ visit, topic }) => {
          const PathIcon = pathIconMap[visit.lastPathUsed] || BookOpen;

          return (
            <div
              key={topic.id}
              onClick={() => onOpenTopic(topic.id, visit.lastPathUsed)}
              className="p-4 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between group cursor-pointer space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <SubjectBadge subjectId={topic.subjectId} />
                  <DifficultyBadge difficulty={topic.difficulty} />
                </div>

                <div className="space-y-1">
                  <h4 className="font-display text-sm font-bold text-[#FAF9F5] group-hover:text-[#B8FF00] transition-colors leading-snug">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {topic.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                  <PathIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span className="truncate max-w-[110px]">{visit.lastPathUsed.replace(/-/g, ' ')}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B8FF00] group-hover:translate-x-0.5 transition-transform">
                  <span>Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
