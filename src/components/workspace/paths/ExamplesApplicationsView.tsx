import React, { useState } from 'react';
import { Wrench, CheckCircle2, Briefcase, Lightbulb, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { ExamplesApplicationsContent } from '../../../types/learningPath';

interface ExamplesApplicationsViewProps {
  content: ExamplesApplicationsContent;
}

export const ExamplesApplicationsView: React.FC<ExamplesApplicationsViewProps> = ({ content }) => {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [expandedExampleId, setExpandedExampleId] = useState<string>(
    content.workedExamples[0]?.id || ''
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Overview Banner (Warm Ivory Editorial Surface) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DC] text-[#171C18] space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-[#080A0E]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            PRAGMATIC MASTERY &bull; WORKED SYSTEMS &amp; CASES
          </span>
        </div>

        <p className="text-base sm:text-lg text-[#171C18] leading-relaxed font-sans font-medium">
          {content.overview}
        </p>
      </div>

      {/* Worked Examples Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
            Step-by-Step Worked Derivations
          </h3>
          <span className="font-mono text-xs text-[#8DA391]">
            {content.workedExamples.length} SOLVED SCENARIOS
          </span>
        </div>

        <div className="space-y-4">
          {content.workedExamples.map((example) => {
            const isExpanded = expandedExampleId === example.id;
            return (
              <div
                key={example.id}
                className="bg-[#FAF9F5] text-[#171C18] rounded-2xl border border-[#E5E4DC] shadow-sm overflow-hidden transition-all"
              >
                {/* Example Header */}
                <div
                  onClick={() => setExpandedExampleId(isExpanded ? '' : example.id)}
                  className="p-5 sm:p-6 flex items-center justify-between cursor-pointer bg-[#F3F2EB] hover:bg-[#EBEAE1] transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#080A0E] text-[#B8FF00] uppercase">
                        {example.difficulty}
                      </span>
                      <h4 className="font-display text-base font-bold text-[#080A0E]">
                        {example.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5E7A65] italic">
                      &ldquo;{example.contextOrPrompt}&rdquo;
                    </p>
                  </div>

                  <button className="text-[#080A0E] p-1" aria-label={isExpanded ? 'Collapse example' : 'Expand example'}>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Steps Breakdown */}
                {isExpanded && (
                  <div className="p-6 border-t border-[#E5E4DC] space-y-5 animate-in fade-in">
                    <div className="space-y-3">
                      {example.steps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-4 rounded-xl bg-[#F3F2EB] border border-[#E5E4DC] grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
                        >
                          <div className="md:col-span-5 space-y-1">
                            <span className="font-mono text-xs font-bold text-[#080A0E]">
                              STEP {step.stepNumber}: {step.explanation}
                            </span>
                            {step.annotation && (
                              <p className="text-[11px] text-[#5E7A65]">
                                {step.annotation}
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-7 bg-[#FAF9F5] p-3 rounded-lg border border-[#E5E4DC] font-mono text-xs sm:text-sm text-[#080A0E] font-bold overflow-x-auto">
                            {step.work}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Final Result & Tip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-4 rounded-xl bg-[#080A0E] text-[#F3F4EC] border border-white/10 space-y-1 relative corner-reticle">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#B8FF00]">
                          <CheckCircle2 className="w-4 h-4 text-[#B8FF00]" />
                          <span>FINAL SOLUTION / VALUE</span>
                        </div>
                        <span className="font-mono font-bold text-sm text-white block">
                          {example.finalResult}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F3F2EB] border border-[#E5E4DC] text-xs text-[#171C18] space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#5E7A65]">
                          <Lightbulb className="w-4 h-4 text-[#080A0E]" />
                          <span>VERIFICATION HEURISTIC</span>
                        </div>
                        <p className="text-xs text-[#171C18]/85">{example.verificationTip}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-World Case Studies */}
      <div className="space-y-4">
        <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#B8FF00]" />
          <span>Real-World Engineering &amp; High-Stakes Systems</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.applications.map((app, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DC] text-[#171C18] shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#080A0E] text-[#B8FF00] uppercase">
                    {app.domain}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-[#080A0E]">
                  {app.title}
                </h4>
                <p className="font-mono text-xs text-[#5E7A65]">
                  {app.context}
                </p>
                <p className="text-xs sm:text-sm text-[#171C18]/85 leading-relaxed pt-1">
                  {app.realWorldScenario}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080A0E] text-[#F3F4EC] text-xs flex items-center gap-2.5 mt-2 border border-white/10 relative corner-reticle">
                <CheckCircle2 className="w-4 h-4 text-[#B8FF00] shrink-0" />
                <span className="font-mono text-xs">
                  <strong className="text-[#B8FF00]">IMPACT:</strong> {app.impactMetric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hands-On Self-Check Exercise */}
      <div className="bg-[#FAF9F5] text-[#171C18] rounded-2xl border border-[#E5E4DC] shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#080A0E]" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            SELF-CALIBRATION CHALLENGE
          </h4>
        </div>

        <div className="text-sm text-[#171C18] font-medium leading-relaxed bg-[#F3F2EB] p-4 sm:p-5 rounded-xl border border-[#E5E4DC]">
          {content.selfCheckExercise.question}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-semibold text-[#080A0E] bg-[#F3F2EB] hover:bg-[#EBEAE1] border border-[#E5E4DC] transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#080A0E]" />
            <span>{showHint ? 'HIDE HINT' : 'VIEW GUIDED HINT'}</span>
          </button>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-bold text-[#080A0E] bg-[#B8FF00] hover:bg-[#cbfb45] transition-colors shadow-sm"
          >
            <span>{showSolution ? 'HIDE SOLUTION' : 'REVEAL DERIVATION'}</span>
          </button>
        </div>

        {showHint && (
          <div className="p-4 rounded-xl bg-[#F3F2EB] border border-[#E5E4DC] text-xs text-[#171C18] font-medium leading-relaxed animate-in fade-in">
            <strong className="font-mono text-xs text-[#5E7A65]">HINT:</strong> {content.selfCheckExercise.hint}
          </div>
        )}

        {showSolution && (
          <div className="p-4 rounded-xl bg-[#080A0E] text-[#F3F4EC] border border-white/10 text-xs sm:text-sm leading-relaxed font-mono animate-in fade-in relative corner-reticle">
            <strong className="text-[#B8FF00]">WORKED SOLUTION:</strong> {content.selfCheckExercise.solution}
          </div>
        )}
      </div>

    </div>
  );
};
