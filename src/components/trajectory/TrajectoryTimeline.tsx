import React from 'react';
import {
  Clock,
  BookOpen,
  Eye,
  Wrench,
  FlaskConical,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Compass,
  History,
} from 'lucide-react';
import type { LearningActivityItem } from '../../types/history';
import type { LearningPathId } from '../../types/learningPath';
import { SubjectBadge } from '../common/Badge';

interface TrajectoryTimelineProps {
  activities: LearningActivityItem[];
  onOpenTopic: (topicId: string, pathId?: LearningPathId) => void;
  onNavigateToLibrary: () => void;
}

export const TrajectoryTimeline: React.FC<TrajectoryTimelineProps> = ({
  activities,
  onOpenTopic,
  onNavigateToLibrary,
}) => {
  const getActivityIcon = (type: string, pathId?: string) => {
    switch (type) {
      case 'activity-completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'resource-bookmarked':
        return <Bookmark className="w-4 h-4 text-[#B8FF00]" />;
      case 'simulation-explored':
        return <FlaskConical className="w-4 h-4 text-[#38BDF8]" />;
      case 'path-changed':
        if (pathId === 'visual-learning') return <Eye className="w-4 h-4 text-[#38BDF8]" />;
        if (pathId === 'examples-applications') return <Wrench className="w-4 h-4 text-amber-400" />;
        if (pathId === 'explore-experiment') return <FlaskConical className="w-4 h-4 text-[#B8FF00]" />;
        return <BookOpen className="w-4 h-4 text-slate-300" />;
      case 'topic-opened':
      default:
        return <Compass className="w-4 h-4 text-[#B8FF00]" />;
    }
  };

  const formatActivityDate = (timestamp: string | number) => {
    try {
      const d = new Date(timestamp);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-8 sm:p-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-slate-800 text-[#B8FF00] border border-slate-700 flex items-center justify-center mx-auto shadow-inner">
          <History className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="font-display text-base sm:text-lg font-bold text-[#FAF9F5]">
            No Chronological Activity Recorded Yet
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            As you explore curriculum topics, run 3D simulations, test cognitive models, and complete Feynman diagnostic assessments, your activity will be recorded here chronologically.
          </p>
        </div>
        <button
          onClick={onNavigateToLibrary}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B8FF00] hover:bg-[#a6e600] text-slate-950 font-bold text-xs transition-all shadow-sm"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore Curriculum Topics</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#B8FF00]" />
          <h3 className="font-display text-sm font-bold text-[#FAF9F5] tracking-tight">
            Chronological Learning Activity Ledger
          </h3>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
          {activities.length} {activities.length === 1 ? 'Event' : 'Events'} Logged
        </span>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {activities.map((act) => {
          const pathId = act.pathId as LearningPathId | undefined;

          return (
            <div
              key={act.id}
              onClick={() => {
                if (act.topicId) {
                  onOpenTopic(act.topicId, pathId);
                }
              }}
              className="p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start justify-between gap-3 group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  {getActivityIcon(act.type, act.pathId)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-sm font-bold text-[#FAF9F5] group-hover:text-[#B8FF00] transition-colors">
                      {act.topicTitle || act.topicId || 'Curriculum Interaction'}
                    </span>
                    {act.subjectId && <SubjectBadge subjectId={act.subjectId} />}
                    {act.pathId && (
                      <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">
                        {act.pathId.replace(/-/g, ' ')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {act.details}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatActivityDate(act.timestamp)}</span>
                </div>
                {act.topicId && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B8FF00] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Resume</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
