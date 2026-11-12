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
      
      {/* Overview Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] space-y-3">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-[#111714]" />
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
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#171C18] tracking-tight">
            Step-by-Step Worked Derivations
          </h3>
          <span className="font-mono text-xs text-[#5E7A65]">
            {content.workedExamples.length} SOLVED SCENARIOS
          </span>
        </div>

        <div className="space-y-4">
          {content.workedExamples.map((example) => {
            const isExpanded = expandedExampleId === example.id;
            return (
              <div
                key={example.id}
                className="bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] shadow-xs overflow-hidden transition-all"
              >
                {/* Example Header */}
                <div
                  onClick={() => setExpandedExampleId(isExpanded ? '' : example.id)}
                  className="p-5 sm:p-6 flex items-center justify-between cursor-pointer bg-[#F1F1E9] hover:bg-[#DFE2D7] transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111714] text-[#C8F36B] uppercase">
                        {example.difficulty}
                      </span>
                      <h4 className="font-display text-base font-bold text-[#171C18]">
                        {example.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5E7A65] italic">
                      &ldquo;{example.contextOrPrompt}&rdquo;
                    </p>
                  </div>

                  <button className="text-[#171C18] p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Steps Breakdown */}
                {isExpanded && (
                  <div className="p-6 border-t border-[#DFE2D7] space-y-5 animate-in fade-in">
                    <div className="space-y-3">
                      {example.steps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-4 rounded-xl bg-[#F1F1E9] border border-[#DFE2D7] grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
                        >
                          <div className="md:col-span-5 space-y-1">
                            <span className="font-mono text-xs font-bold text-[#171C18]">
                              STEP {step.stepNumber}: {step.explanation}
                            </span>
                            {step.annotation && (
                              <p className="text-[11px] text-[#5E7A65]">
                                {step.annotation}
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-7 bg-[#E8EAE1] p-3 rounded-lg border border-[#DFE2D7] font-mono text-xs sm:text-sm text-[#111714] font-bold overflow-x-auto">
                            {step.work}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Final Result & Tip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-4 rounded-xl bg-[#111714] text-[#F3F4EC] border border-white/10 space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#C8F36B]">
                          <CheckCircle2 className="w-4 h-4 text-[#C8F36B]" />
                          <span>FINAL SOLUTION / VALUE</span>
                        </div>
                        <span className="font-mono font-bold text-sm text-[#F3F4EC] block">
                          {example.finalResult}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F1F1E9] border border-[#DFE2D7] text-xs text-[#171C18] space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#5E7A65]">
                          <Lightbulb className="w-4 h-4 text-[#111714]" />
                          <span>VERIFICATION HEURISTIC</span>
                        </div>
                        <p className="text-xs text-[#171C18]/80">{example.verificationTip}</p>
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
        <h3 className="font-display text-lg sm:text-xl font-bold text-[#171C18] tracking-tight flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#111714]" />
          <span>Real-World Engineering &amp; High-Stakes Systems</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.applications.map((app, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#DFE2D7] text-[#171C18] uppercase">
                    {app.domain}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-[#171C18]">
                  {app.title}
                </h4>
                <p className="font-mono text-xs text-[#5E7A65]">
                  {app.context}
                </p>
                <p className="text-xs sm:text-sm text-[#171C18]/80 leading-relaxed pt-1">
                  {app.realWorldScenario}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111714] text-[#F3F4EC] text-xs flex items-center gap-2.5 mt-2 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#C8F36B] shrink-0" />
                <span className="font-mono text-xs">
                  <strong className="text-[#C8F36B]">IMPACT:</strong> {app.impactMetric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hands-On Self-Check Exercise */}
      <div className="bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] shadow-xs p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#111714]" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            SELF-CALIBRATION CHALLENGE
          </h4>
        </div>

        <p className="text-sm text-[#171C18] font-medium leading-relaxed bg-[#F1F1E9] p-4 sm:p-5 rounded-xl border border-[#DFE2D7]">
          {content.selfCheckExercise.question}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-semibold text-[#171C18] bg-[#F1F1E9] hover:bg-[#DFE2D7] border border-[#DFE2D7] transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#111714]" />
            <span>{showHint ? 'HIDE HINT' : 'VIEW GUIDED HINT'}</span>
          </button>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-semibold text-[#111714] bg-[#C8F36B] hover:bg-[#d6f78a] transition-colors"
          >
            <span>{showSolution ? 'HIDE SOLUTION' : 'REVEAL DERIVATION'}</span>
          </button>
        </div>

        {showHint && (
          <div className="p-4 rounded-xl bg-[#F1F1E9] border border-[#DFE2D7] text-xs text-[#171C18] font-medium leading-relaxed animate-in fade-in">
            <strong className="font-mono text-xs text-[#5E7A65]">HINT:</strong> {content.selfCheckExercise.hint}
          </div>
        )}

        {showSolution && (
          <div className="p-4 rounded-xl bg-[#111714] text-[#F3F4EC] border border-white/10 text-xs sm:text-sm leading-relaxed font-mono animate-in fade-in">
            <strong className="text-[#C8F36B]">WORKED SOLUTION:</strong> {content.selfCheckExercise.solution}
          </div>
        )}
      </div>

    </div>
  );
};
