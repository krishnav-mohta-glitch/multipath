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
      <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
            Conceptual Introduction
          </span>
        </div>

        <p className="text-base text-slate-800 leading-relaxed font-serif">
          {content.introduction}
        </p>
      </div>

      {/* Table of Contents Pill Bar */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Section Navigation:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {content.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeSectionId === section.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-200/60 text-slate-700 font-mono text-[10px] flex items-center justify-center">
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
              className={`bg-white rounded-2xl border p-6 sm:p-8 space-y-5 transition-all shadow-xs ${
                isHighlighted
                  ? 'border-brand-500 ring-2 ring-brand-500/10'
                  : 'border-slate-200'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {section.title}
                    </h3>
                  </div>
                  {section.subtitle && (
                    <p className="text-xs font-medium text-brand-700 ml-8">
                      {section.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Bullet points if present */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 shrink-0" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Callout box if present */}
              {section.callout && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  section.callout.type === 'axiom' ? 'bg-blue-50/80 border-blue-200 text-blue-950' :
                  section.callout.type === 'insight' ? 'bg-amber-50/80 border-amber-200 text-amber-950' :
                  section.callout.type === 'warning' ? 'bg-rose-50/80 border-rose-200 text-rose-950' :
                  'bg-slate-50 border-slate-200 text-slate-900'
                }`}>
                  {section.callout.type === 'axiom' ? <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" /> :
                   section.callout.type === 'insight' ? <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> :
                   section.callout.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" /> :
                   <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />}
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {section.callout.title}
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed">
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
      <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Core Summary Takeaways</span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.summaryTakeaways.map((takeaway, i) => (
            <li
              key={i}
              className="p-3 rounded-xl bg-white border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed flex items-start gap-2.5 shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metacognitive Reflection Prompt */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Independent Reflection Prompt
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
            “{content.reflectionPrompt}”
          </p>
        </div>
      </div>

    </div>
  );
};
