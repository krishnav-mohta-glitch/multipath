import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  History,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import type { TopicHistoryRecord, ReassessmentComparison } from '../../types/history';
import { TOPICS } from '../../data/topics';
import { SubjectBadge } from '../common/Badge';

interface ReassessmentHistorySectionProps {
  onOpenTopic: (topicId: string) => void;
}

export const ReassessmentHistorySection: React.FC<ReassessmentHistorySectionProps> = ({
  onOpenTopic,
}) => {
  const [topicHistories] = useState<TopicHistoryRecord[]>(() =>
    Object.values(storageService.getAllTopicHistory())
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(() => {
    const list = Object.values(storageService.getAllTopicHistory());
    return list.length > 0 ? list[0].topicId : null;
  });

  const activeRecord = topicHistories.find((r) => r.topicId === selectedTopicId) || topicHistories[0];
  const matchingTopic = activeRecord ? TOPICS.find((t) => t.id === activeRecord.topicId) : null;

  // Compute comparisons if activeRecord has 2 or more assessments
  let activeComparison: ReassessmentComparison | null = null;
  if (activeRecord && activeRecord.feynmanAssessments.length >= 2) {
    const prev = activeRecord.feynmanAssessments[activeRecord.feynmanAssessments.length - 2];
    const curr = activeRecord.feynmanAssessments[activeRecord.feynmanAssessments.length - 1];
    activeComparison = storageService.buildReassessmentComparison(
      activeRecord.topicId,
      activeRecord.subjectId,
      activeRecord.topicTitle,
      prev.assessment,
      prev.recordedAt,
      curr.assessment,
      curr.recordedAt
    );
  }

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Section Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            FEYNMAN DIAGNOSTIC OBSERVATORY
          </span>
        </div>
        <h3 className="font-display text-base sm:text-lg font-bold text-[#FAF9F5] tracking-tight">
          Concept Mastery &amp; Verbatim Evidence Across Repeated Sessions
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Track how your mental models evolved across multiple teaching sessions. Compare previous explanations against latest evidence quotes—grounded strictly in observed understanding with <strong className="text-slate-200">zero arbitrary percentage scores</strong>.
        </p>
      </div>

      {topicHistories.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <History className="w-8 h-8 text-slate-500 mx-auto" />
          <h4 className="font-display text-sm font-bold text-[#FAF9F5]">No Assessment History Recorded Yet</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Complete a Feynman Mode teaching session on any topic to track your concept mastery and compare future reassessments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Topic Selector Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Evaluated Topics ({topicHistories.length}):
            </label>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {topicHistories.map((rec) => {
                const isSelected = rec.topicId === selectedTopicId;
                const hasAssessments = rec.feynmanAssessments.length > 0;

                return (
                  <div
                    key={rec.topicId}
                    onClick={() => setSelectedTopicId(rec.topicId)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-[#B8FF00] shadow-md ring-1 ring-[#B8FF00]/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <SubjectBadge subjectId={rec.subjectId as any} />
                      <span className="text-[10px] text-slate-500 font-mono">
                        {rec.visitCount} visits
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#FAF9F5] truncate">
                      {rec.topicTitle}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                      <span>{rec.feynmanAssessments.length} assessment(s)</span>
                      {hasAssessments && (
                        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Tested</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Reassessment / History Workspace */}
          <div className="lg:col-span-3 space-y-6">
            {activeRecord && matchingTopic ? (
              <div className="space-y-6">
                {/* Active Topic Banner with Reassessment Quick Actions */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <SubjectBadge subjectId={activeRecord.subjectId as any} />
                        <span className="text-xs font-mono text-slate-400">
                          Last visited: {new Date(activeRecord.lastVisited).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#FAF9F5] mt-1">
                        {activeRecord.topicTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Paths explored: <strong className="text-slate-200">{activeRecord.pathsUsed.join(', ') || 'Structured Explanation'}</strong>
                      </p>
                    </div>

                    {/* Revisit Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onOpenTopic(activeRecord.topicId)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#FAF9F5] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm border border-slate-700"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Revisit Workspace</span>
                      </button>

                      <button
                        onClick={() => onOpenTopic(activeRecord.topicId)}
                        className="px-3 py-2 rounded-xl bg-[#B8FF00] hover:bg-[#a6e600] text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-take Feynman Mode</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 1. Comparison Card (If >= 2 assessments exist) */}
                {activeComparison ? (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-950 border border-emerald-500/30 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-bold text-emerald-300">
                            Reassessment Comparison: Changes in Understanding
                          </h4>
                          <span className="font-mono text-[10px] text-emerald-400/80">
                            Previous ({new Date(activeComparison.previousDate).toLocaleDateString()}) vs. Latest ({new Date(activeComparison.currentDate).toLocaleDateString()})
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {activeComparison.newlyDemonstrated.length} New Concept(s) Demonstrated
                      </span>
                    </div>

                    {/* Resolved Misconceptions Banner */}
                    {activeComparison.resolvedMisconceptions.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs space-y-1.5">
                        <span className="font-bold text-emerald-400 block flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Resolved Misconception(s):</span>
                        </span>
                        {activeComparison.resolvedMisconceptions.map((res, i) => (
                          <div key={i} className="text-slate-300 pl-4 border-l-2 border-emerald-500 text-[11px] space-y-0.5">
                            <p>
                              <strong className="text-slate-400">Previous Flawed Statement:</strong> <span className="line-through text-rose-400">"{res.statement}"</span>
                            </p>
                            <p>
                              <strong className="text-emerald-400">Resolved With Accurate Reasoning:</strong> <span className="text-emerald-300 italic">"{res.resolvedEvidence}"</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Concept Transitions List */}
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Concept Transition Breakdown:
                      </span>
                      {activeComparison.conceptTransitions.map((t, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display font-bold text-[#FAF9F5]">{t.conceptName}</span>
                            <div className="flex items-center gap-2 text-[10px] font-semibold font-mono">
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                                Was: {t.previousStatus.replace(/-/g, ' ')}
                              </span>
                              <span>➔</span>
                              <span
                                className={`px-2 py-0.5 rounded-full font-bold ${
                                  t.currentStatus === 'demonstrated'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                Now: {t.currentStatus.replace(/-/g, ' ')}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                              <span className="text-[10px] font-mono font-bold text-slate-500 block">Previous Evidence Quote:</span>
                              <p className="italic text-slate-400">"{t.previousEvidence}"</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                              <span className="text-[10px] font-mono font-bold text-emerald-400 block">Latest Evidence Quote:</span>
                              <p className="italic text-emerald-200 font-medium">"{t.currentEvidence}"</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  activeRecord.feynmanAssessments.length === 1 && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span>Baseline Assessment Recorded</span>
                      </div>
                      <p className="text-amber-200/90 leading-relaxed">
                        You have completed 1 Feynman assessment for this topic. Revisit the workspace or click <strong className="text-white">Re-take Feynman Mode</strong> to teach Alex again with an updated explanation and generate a side-by-side reassessment comparison!
                      </p>
                    </div>
                  )
                )}

                {/* 2. Latest Assessment Evidence & Gaps */}
                {activeRecord.feynmanAssessments.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-display text-sm font-bold text-[#FAF9F5]">
                      Latest Assessed Concept Mastery (Grounded in Verbatim Evidence):
                    </h4>

                    <div className="space-y-2.5">
                      {activeRecord.feynmanAssessments[
                        activeRecord.feynmanAssessments.length - 1
                      ].assessment.conceptAssessments.map((c, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display font-bold text-[#FAF9F5]">{c.name}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                                c.status === 'demonstrated'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : c.status === 'partly-demonstrated'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                            >
                              {c.status.replace(/-/g, ' ')}
                            </span>
                          </div>

                          {c.evidence && c.evidence !== 'Not discussed in the explanation' && (
                            <blockquote className="italic text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                              "{c.evidence}"
                            </blockquote>
                          )}

                          <p className="text-slate-400 text-[11px] leading-relaxed">{c.reasoning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
