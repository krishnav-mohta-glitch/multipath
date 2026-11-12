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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
      
      {/* Top Banner: Prompt & Active Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Your Learning Path
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Switch between genuinely different learning approaches without losing your place in this topic.
          </p>
        </div>

        <div className="text-xs text-slate-600 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 self-start sm:self-auto">
          Active Approach: <strong className="text-slate-900">{activeMeta.title}</strong>
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
              className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-brand-500/20'
                  : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-500 text-white">
                      Active
                    </span>
                  )}
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {meta.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {meta.tagline}
                  </p>
                </div>
              </div>

              <div className={`text-[10px] font-medium pt-2 border-t ${
                isSelected ? 'border-slate-800 text-brand-300' : 'border-slate-200/80 text-slate-500'
              }`}>
                Best for: {meta.bestFor}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
