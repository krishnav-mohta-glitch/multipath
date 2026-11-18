import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import type { StructuredExplanationContent } from '../../../types/learningPath';
import type { PassionExplanation } from '../../../data/passionExplanations';

export interface StructuredExplanationViewProps {
  content: StructuredExplanationContent;
  topicTitle?: string;
  subjectId?: string;
  passionData?: PassionExplanation;
  activePassionId?: string;
  onSelectPassion?: (passionId: string) => void;
  onOpenMorePassions?: () => void;
}

const PASSION_ICONS: Record<string, string> = {
  football: '⚽',
  cricket: '🏏',
  gaming: '🎮',
  space: '🚀',
  music: '🎵',
  robotics: '🤖',
  anime: '⚡',
  cinema: '🎬',
  art: '🎨',
};

export const StructuredExplanationView: React.FC<StructuredExplanationViewProps> = ({ 
  content,
  topicTitle: _topicTitle,
  subjectId: _subjectId,
  passionData,
  activePassionId = 'football',
  onSelectPassion,
  onOpenMorePassions
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(content.sections[0]?.id || '');
  const [isChallengeOpen, setIsChallengeOpen] = useState<boolean>(false);

  const activeIcon = PASSION_ICONS[activePassionId] || '✨';

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* =================================================================== */}
      {/* PERSONALIZED INTUITIVE ANALOGY BRIDGE                               */}
      {/* =================================================================== */}
      {passionData && (
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#121A25] via-[#0E1520] to-[#0A0E15] border border-[#B8FF00]/30 shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#B8FF00]/15 text-[#B8FF00] flex items-center justify-center border border-[#B8FF00]/30 font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#B8FF00]">
                    PERSONALIZED ANALOGY BRIDGE
                  </span>
                  <span className="font-mono text-[10px] text-[#8DA391] bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    Intuition First
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white">
                  {activeIcon} {passionData.passionTitle}
                </h4>
              </div>
            </div>

            {/* Quick Passion Selector Pills */}
            {onSelectPassion && (
              <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
                <span className="font-mono text-[10px] text-[#8DA391] uppercase mr-1">Analogy Lens:</span>
                {[
                  { id: 'football', label: '⚽ Football' },
                  { id: 'cricket', label: '🏏 Cricket' },
                  { id: 'gaming', label: '🎮 Gaming' },
                  { id: 'space', label: '🚀 Space' },
                  { id: 'music', label: '🎵 Music' },
                  { id: 'robotics', label: '🤖 Robotics' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectPassion(p.id)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer ${
                      activePassionId === p.id
                        ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-[#8DA391] border border-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
                {onOpenMorePassions && (
                  <button
                    type="button"
                    onClick={onOpenMorePassions}
                    className="px-2 py-1 rounded-lg font-mono text-[11px] text-[#B8FF00] hover:bg-white/10 border border-[#B8FF00]/40 transition-colors cursor-pointer"
                    title="Configure student learning interests & passions"
                  >
                    + More
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Curiosity Hook & Scenario */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#080A0E] border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#B8FF00]">
                Real-World Curiosity Hook
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#FAF9F5] font-medium leading-relaxed italic">
              &ldquo;{passionData.inquiryHook}&rdquo;
            </p>
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8DA391]">
              <span className="leading-relaxed">
                <strong className="text-white">Why this matters:</strong> {passionData.step1Setup.description}
              </span>
              <span className="text-[#B8FF00] font-mono text-[11px] font-semibold shrink-0">
                Connected to Theory Below &darr;
              </span>
            </div>
          </div>
        </div>
      )}

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

              {/* ======================================================= */}
              {/* PERSONALIZED INTEREST-BASED ANALOGY & EXAMPLE INTEGRATION */}
              {/* ======================================================= */}
              {passionData && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  
                  {/* Section 0: Real-World Scenario Setup */}
                  {idx === 0 && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#080A0E] border border-[#B8FF00]/25 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{activeIcon}</span>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
                          Personalized Analogy &bull; {passionData.step1Setup.title}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#C8D6C9] leading-relaxed">
                        {passionData.step1Setup.description}
                      </p>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-medium">
                        <strong className="text-[#B8FF00] font-mono">CONCRETE CASE:</strong> {passionData.step1Setup.scenario}
                      </div>
                    </div>
                  )}

                  {/* Section 1: Governing Law & Mechanism Breakdown */}
                  {idx === 1 && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#080A0E] border border-[#B8FF00]/25 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{activeIcon}</span>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
                          Governing Law in Action &bull; {passionData.step2Mechanism.scientificLaw}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#C8D6C9] leading-relaxed">
                        {passionData.step2Mechanism.breakdown}
                      </p>
                      <div className="p-3 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/25 text-xs text-[#FAF9F5] font-semibold">
                        {passionData.step2Mechanism.connection}
                      </div>
                    </div>
                  )}

                  {/* Section 2: Intuitive Trap & Misconception */}
                  {idx === 2 && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#141A22] border border-amber-400/25 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                          Intuitive Misconception &bull; {passionData.step3Trap.title}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-amber-200/90 font-mono">
                        COMMON MYTH: &ldquo;{passionData.step3Trap.commonMyth}&rdquo;
                      </div>
                      <p className="text-xs sm:text-sm text-[#FAF9F5] font-medium leading-relaxed">
                        <strong className="text-amber-400">THE REALITY:</strong> {passionData.step3Trap.realityUnmasked}
                      </p>
                    </div>
                  )}

                  {/* Section 3 or Final Section: Interactive Challenge */}
                  {(idx >= 3 || (idx === content.sections.length - 1 && content.sections.length <= 3)) && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#080A0E] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-[#B8FF00]" />
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
                            Intuition Challenge &bull; Test Your Understanding
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8DA391]">
                          Interactive Thought Experiment
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                        {passionData.step4Challenge.prompt}
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsChallengeOpen(!isChallengeOpen)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#8DA391] hover:text-white font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isChallengeOpen ? (
                          <>
                            <ChevronDown className="w-3.5 h-3.5 text-[#B8FF00]" />
                            <span>Hide Solution</span>
                          </>
                        ) : (
                          <>
                            <ChevronRight className="w-3.5 h-3.5 text-[#B8FF00]" />
                            <span>Reveal Hint &amp; Solution</span>
                          </>
                        )}
                      </button>
                      {isChallengeOpen && (
                        <div className="space-y-2 pt-2 border-t border-white/5 animate-in fade-in duration-150">
                          <p className="font-mono text-[11px] text-[#8DA391]">
                            <strong>Hint:</strong> {passionData.step4Challenge.hint}
                          </p>
                          <div className="p-3 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 text-[#E0FF88] font-mono text-xs leading-relaxed">
                            <strong>SOLUTION:</strong> {passionData.step4Challenge.solution}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* Callout box if present */}
              {section.callout && (
                <div className={`p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 ${
                  section.callout.type === 'axiom'
                    ? 'bg-[#080A0E] text-[#F3F4EC] border-[#B8FF00]/30 relative corner-reticle shadow-md'
                    : section.callout.type === 'warning'
                    ? 'bg-[#1C1014] border-rose-500/30 text-rose-200'
                    : 'bg-[#141A22] border-white/10 text-[#FAF9F5]'
                }`}>
                  {section.callout.type === 'axiom' ? (
                    <Info className="w-4 h-4 text-[#B8FF00] shrink-0 mt-0.5" />
                  ) : section.callout.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <Lightbulb className="w-4 h-4 text-[#B8FF00] shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      section.callout.type === 'axiom' 
                        ? 'text-[#B8FF00]' 
                        : section.callout.type === 'warning' 
                        ? 'text-rose-400' 
                        : 'text-white'
                    }`}>
                      {section.callout.title}
                    </span>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      section.callout.type === 'axiom' 
                        ? 'text-[#C8D6C9]' 
                        : section.callout.type === 'warning' 
                        ? 'text-rose-200/90' 
                        : 'text-[#D0D4C7]'
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

      {/* Summary Takeaways Checklist (Obsidian Space Glass) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0D1117] border border-white/10 text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
          <CheckCircle2 className="w-4 h-4 text-[#B8FF00]" />
          <span>INVARIANT SUMMARY TAKEAWAYS</span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.summaryTakeaways.map((takeaway, i) => (
            <li
              key={i}
              className="p-3.5 rounded-2xl bg-[#141A22] border border-white/10 text-xs sm:text-sm text-[#D0D4C7] font-medium leading-relaxed flex items-start gap-2.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#B8FF00] shrink-0 mt-0.5" />
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
