import type { Topic } from '../../types/topic';

export type VisualizerMode = '3d' | '2d';

export interface BaseVisualizerProps {
  topic: Topic;
  className?: string;
}

export interface PresetCard<TState> {
  id: string;
  title: string;
  description: string;
  state: TState;
  expectedOutcome: string;
}
