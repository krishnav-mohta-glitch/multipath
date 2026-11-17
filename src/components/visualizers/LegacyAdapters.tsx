import React from 'react';
import type { BaseVisualizerProps } from './types';
import { LinearEquationsExperiment } from '../workspace/experiments/LinearEquationsExperiment';
import { PhotosynthesisExperiment } from '../workspace/experiments/PhotosynthesisExperiment';

export const LinearEquationsAdapter: React.FC<BaseVisualizerProps> = () => {
  return <LinearEquationsExperiment />;
};

export const PhotosynthesisAdapter: React.FC<BaseVisualizerProps> = () => {
  return <PhotosynthesisExperiment />;
};
