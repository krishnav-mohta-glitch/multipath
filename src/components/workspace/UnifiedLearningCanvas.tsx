import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronDown
} from 'lucide-react';
import type { Topic } from '../../types/topic';
import { useAuth } from '../../context/AuthContext';
import { StructuredExplanationView } from './paths/StructuredExplanationView';
import { ExploreExperimentView } from './paths/ExploreExperimentView';
import { ExamplesApplicationsView } from './paths/ExamplesApplicationsView';
import { getPassionExplanation } from '../../data/passionExplanations';

interface UnifiedLearningCanvasProps {
  topic: Topic;
}

export const UnifiedLearningCanvas: React.FC<UnifiedLearningCanvasProps> = ({ topic }) => {
  const { profile, openPassionModal } = useAuth();

  // Active passion (default to student profile passion, or 'football')
  const [activePassionId, setActivePassionId] = useState<string>(profile?.passion || 'football');

  // Step-by-step discovery ladder state (don't reveal everything at once!)
  const [revealedSteps, setRevealedSteps] = useState<Record<number, boolean>>({
    1: true,  // Step 1 open by default
    2: false, // Step 2 hidden until student interacts
    3: false, // Step 3 hidden until student interacts
    4: false  // Challenge solution hidden until student interacts
  });

  const toggleStep = (stepNumber: number) => {
    setRevealedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const passionData = getPassionExplanation(
    topic.id,
    topic.title,
    topic.subjectId,
    activePassionId
  );

  return (
    <div className="space-y-12">
      
      {/* =================================================================== */}
      {/* SUBHEADING 1: STRUCTURED EXPLANATION                                */}
      {/* =================================================================== */}
      <section id="section-structured-explanation" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#B8FF00] text-[#080A0E] flex items-center justify-center font-mono font-black text-sm shadow-md">
              01
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight break-words">
                Structured Explanation
              </h2>
              <p className="text-xs text-[#8DA391] font-mono break-words">
                First-principles conceptual breakdown &amp; textbook syllabus fundamentals
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#8DA391] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
            Part 1 • Conceptual Core
          </span>
        </div>

        {/* Structured Explanation Body */}
        <div className="bg-[#0D1117] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
          <StructuredExplanationView content={topic.paths['structured-explanation']} />
        </div>
      </section>

      {/* =================================================================== */}
      {/* SUBHEADING 2: EXAMPLES AND APPLICATIONS (PERSONALIZED PASSIONS)     */}
      {/* =================================================================== */}
      <section id="section-examples-applications" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#C8F36B] text-[#080A0E] flex items-center justify-center font-mono font-black text-sm shadow-md">
              02
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight break-words">
                Examples and Applications
              </h2>
              <p className="text-xs text-[#8DA391] font-mono break-words">
                Tailored through your favorite real-world passions &bull; Step-by-step discovery
              </p>
            </div>
          </div>

          {/* Quick Passion Switcher Pills */}
          <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
            <span className="font-mono text-[10px] text-[#8DA391] uppercase mr-1">Analogies:</span>
            {[
              { id: 'football', label: '⚽ Football' },
              { id: 'cricket', label: '🏏 Cricket' },
              { id: 'gaming', label: '🎮 Gaming' },
              { id: 'space', label: '🚀 Space' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePassionId(p.id)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer ${
                  activePassionId === p.id
                    ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-[#8DA391] border border-white/10'
                }`}
              >
                {p.label}
              </button>
            ))}
            <button
              type="button"
              onClick={openPassionModal}
              className="px-2 py-1 rounded-lg font-mono text-[11px] text-[#B8FF00] hover:bg-white/10 border border-[#B8FF00]/40 transition-colors cursor-pointer"
              title="More passions & personal profile settings"
            >
              + More
            </button>
          </div>
        </div>

        {/* Personalized Passion Interactive Hook Banner */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#111923] via-[#0D151E] to-[#0D1117] border border-[#B8FF00]/25 shadow-2xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8FF00]" />
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#B8FF00]">
                {passionData.passionTitle.toUpperCase()}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#8DA391] bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              Interactive Inquiry Mode
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
              &ldquo;{passionData.inquiryHook}&rdquo;
            </h3>
            <p className="text-xs text-[#8DA391] leading-relaxed">
              Instead of memorizing static formulas, see how {topic.title} governs every high-stakes moment in this field. Step through each discovery layer below:
            </p>
          </div>

          {/* Progressive Discovery Ladder (Does not give away answers immediately!) */}
          <div className="space-y-3 pt-2">
            
            {/* Step 1: Real-World Scenario */}
            <div className="rounded-2xl border border-white/10 bg-[#080A0E] overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleStep(1)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/10 font-mono text-[10px] text-[#B8FF00] font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {passionData.step1Setup.title}
                  </span>
                </div>
                {revealedSteps[1] ? <ChevronDown className="w-4 h-4 text-[#8DA391]" /> : <ChevronRight className="w-4 h-4 text-[#8DA391]" />}
              </button>
              {revealedSteps[1] && (
                <div className="p-4 pt-1 border-t border-white/5 space-y-2 text-xs text-[#C8D6C9] leading-relaxed">
                  <p>{passionData.step1Setup.description}</p>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium">
                    {passionData.step1Setup.scenario}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Scientific Law Breakdown */}
            <div className="rounded-2xl border border-white/10 bg-[#080A0E] overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleStep(2)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/10 font-mono text-[10px] text-[#B8FF00] font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {passionData.step2Mechanism.title}
                  </span>
                </div>
                {revealedSteps[2] ? <ChevronDown className="w-4 h-4 text-[#8DA391]" /> : <ChevronRight className="w-4 h-4 text-[#8DA391]" />}
              </button>
              {revealedSteps[2] && (
                <div className="p-4 pt-1 border-t border-white/5 space-y-2 text-xs text-[#C8D6C9] leading-relaxed">
                  <div className="font-mono text-[11px] text-[#B8FF00] font-bold">
                    GOVERNING LAW: {passionData.step2Mechanism.scientificLaw}
                  </div>
                  <p>{passionData.step2Mechanism.breakdown}</p>
                  <p className="font-semibold text-white pt-1">{passionData.step2Mechanism.connection}</p>
                </div>
              )}
            </div>

            {/* Step 3: Unmasking the Textbook Trap */}
            <div className="rounded-2xl border border-white/10 bg-[#080A0E] overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleStep(3)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/10 font-mono text-[10px] text-amber-400 font-bold flex items-center justify-center">
                    3
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {passionData.step3Trap.title}
                  </span>
                </div>
                {revealedSteps[3] ? <ChevronDown className="w-4 h-4 text-[#8DA391]" /> : <ChevronRight className="w-4 h-4 text-[#8DA391]" />}
              </button>
              {revealedSteps[3] && (
                <div className="p-4 pt-1 border-t border-white/5 space-y-2 text-xs text-[#C8D6C9] leading-relaxed">
                  <div className="text-amber-300 font-mono text-[11px]">
                    COMMON MYTH: &ldquo;{passionData.step3Trap.commonMyth}&rdquo;
                  </div>
                  <p className="text-white font-medium">{passionData.step3Trap.realityUnmasked}</p>
                </div>
              )}
            </div>

            {/* Step 4: Matchday Challenge */}
            <div className="rounded-2xl border border-white/10 bg-[#080A0E] overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleStep(4)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/10 font-mono text-[10px] text-[#B8FF00] font-bold flex items-center justify-center">
                    4
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Interactive Challenge &bull; Test Your Intuition
                  </span>
                </div>
                {revealedSteps[4] ? <ChevronDown className="w-4 h-4 text-[#8DA391]" /> : <ChevronRight className="w-4 h-4 text-[#8DA391]" />}
              </button>
              {revealedSteps[4] && (
                <div className="p-4 pt-1 border-t border-white/5 space-y-2 text-xs text-[#C8D6C9] leading-relaxed">
                  <p className="text-white font-bold">{passionData.step4Challenge.prompt}</p>
                  <p className="font-mono text-[11px] text-[#8DA391]">Hint: {passionData.step4Challenge.hint}</p>
                  <div className="p-3 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 text-[#E0FF88] font-mono text-xs">
                    SOLUTION: {passionData.step4Challenge.solution}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Traditional Worked Examples & Engineering Applications */}
        <div className="bg-[#0D1117] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
          <ExamplesApplicationsView content={topic.paths['examples-applications']} />
        </div>
      </section>

      {/* =================================================================== */}
      {/* SUBHEADING 3: EXPLORE AND EXPERIMENT (WITH AUDIO & VIDEO CHOICES)   */}
      {/* =================================================================== */}
      <section id="section-explore-experiment" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#70E000] text-[#080A0E] flex items-center justify-center font-mono font-black text-sm shadow-md">
              03
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight break-words">
                Explore and Experiment
              </h2>
              <p className="text-xs text-[#8DA391] font-mono break-words">
                Hands-on simulation laboratory &bull; Interactive Variable Workbench
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#8DA391] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
            Part 3 • Interactive Laboratory
          </span>
        </div>

        {/* Hands-On Simulation Workbench */}
        <div className="bg-[#0D1117] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
          <ExploreExperimentView content={topic.paths['explore-experiment']} topic={topic} />
        </div>
      </section>

    </div>
  );
};
