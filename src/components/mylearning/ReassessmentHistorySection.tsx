import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  History
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import type { TopicHistoryRecord, ReassessmentComparison } from '../../types/history';
import { TOPICS } from '../../data/topics';
import { SubjectBadge } from '../common/Badge';

interface ReassessmentHistorySectionProps {
  onOpenTopic: (topicId: string) => void;
}

export const ReassessmentHistorySection: React.FC<ReassessmentHistorySectionProps> = ({
  onOpenTopic
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
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Section Header */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Reassessment & Evidence-Based Progress
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Track Concept Mastery Across Repeated Teaching Sessions
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Review how your understanding evolved between teaching sessions. Compare your previous explanations against your latest evidence quotes—grounded strictly in observed understanding with <strong>zero arbitrary percentage scores</strong>.
        </p>
      </div>

      {topicHistories.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <History className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No Assessment History Recorded Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Complete a Feynman Mode teaching session on any topic to track your concept mastery and compare future reassessments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Topic Selector Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Topics Studied ({topicHistories.length}):
            </label>

            <div className="space-y-2">
              {topicHistories.map((rec) => {
                const isSelected = rec.topicId === selectedTopicId;
                const hasAssessments = rec.feynmanAssessments.length > 0;

                return (
                  <div
                    key={rec.topicId}
                    onClick={() => setSelectedTopicId(rec.topicId)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-brand-500 shadow-xs ring-2 ring-brand-500/20'
                        : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <SubjectBadge subjectId={rec.subjectId as any} />
                      <span className="text-[10px] text-slate-400 font-mono">
                        {rec.visitCount} visits
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {rec.topicTitle}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                      <span>{rec.feynmanAssessments.length} assessment(s)</span>
                      {hasAssessments && (
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
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
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <SubjectBadge subjectId={activeRecord.subjectId as any} />
                        <span className="text-xs text-slate-400">
                          Last visited: {new Date(activeRecord.lastVisited).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">
                        {activeRecord.topicTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Paths explored: <strong>{activeRecord.pathsUsed.join(', ') || 'Structured Explanation'}</strong>
                      </p>
                    </div>

                    {/* Revisit Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onOpenTopic(activeRecord.topicId)}
                        className="px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Revisit Workspace</span>
                      </button>

                      <button
                        onClick={() => onOpenTopic(activeRecord.topicId)}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-take Feynman Mode</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 1. Comparison Card (If >= 2 assessments exist) */}
                {activeComparison ? (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-slate-50 border-2 border-emerald-300 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-emerald-950">
                            Reassessment Comparison: Changes in Understanding
                          </h4>
                          <span className="text-[10px] text-emerald-700">
                            Previous ({new Date(activeComparison.previousDate).toLocaleDateString()}) vs. Latest ({new Date(activeComparison.currentDate).toLocaleDateString()})
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
                        {activeComparison.newlyDemonstrated.length} New Concept(s) Demonstrated
                      </span>
                    </div>

                    {/* Resolved Misconceptions Banner */}
                    {activeComparison.resolvedMisconceptions.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs space-y-1.5">
                        <span className="font-bold text-emerald-900 block flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Resolved Misconception(s):</span>
                        </span>
                        {activeComparison.resolvedMisconceptions.map((res, i) => (
                          <div key={i} className="text-slate-700 pl-4 border-l-2 border-emerald-400 text-[11px] space-y-0.5">
                            <p>
                              <strong>Previous Flawed Statement:</strong> <span className="line-through text-rose-700">"{res.statement}"</span>
                            </p>
                            <p>
                              <strong>Resolved With Accurate Reasoning:</strong> <span className="text-emerald-800 italic">"{res.resolvedEvidence}"</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Concept Transitions List */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        Concept Transition Breakdown:
                      </span>
                      {activeComparison.conceptTransitions.map((t, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{t.conceptName}</span>
                            <div className="flex items-center gap-2 text-[10px] font-semibold">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                Was: {t.previousStatus.replace(/-/g, ' ')}
                              </span>
                              <span>➔</span>
                              <span
                                className={`px-2 py-0.5 rounded-full font-bold ${
                                  t.currentStatus === 'demonstrated'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                Now: {t.currentStatus.replace(/-/g, ' ')}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                              <span className="text-[10px] font-bold text-slate-400 block">Previous Evidence Quote:</span>
                              <p className="italic text-slate-600">"{t.previousEvidence}"</p>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                              <span className="text-[10px] font-bold text-emerald-700 block">Latest Evidence Quote:</span>
                              <p className="italic text-emerald-950 font-medium">"{t.currentEvidence}"</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ) : (
                  activeRecord.feynmanAssessments.length === 1 && (
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
                      <div className="flex items-center gap-2 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Baseline Assessment Recorded</span>
                      </div>
                      <p>
                        You have completed 1 Feynman assessment for this topic. Revisit the workspace or click <strong>Re-take Feynman Mode</strong> to teach Alex again with an updated explanation and generate a side-by-side reassessment comparison!
                      </p>
                    </div>
                  )
                )}

                {/* 2. Latest Assessment Evidence & Gaps */}
                {activeRecord.feynmanAssessments.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900">
                      Latest Assessed Concept Mastery (Grounded in Verbatim Evidence):
                    </h4>

                    <div className="space-y-2.5">
                      {activeRecord.feynmanAssessments[
                        activeRecord.feynmanAssessments.length - 1
                      ].assessment.conceptAssessments.map((c, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{c.name}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                c.status === 'demonstrated'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : c.status === 'partly-demonstrated'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {c.status.replace(/-/g, ' ')}
                            </span>
                          </div>

                          {c.evidence && c.evidence !== 'Not discussed in the explanation' && (
                            <blockquote className="italic text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                              "{c.evidence}"
                            </blockquote>
                          )}

                          <p className="text-slate-500 text-[11px]">{c.reasoning}</p>
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
