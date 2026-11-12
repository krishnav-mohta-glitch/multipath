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
    <div className="bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] shadow-xs p-6 sm:p-7 space-y-5">
      
      {/* Top Banner: Prompt & Active Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DFE2D7]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#111714]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
              PARALLEL EPISTEMIC MODES
            </span>
          </div>
          <p className="text-xs text-[#171C18]/80">
            Switch perspective without losing continuity. Each path approaches the exact same core invariants.
          </p>
        </div>

        <div className="font-mono text-xs text-[#171C18] px-3 py-1.5 rounded-xl bg-[#F1F1E9] border border-[#DFE2D7] self-start sm:self-auto flex items-center gap-2">
          <span className="text-[#5E7A65]">ACTIVE:</span>
          <strong className="text-[#111714] font-bold">{activeMeta.title.toUpperCase()}</strong>
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
                  ? 'bg-[#111714] text-[#F3F4EC] border-[#C8F36B] shadow-md ring-1 ring-[#C8F36B]/30'
                  : 'bg-[#F1F1E9] hover:bg-white border-[#DFE2D7] hover:border-[#8DA391] text-[#171C18]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#C8F36B] text-[#111714]' : 'bg-[#E8EAE1] text-[#171C18] group-hover:bg-[#DFE2D7]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C8F36B] text-[#111714] flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#111714]" />
                      ACTIVE
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className={`font-display text-sm font-bold tracking-tight ${isSelected ? 'text-[#F3F4EC]' : 'text-[#171C18]'}`}>
                    {meta.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                    isSelected ? 'text-[#8DA391]' : 'text-[#171C18]/70'
                  }`}>
                    {meta.tagline}
                  </p>
                </div>
              </div>

              <div className={`font-mono text-[10px] pt-2 border-t ${
                isSelected ? 'border-white/10 text-[#C8F36B]' : 'border-[#DFE2D7] text-[#5E7A65]'
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
