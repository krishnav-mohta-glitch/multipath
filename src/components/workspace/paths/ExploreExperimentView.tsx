import React from 'react';
import { FlaskConical, Sparkles, HelpCircle, Eye, CheckCircle2, Sliders } from 'lucide-react';
import type { ExploreExperimentContent } from '../../../types/learningPath';
import { LinearEquationsExperiment } from '../experiments/LinearEquationsExperiment';
import { PhotosynthesisExperiment } from '../experiments/PhotosynthesisExperiment';
import { FrenchRevolutionExperiment } from '../experiments/FrenchRevolutionExperiment';
import { MetaphorWorkbenchExperiment } from '../experiments/MetaphorWorkbenchExperiment';

interface ExploreExperimentViewProps {
  content: ExploreExperimentContent;
}

export const ExploreExperimentView: React.FC<ExploreExperimentViewProps> = ({ content }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Activity Overview Banner */}
      <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-amber-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Interactive Exploration Lab
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {content.activityTitle}
        </h3>

        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          <strong>Objective:</strong> {content.objective}
        </p>

        <p className="text-xs text-slate-600 italic">
          {content.instructions}
        </p>
      </div>

      {/* Dynamic Experiment Simulator Widget */}
      <div>
        {content.experimentType === 'linear-equations' && <LinearEquationsExperiment />}
        {content.experimentType === 'photosynthesis' && <PhotosynthesisExperiment />}
        {content.experimentType === 'french-revolution' && <FrenchRevolutionExperiment />}
        {content.experimentType === 'metaphors' && <MetaphorWorkbenchExperiment />}
        {content.experimentType === 'generic' && (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
            <Sliders className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">Variable Parameter Sandbox</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Manipulate available system parameters below to observe real-time equilibrium shifts.
            </p>
          </div>
        )}
      </div>

      {/* Guiding Questions to Investigate */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-brand-600" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Inquiry Questions to Test
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.guidingQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed"
            >
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ?
              </span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What to Observe & Takeaway Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What to Observe */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Eye className="w-4 h-4 text-slate-600" />
            <span>Key Dynamics to Observe</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {content.whatToObserve.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Discovery Insight */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Independent Deduction Takeaway</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {content.takeawayInsight}
          </p>
        </div>
      </div>

    </div>
  );
};
