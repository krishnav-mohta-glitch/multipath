import React, { useState } from 'react';
import type { Topic } from '../../types/topic';
import { useAuth } from '../../context/AuthContext';
import { ProfessorDaveExplainsView } from './paths/ProfessorDaveExplainsView';
import { ExploreExperimentView } from './paths/ExploreExperimentView';

interface UnifiedLearningCanvasProps {
  topic: Topic;
}

export const UnifiedLearningCanvas: React.FC<UnifiedLearningCanvasProps> = ({ topic }) => {
  const { profile, openPassionModal } = useAuth();

  // Active passion (default to student profile passion, or 'football')
  const [activePassionId, setActivePassionId] = useState<string>(profile?.passion || 'football');

  return (
    <div className="space-y-16">
      
      {/* =================================================================== */}
      {/* STAGE 1: THE INTUITIVE STORY (PROFESSOR DAVE EXPLAINS • ELI5)       */}
      {/* =================================================================== */}
      <section id="stage-intuitive-story" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#B8FF00] text-[#080A0E] flex items-center justify-center font-mono font-black text-sm shadow-md">
              01
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight break-words">
                  The Intuitive Story
                </h2>
                <span className="font-mono text-[10px] text-[#B8FF00] bg-[#B8FF00]/10 border border-[#B8FF00]/25 px-2 py-0.5 rounded-md">
                  Professor Dave Explains &bull; {activePassionId.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-[#8DA391] font-mono break-words">
                ELI5 conceptual breakdown &bull; Zero clutter &bull; Grounded in real-world {activePassionId} intuition
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#8DA391] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
            Stage 1 • Intuitive Foundation
          </span>
        </div>

        {/* Clean, Decluttered Reading Surface */}
        <div className="bg-[#080A0E]/80 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl">
          <ProfessorDaveExplainsView 
            topic={topic}
            activePassionId={activePassionId}
            onSelectPassion={setActivePassionId}
            onOpenMorePassions={openPassionModal}
          />
        </div>
      </section>

      {/* =================================================================== */}
      {/* STAGE 2: INTERACTIVE SIMULATION LAB (EXPLORE & EXPERIMENT)          */}
      {/* =================================================================== */}
      <section id="stage-interactive-lab" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#70E000] text-[#080A0E] flex items-center justify-center font-mono font-black text-sm shadow-md">
              02
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight break-words">
                Interactive Simulation Lab
              </h2>
              <p className="text-xs text-[#8DA391] font-mono break-words">
                Hands-on simulation workbench &bull; Adjust variables and observe physical principles live
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#8DA391] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
            Stage 2 • Experimental Workbench
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
