import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  BookMarked,
  Target,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Topic } from '../../types/topic';

interface TopicIntroProps {
  topic: Topic;
}

export const TopicIntro: React.FC<TopicIntroProps> = ({ topic }) => {
  const [showVocab, setShowVocab] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      
      {/* Overview */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Conceptual Overview
        </h2>
        <p className="text-base text-slate-800 leading-relaxed font-sans">
          {topic.overview}
        </p>
      </div>

      {/* Learning Objectives Box */}
      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
            Core Learning Objectives
          </span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-indigo-950 font-medium">
          {topic.learningObjectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why This Matters Callout */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Why This Concept Matters
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {topic.whyItMatters}
          </p>
        </div>
      </div>

      {/* Core Questions to Ponder */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-brand-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Fundamental Questions Explored
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topic.coreQuestions.map((q, idx) => (
            <li
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium leading-relaxed italic"
            >
              “{q}”
            </li>
          ))}
        </ul>
      </div>

      {/* Prerequisites & Vocabulary Accordion */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Prerequisites */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
          <span className="font-semibold text-slate-700">Prerequisites:</span>
          {topic.prerequisites.map((prereq, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[11px]"
            >
              {prereq}
            </span>
          ))}
        </div>

        {/* Vocabulary Toggle */}
        <button
          onClick={() => setShowVocab(!showVocab)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 self-start sm:self-auto"
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>{showVocab ? 'Hide Key Terms' : `View ${topic.keyTerms.length} Key Terms`}</span>
          {showVocab ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Vocabulary Expansion */}
      {showVocab && (
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in">
          {topic.keyTerms.map((term, i) => (
            <div key={i} className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 space-y-1">
              <span className="text-xs font-bold text-indigo-900">{term.term}</span>
              <p className="text-[11px] text-slate-600 leading-normal">{term.definition}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
