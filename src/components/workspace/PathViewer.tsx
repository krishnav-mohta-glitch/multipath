import React from 'react';
import type { Topic } from '../../types/topic';
import type { LearningPathId } from '../../types/learningPath';
import { StructuredExplanationView } from './paths/StructuredExplanationView';
import { VisualLearningView } from './paths/VisualLearningView';
import { ExamplesApplicationsView } from './paths/ExamplesApplicationsView';
import { ExploreExperimentView } from './paths/ExploreExperimentView';
import { LEARNING_PATHS } from '../../data/learningPaths';
import { ArrowRight, RotateCw } from 'lucide-react';

interface PathViewerProps {
  topic: Topic;
  activePath: LearningPathId;
  onSwitchPath: (pathId: LearningPathId) => void;
}

export const PathViewer: React.FC<PathViewerProps> = ({
  topic,
  activePath,
  onSwitchPath,
}) => {
  const meta = LEARNING_PATHS[activePath];

  // Helper to recommend the next complementary path
  const pathProgression: Record<LearningPathId, LearningPathId> = {
    'structured-explanation': 'visual-learning',
    'visual-learning': 'examples-applications',
    'examples-applications': 'explore-experiment',
    'explore-experiment': 'structured-explanation',
  };

  const nextPathId = pathProgression[activePath];
  const nextMeta = LEARNING_PATHS[nextPathId];

  return (
    <div className="bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] shadow-xs overflow-hidden">
      
      {/* Path Header Banner */}
      <div className="p-6 sm:p-7 border-b border-[#DFE2D7] bg-[#F1F1E9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#5E7A65]">
              PERSPECTIVE VIEW
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#171C18] tracking-tight mt-0.5">
            {meta.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#171C18]/80 mt-1 max-w-2xl leading-relaxed">
            {meta.description}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => onSwitchPath(nextPathId)}
            className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold text-[#171C18] bg-[#E8EAE1] hover:bg-[#DFE2D7] border border-[#DFE2D7] rounded-xl transition-all shadow-2xs group"
          >
            <span>NEXT: {nextMeta.shortTitle.toUpperCase()}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#111714] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Path Content Area */}
      <div className="p-6 sm:p-8 bg-[#F1F1E9]">
        {activePath === 'structured-explanation' && (
          <StructuredExplanationView content={topic.paths['structured-explanation']} />
        )}
        {activePath === 'visual-learning' && (
          <VisualLearningView content={topic.paths['visual-learning']} />
        )}
        {activePath === 'examples-applications' && (
          <ExamplesApplicationsView content={topic.paths['examples-applications']} />
        )}
        {activePath === 'explore-experiment' && (
          <ExploreExperimentView content={topic.paths['explore-experiment']} />
        )}
      </div>

      {/* Path Bottom Callout: Cross-Pollinate */}
      <div className="p-6 bg-[#E8EAE1] border-t border-[#DFE2D7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#DFE2D7] text-[#111714] flex items-center justify-center shrink-0">
            <RotateCw className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#171C18]">
              SYNTHESISE MULTIPLE MODES
            </h4>
            <p className="text-[11px] text-[#5E7A65]">
              Cross-comparing paths builds invariant representation in memory.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {topic.availablePaths
            .filter((p) => p !== activePath)
            .map((p) => (
              <button
                key={p}
                onClick={() => onSwitchPath(p)}
                className="px-3 py-1.5 font-mono text-xs font-medium bg-[#F1F1E9] hover:bg-white border border-[#DFE2D7] text-[#171C18] rounded-lg transition-colors"
              >
                {LEARNING_PATHS[p].shortTitle.toUpperCase()}
              </button>
            ))}
        </div>
      </div>

    </div>
  );
};
