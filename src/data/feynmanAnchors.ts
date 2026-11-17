import type { FeynmanAnchor } from '../types/topic';
import { MATH_ANCHORS } from './anchors/mathAnchors';
import { PHYSICS_ANCHORS } from './anchors/physicsAnchors';
import { CHEM_ANCHORS } from './anchors/chemAnchors';
import { BIO_ANCHORS } from './anchors/bioAnchors';
import { CS_ANCHORS } from './anchors/csAnchors';
import { HUMANITIES_ANCHORS } from './anchors/humanitiesAnchors';
import { CLASS_EXPANSION_ANCHORS } from './anchors/classExpansionAnchors';

export const FEYNMAN_ANCHORS: Record<string, FeynmanAnchor> = {
  ...MATH_ANCHORS,
  ...PHYSICS_ANCHORS,
  ...CHEM_ANCHORS,
  ...BIO_ANCHORS,
  ...CS_ANCHORS,
  ...HUMANITIES_ANCHORS,
  ...CLASS_EXPANSION_ANCHORS
};

export const getFeynmanAnchor = (topicId: string): FeynmanAnchor | undefined => {
  return FEYNMAN_ANCHORS[topicId];
};
