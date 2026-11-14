import React, { Suspense } from 'react';
import { FlaskConical, Sparkles, HelpCircle, Eye, CheckCircle2, Sliders } from 'lucide-react';
import type { ExploreExperimentContent } from '../../../types/learningPath';
import { LinearEquationsExperiment } from '../experiments/LinearEquationsExperiment';
import { PhotosynthesisExperiment } from '../experiments/PhotosynthesisExperiment';
import { FrenchRevolutionExperiment } from '../experiments/FrenchRevolutionExperiment';
import { MetaphorWorkbenchExperiment } from '../experiments/MetaphorWorkbenchExperiment';

const InteractiveModelScene = React.lazy(() => import('../../three/InteractiveModelScene'));

interface ExploreExperimentViewProps {
  content: ExploreExperimentContent;
}

export const ExploreExperimentView: React.FC<ExploreExperimentViewProps> = ({ content }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Activity Overview Banner (Warm Ivory Surface for High-Legibility Reading) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DC] text-[#171C18] space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-[#080A0E]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            EMPIRICAL LAB &bull; PARAMETRIC SIMULATION
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#080A0E] tracking-tight">
          {content.activityTitle}
        </h3>

        <div className="text-sm sm:text-base text-[#171C18] leading-relaxed max-w-3xl font-medium">
          <span className="font-mono text-xs uppercase text-[#5E7A65] block font-bold">OBJECTIVE:</span>
          {content.objective}
        </div>

        <p className="font-mono text-xs text-[#5E7A65] pt-1 border-t border-[#E5E4DC]">
          INSTRUCTIONS: {content.instructions}
        </p>
      </div>

      {/* Dynamic Experiment Simulator Container (Phase 10 Three.js & 2D Host) */}
      <div 
        id="threejs-simulation-container" 
        className="space-y-4"
      >
        {(() => {
          const fallback2D = (
            <div className="rounded-2xl space-y-4">
              <div className="pt-2">
                {content.experimentType === 'linear-equations' && <LinearEquationsExperiment />}
                {content.experimentType === 'photosynthesis' && <PhotosynthesisExperiment />}
                {content.experimentType === 'french-revolution' && <FrenchRevolutionExperiment />}
                {content.experimentType === 'metaphors' && <MetaphorWorkbenchExperiment />}
                {content.experimentType === 'generic' && (
                  <div className="p-8 bg-[#0D1117] text-[#F3F4EC] rounded-2xl border border-white/10 text-center space-y-3">
                    <Sliders className="w-8 h-8 text-[#B8FF00] mx-auto" />
                    <h4 className="font-display text-base font-bold text-white">Variable Parameter Sandbox</h4>
                    <p className="text-xs text-[#8DA391] max-w-md mx-auto">
                      Manipulate available system parameters below to observe real-time equilibrium shifts.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <Suspense fallback={fallback2D}>
              <InteractiveModelScene
                experimentType={content.experimentType}
                fallback={fallback2D}
              />
            </Suspense>
          );
        })()}
      </div>

      {/* Guiding Questions to Investigate */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#B8FF00]" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#8DA391]">
            INQUIRY VECTORS TO TEST
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.guidingQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0D1117] border border-white/10 shadow-sm flex items-start gap-3 text-xs sm:text-sm text-[#F3F4EC] font-medium leading-relaxed"
            >
              <span className="w-5 h-5 rounded-md bg-[#B8FF00]/15 text-[#B8FF00] border border-[#B8FF00]/30 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ?
              </span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What to Observe & Core Discovery Insight (Dual Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What to Observe */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DC] text-[#171C18] space-y-3 shadow-sm">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            <Eye className="w-4 h-4 text-[#080A0E]" />
            <span>KEY DYNAMICS TO OBSERVE</span>
          </div>
          <ul className="space-y-2.5 text-xs text-[#171C18]">
            {content.whatToObserve.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#080A0E] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Discovery Insight */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D1117] text-[#F3F4EC] space-y-2 border border-white/10 shadow-lg corner-reticle">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
            <Sparkles className="w-4 h-4 text-[#B8FF00]" />
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
