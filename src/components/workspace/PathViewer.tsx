import React from 'react';
import type { Topic } from '../../types/topic';
import type { LearningPathId } from '../../types/learningPath';
import { StructuredExplanationView } from './paths/StructuredExplanationView';
import { VisualLearningView } from './paths/VisualLearningView';
import { ExamplesApplicationsView } from './paths/ExamplesApplicationsView';
import { ExploreExperimentView } from './paths/ExploreExperimentView';
import { LEARNING_PATHS } from '../../data/learningPaths';
import { ArrowRight, RotateCw, Compass } from 'lucide-react';

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
    <div className="bg-[#0D1117] rounded-2xl border border-white/10 shadow-2xl overflow-hidden corner-reticle">
      
      {/* Path Header Banner */}
      <div className="p-6 sm:p-7 border-b border-white/10 bg-[#080A0E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#B8FF00]" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#B8FF00]">
              EPISTEMIC PERSPECTIVE VIEW
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
            {meta.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#8DA391] mt-1 max-w-2xl leading-relaxed">
            {meta.description}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => onSwitchPath(nextPathId)}
            className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold text-white bg-white/5 hover:bg-[#B8FF00] hover:text-[#080A0E] border border-white/10 hover:border-[#B8FF00] rounded-xl transition-all shadow-sm group"
          >
            <span>NEXT: {nextMeta.shortTitle.toUpperCase()}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B8FF00] group-hover:text-[#080A0E] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Path Content Area */}
      <div className="p-6 sm:p-8 bg-[#0D1117]">
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
      <div className="p-6 bg-[#080A0E] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-[#B8FF00] flex items-center justify-center shrink-0">
            <RotateCw className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              SYNTHESISE PARALLEL PATHS
            </h4>
            <p className="text-[11px] text-[#8DA391]">
              Cross-comparing perspectives builds invariant representations in cognitive memory.
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
                className="px-3 py-1.5 font-mono text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B8FF00]/40 text-[#8DA391] hover:text-[#B8FF00] rounded-lg transition-colors"
              >
                {LEARNING_PATHS[p].shortTitle.toUpperCase()}
              </button>
            ))}
        </div>
      </div>

    </div>
  );
};
