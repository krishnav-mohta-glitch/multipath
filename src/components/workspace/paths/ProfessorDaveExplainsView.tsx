import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  GraduationCap,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import type { Topic } from '../../../types/topic';
import { getProfessorDaveStory } from '../../../data/professorDaveStories';
import { InteractivePassionSandbox } from '../passion/InteractivePassionSandbox';

export interface ProfessorDaveExplainsViewProps {
  topic: Topic;
  activePassionId: string;
  onSelectPassion: (passionId: string) => void;
  onOpenMorePassions?: () => void;
}

const PASSIONS_LIST = [
  { id: 'football', label: '⚽ Football' },
  { id: 'cricket', label: '🏏 Cricket' },
  { id: 'gaming', label: '🎮 Gaming' },
  { id: 'space', label: '🚀 Space' },
  { id: 'music', label: '🎵 Music' },
  { id: 'robotics', label: '🤖 Robotics' },
];

export const ProfessorDaveExplainsView: React.FC<ProfessorDaveExplainsViewProps> = ({
  topic,
  activePassionId,
  onSelectPassion,
  onOpenMorePassions,
}) => {
  const [showExamDetails, setShowExamDetails] = useState(false);
  const [showQuickCheckAnswer, setShowQuickCheckAnswer] = useState(false);

  const story = getProfessorDaveStory(topic, activePassionId);
  const structuredData = topic.paths['structured-explanation'];

  return (
    <article className="space-y-12 max-w-4xl mx-auto text-[#D8E2D9] font-sans antialiased animate-in fade-in duration-300">
      
      {/* =================================================================== */}
      {/* 1. TOP BAR: DAVE'S BADGE & CLEAN PASSION LENS SELECTOR              */}
      {/* =================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#B8FF00] text-[#080A0E] flex items-center justify-center font-bold font-mono text-base shadow-md">
            PD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
                PROFESSOR DAVE EXPLAINS
              </span>
              <span className="font-mono text-[10px] text-[#8DA391] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                ELI5 Edition
              </span>
            </div>
            <p className="text-xs text-[#8DA391]">
              Simple intuition first &bull; Tailored to what you love
            </p>
          </div>
        </div>

        {/* Decluttered Passion Lens Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-[10px] text-[#8DA391] uppercase mr-1">Analogy Lens:</span>
          {PASSIONS_LIST.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPassion(p.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                activePassionId === p.id
                  ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-[#8DA391] hover:text-white border border-white/10'
              }`}
            >
              {p.label}
            </button>
          ))}
          {onOpenMorePassions && (
            <button
              type="button"
              onClick={onOpenMorePassions}
              className="px-2.5 py-1.5 rounded-xl font-mono text-xs text-[#B8FF00] hover:bg-white/10 border border-[#B8FF00]/40 transition-colors cursor-pointer"
              title="Add more personal passions"
            >
              + More
            </button>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. THE CURIOSITY HOOK (LARGE & UNCLUTTERED)                         */}
      {/* =================================================================== */}
      <div className="space-y-4">
        <p className="text-sm sm:text-base font-mono text-[#B8FF00] font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{story.greeting}</span>
        </p>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          &ldquo;{story.hook}&rdquo;
        </h2>
      </div>

      {/* =================================================================== */}
      {/* 3. THE 5-YEAR-OLD METAPHOR (FLOWING EDITORIAL PROSE)                */}
      {/* =================================================================== */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#8DA391]">
          <span className="w-2 h-2 rounded-full bg-[#B8FF00]" />
          <span>1. The Simple 5-Year-Old Picture</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
          {story.eli5Metaphor.title}
        </h3>

        <p className="text-base sm:text-lg text-[#E2EAE3] leading-relaxed">
          {story.eli5Metaphor.story}
        </p>

        {/* Minimalist Accent Highlight (No nested boxes!) */}
        <div className="border-l-4 border-[#B8FF00] pl-5 py-2 my-4 bg-white/[0.02] rounded-r-xl">
          <p className="font-display font-bold text-base sm:text-lg text-[#B8FF00] italic">
            &ldquo;{story.eli5Metaphor.punchline}&rdquo;
          </p>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. THE REAL-WORLD PASSION CONNECTION (INTERACTIVE SANDBOX)          */}
      {/* =================================================================== */}
      <section className="space-y-6 pt-4 border-t border-white/08">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
          <span className="text-sm">{story.passionConnection.passionIcon}</span>
          <span>2. How This Works in {story.passionConnection.passionName}</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
          {story.passionConnection.title}
        </h3>

        <p className="text-base sm:text-lg text-[#E2EAE3] leading-relaxed">
          {story.passionConnection.explanation}
        </p>

        {/* Live Interactive Passion-Themed Sandbox Widget */}
        <InteractivePassionSandbox 
          topic={topic}
          passionId={activePassionId}
        />
      </section>

      {/* =================================================================== */}
      {/* 5. THE GOLDEN RULE & FORMULA DEMYSTIFIED                            */}
      {/* =================================================================== */}
      <section className="space-y-5 pt-4 border-t border-white/08">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#8DA391]">
          <Lightbulb className="w-4 h-4 text-[#B8FF00]" />
          <span>3. The Golden Rule</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
          {story.theGoldenRule.ruleName}
        </h3>

        {/* Clean formula block */}
        {story.theGoldenRule.formula && (
          <div className="py-4 my-2 text-center">
            <span className="inline-block px-6 py-3 rounded-2xl bg-[#080A0E] border border-[#B8FF00]/30 font-mono text-2xl sm:text-3xl font-extrabold text-[#B8FF00] shadow-xl tracking-wider">
              {story.theGoldenRule.formula}
            </span>
          </div>
        )}

        <ul className="space-y-3 text-sm sm:text-base text-[#D0DCD2] leading-relaxed">
          {story.theGoldenRule.breakdownPoints.map((pt, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] mt-2.5 shrink-0" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm sm:text-base font-semibold text-white pt-2">
          {story.theGoldenRule.summary}
        </p>
      </section>

      {/* =================================================================== */}
      {/* 6. WHAT TRIPS PEOPLE UP (THE COMMON TRAP)                           */}
      {/* =================================================================== */}
      <section className="space-y-4 pt-4 border-t border-white/08">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>4. What Trips People Up on Tests</span>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-sm text-amber-200/90 font-medium">
            <strong>The Common Myth:</strong> &ldquo;{story.theCommonTrap.myth}&rdquo;
          </p>
          <p className="text-base sm:text-lg text-[#E2EAE3] leading-relaxed">
            <strong className="text-white">Why it&apos;s wrong:</strong> {story.theCommonTrap.reality}
          </p>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. QUICK INTUITION CHECK                                            */}
      {/* =================================================================== */}
      <section className="space-y-4 pt-4 border-t border-white/08">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
          <HelpCircle className="w-4 h-4 text-[#B8FF00]" />
          <span>5. Quick Intuition Check</span>
        </div>

        <p className="text-base sm:text-lg font-bold text-white">
          {story.quickCheck.question}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setShowQuickCheckAnswer(!showQuickCheckAnswer)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-mono font-bold text-[#B8FF00] border border-[#B8FF00]/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            {showQuickCheckAnswer ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span>{showQuickCheckAnswer ? 'Hide Answer' : 'Check My Intuition &rarr;'}</span>
          </button>
        </div>

        {showQuickCheckAnswer && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#080A0E] border border-[#B8FF00]/30 space-y-2 animate-in fade-in duration-200">
            <p className="text-xs font-mono text-[#8DA391]">
              <strong>Hint:</strong> {story.quickCheck.hint}
            </p>
            <p className="text-sm sm:text-base font-mono font-bold text-[#E0FF88]">
              {story.quickCheck.answer}
            </p>
          </div>
        )}
      </section>

      {/* =================================================================== */}
      {/* 8. DISCREET COLLAPSIBLE EXAM BLUEPRINT (FOR SCHOOL BOARDS)          */}
      {/* =================================================================== */}
      <div className="pt-8 border-t border-white/12">
        <button
          type="button"
          onClick={() => setShowExamDetails(!showExamDetails)}
          className="w-full p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 flex items-center justify-between text-left transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 text-[#8DA391] group-hover:text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block">
                Official Syllabus &amp; Exam Blueprint
              </span>
              <span className="text-xs text-[#8DA391]">
                Formal textbook definitions, equations &amp; marking scheme (CBSE / ICSE)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#8DA391] group-hover:text-white">
            <span>{showExamDetails ? 'Collapse' : 'Expand'}</span>
            {showExamDetails ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        </button>

        {showExamDetails && (
          <div className="mt-4 p-6 sm:p-8 rounded-3xl bg-[#080A0E] border border-white/10 space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8DA391]">
                Formal Introduction:
              </span>
              <p className="text-sm text-[#C8D6C9] leading-relaxed">
                {structuredData.introduction}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8DA391]">
                Official Deductive Sections:
              </span>
              {structuredData.sections.map((sec, idx) => (
                <div key={sec.id} className="space-y-2">
                  <h4 className="font-display font-bold text-sm sm:text-base text-white">
                    {idx + 1}. {sec.title}
                  </h4>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-[#C8D6C9] leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {sec.bulletPoints && (
                    <ul className="space-y-1 pl-4">
                      {sec.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className="text-xs text-[#8DA391] list-disc">
                          {bp}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
                Official Exam Takeaways:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {structuredData.summaryTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#C8D6C9]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF00] shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

    </article>
  );
};
