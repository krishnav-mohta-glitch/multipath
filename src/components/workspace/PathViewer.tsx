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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Path Header Banner */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-600">
              Active Learning Approach
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            {meta.title}
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            {meta.description}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => onSwitchPath(nextPathId)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-2xs"
          >
            <span>Next Approach: {nextMeta.shortTitle}</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
          </button>
        </div>
      </div>

      {/* Main Path Content Area */}
      <div className="p-6 sm:p-8">
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
      <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
            <RotateCw className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Reinforce Across Multiple Approaches
            </h4>
            <p className="text-[11px] text-slate-500">
              Switching between different approaches helps consolidate mental models and exposes knowledge gaps.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {topic.availablePaths
            .filter((p) => p !== activePath)
            .map((p) => (
              <button
                key={p}
                onClick={() => onSwitchPath(p)}
                className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-200/70 border border-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                {LEARNING_PATHS[p].shortTitle}
              </button>
            ))}
        </div>
      </div>

    </div>
  );
};
