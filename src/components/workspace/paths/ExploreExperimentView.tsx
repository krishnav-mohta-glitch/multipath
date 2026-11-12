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
      <div className="p-6 sm:p-7 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] space-y-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-[#111714]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            EMPIRICAL LAB &bull; PARAMETRIC SIMULATION
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#171C18] tracking-tight">
          {content.activityTitle}
        </h3>

        <p className="text-sm sm:text-base text-[#171C18] leading-relaxed max-w-3xl font-medium">
          <span className="font-mono text-xs uppercase text-[#5E7A65] block">OBJECTIVE:</span>
          {content.objective}
        </p>

        <p className="font-mono text-xs text-[#5E7A65]">
          INSTRUCTIONS: {content.instructions}
        </p>
      </div>

      {/* Dynamic Experiment Simulator Container (Phase 10 Three.js Target) */}
      <div 
        id="threejs-simulation-container" 
        className="bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] p-6 sm:p-7 space-y-4 shadow-xs relative overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-[#DFE2D7] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111714]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#171C18]">
              ACTIVE EXPERIMENT SANDBOX
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#5E7A65] uppercase">
            MODEL: {content.experimentType}
          </span>
        </div>

        <div className="pt-2">
          {content.experimentType === 'linear-equations' && <LinearEquationsExperiment />}
          {content.experimentType === 'photosynthesis' && <PhotosynthesisExperiment />}
          {content.experimentType === 'french-revolution' && <FrenchRevolutionExperiment />}
          {content.experimentType === 'metaphors' && <MetaphorWorkbenchExperiment />}
          {content.experimentType === 'generic' && (
            <div className="p-8 bg-[#F1F1E9] rounded-xl border border-[#DFE2D7] text-center space-y-3">
              <Sliders className="w-8 h-8 text-[#5E7A65] mx-auto" />
              <h4 className="font-display text-base font-bold text-[#171C18]">Variable Parameter Sandbox</h4>
              <p className="text-xs text-[#5E7A65] max-w-md mx-auto">
                Manipulate available system parameters below to observe real-time equilibrium shifts.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Guiding Questions to Investigate */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#111714]" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            INQUIRY VECTORS TO TEST
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.guidingQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] shadow-xs flex items-start gap-3 text-xs sm:text-sm text-[#171C18] font-medium leading-relaxed"
            >
              <span className="w-5 h-5 rounded-md bg-[#111714] text-[#C8F36B] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
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
        <div className="p-5 sm:p-6 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            <Eye className="w-4 h-4 text-[#111714]" />
            <span>KEY DYNAMICS TO OBSERVE</span>
          </div>
          <ul className="space-y-2.5 text-xs text-[#171C18]">
            {content.whatToObserve.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#111714] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Discovery Insight */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111714] text-[#F3F4EC] space-y-2 border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#C8F36B]">
            <Sparkles className="w-4 h-4 text-[#C8F36B]" />
            <span>CORE EMPIRICAL DISCOVERY</span>
          </div>
          <p className="text-xs sm:text-sm text-[#8DA391] leading-relaxed font-medium">
            {content.takeawayInsight}
          </p>
        </div>
      </div>

    </div>
  );
};
