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
    <div className="bg-[#FAF9F5] rounded-2xl border border-[#E5E4DC] p-6 sm:p-8 space-y-6 shadow-sm text-[#171C18]">
      
      {/* Overview & Conceptual Foundation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#080A0E]" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            CONCEPTUAL FOUNDATION
          </h2>
        </div>
        <p className="text-base sm:text-lg text-[#171C18] leading-relaxed font-sans font-medium">
          {topic.overview}
        </p>
      </div>

      {/* Learning Objectives Box */}
      <div className="p-5 rounded-xl bg-[#F3F2EB] border border-[#E5E4DC] space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#080A0E]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#171C18]">
            CORE LEARNING OBJECTIVES
          </span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#171C18] font-medium">
          {topic.learningObjectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#080A0E] mt-2 shrink-0" />
              <span className="leading-relaxed">{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why This Matters Callout (High-Contrast Cosmic Reticle Inset) */}
      <div className="p-5 sm:p-6 rounded-xl bg-[#080A0E] text-[#F3F4EC] border border-white/10 flex items-start gap-3.5 shadow-md relative corner-reticle">
        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-[#B8FF00]" />
        </div>
        <div className="space-y-1">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#B8FF00]">
            SYSTEMIC SIGNIFICANCE
          </span>
          <p className="text-xs sm:text-sm text-[#8DA391] leading-relaxed">
            {topic.whyItMatters}
          </p>
        </div>
      </div>

      {/* Core Questions to Ponder */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#5E7A65]" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            CORE INQUIRY QUESTIONS
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topic.coreQuestions.map((q, idx) => (
            <li
              key={idx}
              className="p-4 rounded-xl bg-[#F3F2EB] border border-[#E5E4DC] text-xs text-[#171C18] font-medium leading-relaxed italic"
            >
              &ldquo;{q}&rdquo;
            </li>
          ))}
        </ul>
      </div>

      {/* Prerequisites & Vocabulary Accordion */}
      <div className="pt-4 border-t border-[#E5E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Prerequisites */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-[#171C18]">
          <span className="font-mono text-xs font-bold uppercase text-[#5E7A65]">PREREQUISITES:</span>
          {topic.prerequisites.map((prereq, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md bg-[#F3F2EB] border border-[#E5E4DC] font-mono text-[11px] text-[#171C18]"
            >
              {prereq}
            </span>
          ))}
        </div>

        {/* Vocabulary Toggle */}
        <button
          onClick={() => setShowVocab(!showVocab)}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#080A0E] hover:text-[#5E7A65] transition-colors self-start sm:self-auto"
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>{showVocab ? 'HIDE KEY TERMS' : `VIEW ${topic.keyTerms.length} KEY TERMS`}</span>
          {showVocab ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Vocabulary Expansion */}
      {showVocab && (
        <div className="pt-3 border-t border-[#E5E4DC] grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in">
          {topic.keyTerms.map((term, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#F3F2EB] border border-[#E5E4DC] space-y-1">
              <span className="font-mono text-xs font-bold text-[#080A0E]">{term.term}</span>
              <p className="text-[11px] text-[#171C18]/80 leading-normal">{term.definition}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
