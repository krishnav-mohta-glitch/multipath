import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Lightbulb, AlertTriangle, Info, HelpCircle } from 'lucide-react';
import type { StructuredExplanationContent } from '../../../types/learningPath';

interface StructuredExplanationViewProps {
  content: StructuredExplanationContent;
}

export const StructuredExplanationView: React.FC<StructuredExplanationViewProps> = ({ content }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(content.sections[0]?.id || '');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Introduction Callout (Obsidian Observatory Surface) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0D1117] border border-white/12 text-white space-y-3 shadow-xl">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#B8FF00]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
            DEDUCTIVE FIRST-PRINCIPLES FOUNDATION
          </span>
        </div>

        <p className="text-base sm:text-lg text-[#FAF9F5] leading-relaxed font-sans font-medium">
          {content.introduction}
        </p>
      </div>

      {/* Table of Contents Pill Bar */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8DA391]">
          DEDUCTIVE SEQUENCE OUTLINE:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {content.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSectionId === section.id
                  ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm font-bold'
                  : 'bg-white/5 text-[#8DA391] hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className={`w-4 h-4 rounded-full font-mono text-[10px] flex items-center justify-center ${
                activeSectionId === section.id ? 'bg-[#080A0E] text-[#B8FF00]' : 'bg-white/10 text-[#8DA391]'
              }`}>
                {idx + 1}
              </span>
              <span>{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Logical Sections */}
      <div className="space-y-6">
        {content.sections.map((section, idx) => {
          const isHighlighted = activeSectionId === section.id;
          return (
            <div
              key={section.id}
              id={section.id}
              className={`rounded-3xl border p-6 sm:p-8 space-y-5 transition-all shadow-xl ${
                isHighlighted
                  ? 'bg-[#141A22] text-white border-[#B8FF00] ring-1 ring-[#B8FF00]/40'
                  : 'bg-[#0D1117] text-white border-white/10'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#080A0E] text-[#B8FF00] font-mono font-bold text-xs flex items-center justify-center border border-white/10">
                      {idx + 1}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                      {section.title}
                    </h3>
                  </div>
                  {section.subtitle && (
                    <p className="font-mono text-xs text-[#8B9DAE] ml-8">
                      {section.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#D0D4C7] leading-relaxed font-sans">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Bullet points if present */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 bg-[#080A0E]/80 p-4 rounded-2xl border border-white/08">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D0D4C7]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] mt-2 shrink-0" />
                      <span className="leading-relaxed">{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Callout box if present */}
              {section.callout && (
                <div className={`p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 ${
                  section.callout.type === 'axiom'
                    ? 'bg-[#080A0E] text-[#F3F4EC] border-white/10 relative corner-reticle shadow-md'
                    : section.callout.type === 'warning'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : 'bg-[#F3F2EB] border-[#E5E4DC] text-[#171C18]'
                }`}>
                  {section.callout.type === 'axiom' ? (
                    <Info className="w-4 h-4 text-[#B8FF00] shrink-0 mt-0.5" />
                  ) : section.callout.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <Lightbulb className="w-4 h-4 text-[#080A0E] shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      section.callout.type === 'axiom' ? 'text-[#B8FF00]' : 'text-[#080A0E]'
                    }`}>
                      {section.callout.title}
                    </span>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      section.callout.type === 'axiom' ? 'text-[#8DA391]' : 'text-[#171C18]/80'
                    }`}>
                      {section.callout.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Takeaways Checklist */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DC] text-[#171C18] space-y-4 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
          <CheckCircle2 className="w-4 h-4 text-[#080A0E]" />
          <span>INVARIANT SUMMARY TAKEAWAYS</span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.summaryTakeaways.map((takeaway, i) => (
            <li
              key={i}
              className="p-3.5 rounded-xl bg-[#F3F2EB] border border-[#E5E4DC] text-xs sm:text-sm text-[#171C18] font-medium leading-relaxed flex items-start gap-2.5 shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-[#080A0E] shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metacognitive Reflection Prompt */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#080A0E] text-[#F3F4EC] border border-white/10 flex items-start gap-3.5 shadow-lg relative corner-reticle">
        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4 text-[#B8FF00]" />
        </div>
        <div className="space-y-1">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#B8FF00]">
            INDEPENDENT REFLECTION PROMPT
          </span>
          <p className="text-xs sm:text-sm text-[#8DA391] leading-relaxed italic">
            &ldquo;{content.reflectionPrompt}&rdquo;
          </p>
        </div>
      </div>

    </div>
  );
};
