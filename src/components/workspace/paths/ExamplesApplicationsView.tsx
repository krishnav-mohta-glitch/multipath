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
      <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
            Pragmatic Mastery: Worked Solutions & Real-World Systems
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans">
          {content.overview}
        </p>
      </div>

      {/* Worked Examples Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Step-by-Step Worked Examples
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {content.workedExamples.length} Fully Solved Scenarios
          </span>
        </div>

        <div className="space-y-4">
          {content.workedExamples.map((example) => {
            const isExpanded = expandedExampleId === example.id;
            return (
              <div
                key={example.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
              >
                {/* Example Header */}
                <div
                  onClick={() => setExpandedExampleId(isExpanded ? '' : example.id)}
                  className="p-5 flex items-center justify-between cursor-pointer bg-slate-50/60 hover:bg-slate-50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {example.difficulty}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {example.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 italic">
                      "{example.contextOrPrompt}"
                    </p>
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Steps Breakdown */}
                {isExpanded && (
                  <div className="p-6 border-t border-slate-100 space-y-5 animate-in fade-in">
                    <div className="space-y-3">
                      {example.steps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
                        >
                          <div className="md:col-span-5 space-y-1">
                            <span className="text-xs font-bold text-slate-900">
                              Step {step.stepNumber}: {step.explanation}
                            </span>
                            {step.annotation && (
                              <p className="text-[11px] text-slate-500">
                                {step.annotation}
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-7 bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs sm:text-sm text-brand-900 font-semibold overflow-x-auto">
                            {step.work}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Final Result & Tip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Final Solution / Result</span>
                        </div>
                        <span className="font-mono font-bold text-sm text-emerald-800">
                          {example.finalResult}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Verification Tip</span>
                        </div>
                        <p>{example.verificationTip}</p>
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
        <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          <span>Real-World Engineering & High-Stakes Applications</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.applications.map((app, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {app.domain}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {app.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {app.context}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                  {app.realWorldScenario}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 text-white text-xs flex items-center gap-2.5 mt-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-emerald-300">Measurable Impact:</strong> {app.impactMetric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hands-On Self-Check Exercise */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Self-Check Challenge
          </h4>
        </div>

        <p className="text-sm text-slate-800 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
          {content.selfCheckExercise.question}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{showHint ? 'Hide Hint' : 'View Guided Hint'}</span>
          </button>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors"
          >
            <span>{showSolution ? 'Hide Solution' : 'Reveal Worked Solution'}</span>
          </button>
        </div>

        {showHint && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed animate-in fade-in">
            <strong>Hint:</strong> {content.selfCheckExercise.hint}
          </div>
        )}

        {showSolution && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 leading-relaxed font-mono animate-in fade-in">
            <strong>Worked Solution:</strong> {content.selfCheckExercise.solution}
          </div>
        )}
      </div>

    </div>
  );
};
