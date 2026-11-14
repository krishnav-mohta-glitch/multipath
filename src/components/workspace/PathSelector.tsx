import React from 'react';
import { BookOpen, Eye, Wrench, FlaskConical, Layers } from 'lucide-react';
import { LEARNING_PATHS } from '../../data/learningPaths';
import type { LearningPathId } from '../../types/learningPath';

interface PathSelectorProps {
  activePath: LearningPathId;
  onSelectPath: (pathId: LearningPathId) => void;
  availablePaths: LearningPathId[];
}

export const PathSelector: React.FC<PathSelectorProps> = ({
  activePath,
  onSelectPath,
  availablePaths,
}) => {
  const iconMap: Record<LearningPathId, React.FC<{ className?: string }>> = {
    'structured-explanation': BookOpen,
    'visual-learning': Eye,
    'examples-applications': Wrench,
    'explore-experiment': FlaskConical,
  };

  const activeMeta = LEARNING_PATHS[activePath];

  return (
    <div className="bg-[#0D1117] text-[#F3F4EC] rounded-2xl border border-white/10 shadow-xl p-6 sm:p-7 space-y-5 corner-reticle">
      
      {/* Top Banner: Prompt & Active Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#B8FF00]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8DA391]">
              PARALLEL EPISTEMIC MODES
            </span>
          </div>
          <p className="text-xs text-[#8DA391]">
            Switch perspective without losing continuity. Each path approaches the exact same core invariants.
          </p>
        </div>

        <div className="font-mono text-xs text-[#8DA391] px-3.5 py-1.5 rounded-xl bg-[#080A0E] border border-white/10 self-start sm:self-auto flex items-center gap-2">
          <span>ACTIVE:</span>
          <strong className="text-[#B8FF00] font-bold">{activeMeta.title.toUpperCase()}</strong>
        </div>
      </div>

      {/* 4 Path Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {availablePaths.map((pathId) => {
          const meta = LEARNING_PATHS[pathId];
          const Icon = iconMap[pathId];
          const isSelected = activePath === pathId;

          return (
            <button
              key={pathId}
              onClick={() => onSelectPath(pathId)}
              className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 group ${
                isSelected
                  ? 'bg-[#080A0E] text-white border-[#B8FF00] shadow-lg ring-1 ring-[#B8FF00]/40'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#8DA391] hover:text-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#B8FF00] text-[#080A0E]' : 'bg-white/10 text-[#8DA391] group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#B8FF00] text-[#080A0E] flex items-center gap-1 font-bold">
                      <span className="w-1 h-1 rounded-full bg-[#080A0E]" />
                      ACTIVE
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className={`font-display text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-[#F3F4EC]'}`}>
                    {meta.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                    isSelected ? 'text-[#8DA391]' : 'text-[#8DA391]/80'
                  }`}>
                    {meta.tagline}
                  </p>
                </div>
              </div>

              <div className={`font-mono text-[10px] pt-2 border-t ${
                isSelected ? 'border-white/10 text-[#B8FF00]' : 'border-white/5 text-[#8DA391]'
              }`}>
                FOR: {meta.bestFor.toUpperCase()}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
