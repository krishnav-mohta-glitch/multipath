import React from 'react';
import {
  Binary,
  Atom,
  FlaskConical,
  Dna,
  Hourglass,
  Globe2,
  BookOpen,
  Terminal,
  Grid,
  ArrowRight,
} from 'lucide-react';
import { SUBJECTS } from '../../data/subjects';
import { TOPICS } from '../../data/topics';
import type { SubjectId } from '../../types/subject';
import type { TopicHistoryRecord } from '../../types/history';

interface SubjectProgressMatrixProps {
  topicHistories: Record<string, TopicHistoryRecord>;
  onSelectSubjectToExplore: (subjectId: SubjectId) => void;
}

export const SubjectProgressMatrix: React.FC<SubjectProgressMatrixProps> = ({
  topicHistories,
  onSelectSubjectToExplore,
}) => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Binary,
    Atom,
    FlaskConical,
    Dna,
    Hourglass,
    Globe2,
    BookOpen,
    Terminal,
  };

  // Group canonical topics by subject
  const subjectTopicCatalog: Record<string, number> = {};
  for (const t of TOPICS) {
    subjectTopicCatalog[t.subjectId] = (subjectTopicCatalog[t.subjectId] || 0) + 1;
  }

  // Count explored topics per subject from real history records
  const subjectExploredCounts: Record<string, number> = {};
  for (const topicId of Object.keys(topicHistories)) {
    const topic = TOPICS.find((t) => t.id === topicId);
    if (topic) {
      subjectExploredCounts[topic.subjectId] = (subjectExploredCounts[topic.subjectId] || 0) + 1;
    }
  }

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-5 text-left">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-[#38BDF8]" />
          <h3 className="font-display text-sm font-bold text-[#FAF9F5] tracking-tight">
            Academic Discipline Progress Matrix
          </h3>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
          8 Disciplines · 64 Canonical Topics
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {SUBJECTS.map((subject) => {
          const Icon = iconMap[subject.iconName] || BookOpen;
          const totalInSubject = subjectTopicCatalog[subject.id] || 0;
          const exploredInSubject = subjectExploredCounts[subject.id] || 0;
          const pct = totalInSubject > 0 ? Math.round((exploredInSubject / totalInSubject) * 100) : 0;

          return (
            <div
              key={subject.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#38BDF8]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-display text-sm font-bold text-[#FAF9F5]">
                      {subject.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#B8FF00]">
                    {pct}%
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#38BDF8] to-[#B8FF00] rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(exploredInSubject > 0 ? 5 : 0, pct)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                <span className="font-mono text-[11px] text-slate-400">
                  <strong className="text-slate-200">{exploredInSubject}</strong> / {totalInSubject} topics
                </span>

                <button
                  onClick={() => onSelectSubjectToExplore(subject.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#B8FF00] transition-colors"
                  title={`Explore ${subject.name} topics in curriculum library`}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
