/**
 * TypeScript Definitions for MULTIPATH Phase 6: Learning Progress and Resource Library
 */

import type { LearningPathId } from './learningPath';
import type { FeynmanAssessmentData, FeynmanConceptStatus } from './feynman';
import type { MediaType } from './media';
import type { SubjectId } from './subject';

export type LearningActivityType =
  | 'topic-opened'
  | 'path-changed'
  | 'discovery-session'
  | 'feynman-explanation'
  | 'feynman-assessed'
  | 'media-generated'
  | 'resource-deleted';

export interface LearningActivityItem {
  id: string;
  timestamp: string;
  type: LearningActivityType;
  topicId: string;
  topicTitle: string;
  subjectId: SubjectId;
  pathId?: LearningPathId;
  details: string;
  mediaFormat?: MediaType;
}

export interface TopicHistoryRecord {
  topicId: string;
  subjectId: SubjectId;
  topicTitle: string;
  visitCount: number;
  firstVisited: string;
  lastVisited: string;
  pathsUsed: LearningPathId[];
  discoveryCompletedCount: number;
  feynmanAssessments: Array<{
    assessment: FeynmanAssessmentData;
    recordedAt: string;
  }>;
  generatedResourceIds: string[];
}

export interface ConceptTransition {
  conceptId: string;
  conceptName: string;
  previousStatus: FeynmanConceptStatus;
  currentStatus: FeynmanConceptStatus;
  previousEvidence: string;
  currentEvidence: string;
  improved: boolean;
  notes: string;
}

export interface ReassessmentComparison {
  topicId: string;
  topicTitle: string;
  subjectId: SubjectId;
  previousDate: string;
  currentDate: string;
  conceptTransitions: ConceptTransition[];
  resolvedMisconceptions: Array<{
    statement: string;
    resolvedEvidence: string;
  }>;
  remainingGaps: string[];
  newlyDemonstrated: string[];
}

export interface StoragePrivacyNotice {
  location: string;
  description: string;
  dataTypes: string[];
  cloudStorageRequired: boolean;
}
