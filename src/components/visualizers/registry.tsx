import type { ComponentType } from 'react';
import type { Topic } from '../../types/topic';
import type { BaseVisualizerProps } from './types';
import { OpticalLabVisualizer } from './OpticalLabVisualizer';
import { ThermalLabVisualizer } from './ThermalLabVisualizer';
import { MechanicsLabVisualizer } from './MechanicsLabVisualizer';
import { HistoricalCausalMapVisualizer } from './HistoricalCausalMapVisualizer';
import { MetaphorWorkbenchVisualizer } from './MetaphorWorkbenchVisualizer';
import { ConceptSandboxVisualizer } from './ConceptSandboxVisualizer';
import { LinearEquationsAdapter, PhotosynthesisAdapter } from './LegacyAdapters';

export type VisualizerComponent = ComponentType<BaseVisualizerProps>;

export interface VisualizerMeta {
  name: string;
  discipline: string;
  component: VisualizerComponent;
  is3DCapable: boolean;
}

export const VISUALIZER_REGISTRY: Record<string, VisualizerMeta> = {
  // 1. Light, Shadows & Reflections (CBSE & CISCE Class 6-8 Physics)
  'sci-6-light-shadows': {
    name: 'Optical Reflection & Shadow Formation Laboratory',
    discipline: 'Physics & Optics',
    component: OpticalLabVisualizer,
    is3DCapable: true,
  },

  // 2. Heat Transfer & Conduction (CBSE & CISCE Class 7-9 Physics)
  'sci-7-heat-transfer': {
    name: 'Thermal Conduction & Fourier Heat Flow Chamber',
    discipline: 'Physics & Thermodynamics',
    component: ThermalLabVisualizer,
    is3DCapable: true,
  },

  // 3. Force and Pressure Dynamics (CBSE & CISCE Class 8-9 Physics)
  'sci-8-force-pressure': {
    name: 'Force, Pressure & Kinetic Friction Dynamics Simulator',
    discipline: 'Physics & Mechanics',
    component: MechanicsLabVisualizer,
    is3DCapable: true,
  },

  // 4. Linear Equations Conservation of Equality (Math)
  'math-linear-equations': {
    name: 'Conservation of Equality Pan Balance',
    discipline: 'Mathematics & Mechanics',
    component: LinearEquationsAdapter,
    is3DCapable: true,
  },
  'math-8-linear-equations-1var': {
    name: 'Conservation of Equality Pan Balance',
    discipline: 'Mathematics & Mechanics',
    component: LinearEquationsAdapter,
    is3DCapable: true,
  },

  // 5. Photosynthesis Photochemical Chamber (Biology)
  'bio-photosynthesis': {
    name: 'Photochemical Reaction Chamber & Action Spectrum',
    discipline: 'Biology & Biochemistry',
    component: PhotosynthesisAdapter,
    is3DCapable: true,
  },

  // 6. French Revolution Causal Flow (History)
  'hist-french-revolution': {
    name: 'Ancien Régime Causal Flow Map',
    discipline: 'History & Political Science',
    component: HistoricalCausalMapVisualizer,
    is3DCapable: false,
  },

  // 7. Understanding Metaphors (Literature)
  'eng-understanding-metaphors': {
    name: 'Semantic Metaphor Workbench',
    discipline: 'Literature & Linguistics',
    component: MetaphorWorkbenchVisualizer,
    is3DCapable: false,
  },
};

export function getVisualizerForTopic(topic: Topic): VisualizerMeta {
  // Direct topic ID match
  if (VISUALIZER_REGISTRY[topic.id]) {
    return VISUALIZER_REGISTRY[topic.id];
  }

  // Check experimentType on the explore-experiment path
  const expType = topic.paths?.['explore-experiment']?.experimentType;
  if (expType === 'linear-equations') {
    return VISUALIZER_REGISTRY['math-linear-equations'];
  }
  if (expType === 'photosynthesis') {
    return VISUALIZER_REGISTRY['bio-photosynthesis'];
  }
  if (expType === 'french-revolution') {
    return VISUALIZER_REGISTRY['hist-french-revolution'];
  }
  if (expType === 'metaphors') {
    return VISUALIZER_REGISTRY['eng-understanding-metaphors'];
  }

  // Clean generic concept parameter sandbox fallback for unmapped topics
  return {
    name: `${topic.title} Interactive Sandbox`,
    discipline: topic.subjectId.toUpperCase(),
    component: ConceptSandboxVisualizer,
    is3DCapable: false,
  };
}
