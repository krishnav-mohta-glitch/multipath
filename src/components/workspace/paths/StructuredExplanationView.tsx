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
      
      {/* Introduction Callout */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#111714]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            DEDUCTIVE FOUNDATION
          </span>
        </div>

        <p className="text-base sm:text-lg text-[#171C18] leading-relaxed font-sans font-medium">
          {content.introduction}
        </p>
      </div>

      {/* Table of Contents Pill Bar */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
          SEQUENCE OUTLINE:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {content.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                activeSectionId === section.id
                  ? 'bg-[#111714] text-[#F3F4EC] shadow-2xs'
                  : 'bg-[#E8EAE1] text-[#171C18] hover:bg-[#DFE2D7] border border-[#DFE2D7]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full font-mono text-[10px] flex items-center justify-center ${
                activeSectionId === section.id ? 'bg-[#C8F36B] text-[#111714]' : 'bg-[#DFE2D7] text-[#171C18]'
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
              className={`bg-[#E8EAE1] rounded-2xl border p-6 sm:p-8 space-y-5 transition-all shadow-xs ${
                isHighlighted
                  ? 'border-[#111714] ring-1 ring-[#111714]'
                  : 'border-[#DFE2D7]'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#111714] text-[#C8F36B] font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#171C18] tracking-tight">
                      {section.title}
                    </h3>
                  </div>
                  {section.subtitle && (
                    <p className="font-mono text-xs text-[#5E7A65] ml-8">
                      {section.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#171C18] leading-relaxed font-sans">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Bullet points if present */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 bg-[#F1F1E9] p-4 rounded-xl border border-[#DFE2D7]">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171C18]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111714] mt-2 shrink-0" />
                      <span className="leading-relaxed">{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Callout box if present */}
              {section.callout && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  section.callout.type === 'axiom' ? 'bg-[#111714] text-[#F3F4EC] border-white/10' :
                  section.callout.type === 'insight' ? 'bg-[#F1F1E9] border-[#DFE2D7] text-[#171C18]' :
                  section.callout.type === 'warning' ? 'bg-[#F1F1E9] border-rose-300 text-rose-950' :
                  'bg-[#F1F1E9] border-[#DFE2D7] text-[#171C18]'
                }`}>
                  {section.callout.type === 'axiom' ? <Info className="w-4 h-4 text-[#C8F36B] shrink-0 mt-0.5" /> :
                   section.callout.type === 'insight' ? <Lightbulb className="w-4 h-4 text-[#111714] shrink-0 mt-0.5" /> :
                   section.callout.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" /> :
                   <Info className="w-4 h-4 text-[#5E7A65] shrink-0 mt-0.5" />}
                  <div className="space-y-1">
                    <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      section.callout.type === 'axiom' ? 'text-[#C8F36B]' : 'text-[#171C18]'
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
      <div className="p-6 sm:p-7 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
          <CheckCircle2 className="w-4 h-4 text-[#111714]" />
          <span>INVARIANT SUMMARY TAKEAWAYS</span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.summaryTakeaways.map((takeaway, i) => (
            <li
              key={i}
              className="p-3.5 rounded-xl bg-[#F1F1E9] border border-[#DFE2D7] text-xs sm:text-sm text-[#171C18] font-medium leading-relaxed flex items-start gap-2.5 shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-[#111714] shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metacognitive Reflection Prompt */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#111714] text-[#F3F4EC] border border-white/10 flex items-start gap-3.5 shadow-sm">
        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4 text-[#C8F36B]" />
        </div>
        <div className="space-y-1">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C8F36B]">
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
