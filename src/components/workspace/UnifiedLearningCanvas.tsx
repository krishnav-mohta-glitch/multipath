import React, { useState } from 'react';
import type { Topic } from '../../types/topic';
import { useAuth } from '../../context/AuthContext';
import { ProfessorDaveExplainsView } from './paths/ProfessorDaveExplainsView';
import { ExploreExperimentView } from './paths/ExploreExperimentView';

interface UnifiedLearningCanvasProps {
  topic: Topic;
}

const AMBIENT_PASSION_STYLES: Record<string, { glow: string; border: string; badge: string; text: string }> = {
  football: {
    glow: 'from-[#0A1A12]/50 via-[#08120C]/30 to-[#080A0E]',
    border: 'border-[#10B981]/25',
    badge: 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30',
    text: 'text-[#34D399]',
  },
  gaming: {
    glow: 'from-[#06B6D4]/15 via-[#8B5CF6]/10 to-[#080A0E]',
    border: 'border-[#06B6D4]/30',
    badge: 'bg-[#06B6D4]/15 text-[#67E8F9] border-[#06B6D4]/30',
    text: 'text-[#67E8F9]',
  },
  cricket: {
    glow: 'from-[#F59E0B]/15 via-[#10B981]/10 to-[#080A0E]',
    border: 'border-[#F59E0B]/30',
    badge: 'bg-[#F59E0B]/15 text-[#FCD34D] border-[#F59E0B]/30',
    text: 'text-[#FCD34D]',
  },
  space: {
    glow: 'from-[#818CF8]/15 via-[#C084FC]/10 to-[#080A0E]',
    border: 'border-[#818CF8]/30',
    badge: 'bg-[#818CF8]/15 text-[#A5B4FC] border-[#818CF8]/30',
    text: 'text-[#A5B4FC]',
  },
  music: {
    glow: 'from-[#F472B6]/15 via-[#38BDF8]/10 to-[#080A0E]',
    border: 'border-[#F472B6]/30',
    badge: 'bg-[#F472B6]/15 text-[#F472B6] border-[#F472B6]/30',
    text: 'text-[#F472B6]',
  },
  robotics: {
    glow: 'from-[#2DD4BF]/15 via-[#F59E0B]/10 to-[#080A0E]',
    border: 'border-[#2DD4BF]/30',
    badge: 'bg-[#2DD4BF]/15 text-[#5EEAD4] border-[#2DD4BF]/30',
    text: 'text-[#5EEAD4]',
  },
};

export const UnifiedLearningCanvas: React.FC<UnifiedLearningCanvasProps> = ({ topic }) => {
  const { profile, openPassionModal } = useAuth();

  // Active passion (default to student profile passion, or 'football')
  const [activePassionId, setActivePassionId] = useState<string>(profile?.passion || 'football');
  const ambient = AMBIENT_PASSION_STYLES[activePassionId] || AMBIENT_PASSION_STYLES.football;

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
                <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-md border font-bold uppercase tracking-wider ${ambient.badge}`}>
                  {activePassionId} Lens
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

        {/* Clean, Decluttered Reading Surface with Ambient Theme Sheen */}
        <div className={`bg-gradient-to-br ${ambient.glow} backdrop-blur-md rounded-3xl border ${ambient.border} p-6 sm:p-10 md:p-12 shadow-2xl transition-all duration-300`}>
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

        {/* Hands-On Simulation Workbench with Ambient Theme Accent */}
        <div className={`bg-[#0D1117] rounded-3xl border ${ambient.border} p-6 sm:p-8 shadow-2xl transition-all duration-300`}>
          <ExploreExperimentView content={topic.paths['explore-experiment']} topic={topic} />
        </div>
      </section>

    </div>
  );
};
