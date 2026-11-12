/**
 * TypeScript Definitions for MULTIPATH Phase 4 Feynman Mode
 */

export type FeynmanConceptStatus = 'demonstrated' | 'partly-demonstrated' | 'not-yet-demonstrated';

export interface FeynmanConceptAssessment {
  id: string;
  name: string;
  status: FeynmanConceptStatus;
  evidence: string;
  reasoning: string;
}

export interface FeynmanDimension {
  dimension: 'Accuracy' | 'Completeness' | 'Conceptual Understanding' | 'Relationships Between Concepts' | 'Use of Important Terminology' | 'Quality of Reasoning' | string;
  rating: string;
  feedback: string;
}

export interface FeynmanIncorrectStatement {
  conceptName: string;
  studentQuote: string;
  correction: string;
  misconception: string;
}

export interface FeynmanKnowledgeGapReport {
  conceptsUnderstoodWell: Array<{
    name: string;
    evidence: string;
    praise: string;
  }>;
  conceptsNeedingClarification: Array<{
    name: string;
    evidence: string;
    issue: string;
  }>;
  incorrectStatements: FeynmanIncorrectStatement[];
  missingRelationships: Array<{
    name: string;
    description: string;
  }>;
  recommendations: string[];
}

export interface AdaptiveMediaPayload {
  version: string;
  phase: number;
  topicId: string;
  topicTitle: string;
  subject: string;
  generatedAt: string;
  sessionSummary: {
    turnCount: number;
    demonstratedConceptsCount: number;
    partlyDemonstratedCount: number;
    notYetDemonstratedCount: number;
  };
  strengths: string[];
  identifiedGaps: Array<{
    conceptId: string;
    conceptName: string;
    status: FeynmanConceptStatus;
    studentEvidence: string;
    isIncorrectStatement: boolean;
    correctionRequired: string | null;
    targetLearningObjective: string;
    remediationStrategy: string;
    recommendedExamples: string[];
    subjectSpecificContext: string;
  }>;
  missingRelationships: Array<{
    name: string;
    description: string;
  }>;
  incorrectStatements: FeynmanIncorrectStatement[];
  recommendedNextSteps: string[];
  readyForMediaGeneration: boolean;
}

export interface FeynmanMessage {
  id: string;
  role: 'learner' | 'student';
  speakerName: string;
  content: string;
  curiousQuestion?: string;
  tone?: string;
  timestamp: string;
}

export interface FeynmanAssessmentData {
  dimensions: FeynmanDimension[];
  conceptAssessments: FeynmanConceptAssessment[];
  knowledgeGapReport: FeynmanKnowledgeGapReport;
  evaluatedAt: string;
}

export interface FeynmanSession {
  id: string;
  topicId: string;
  subject: string;
  topicTitle: string;
  learningObjectives: string[];
  studentExplanations: string[];
  history: FeynmanMessage[];
  assessment?: FeynmanAssessmentData | null;
  adaptiveMediaPayload?: AdaptiveMediaPayload | null;
  isCompleted: boolean;
  createdAt?: string;
}

export interface StartFeynmanResponse {
  sessionId: string;
  session: FeynmanSession;
  isDemonstrationMode: boolean;
  modeNotice: string;
}

export interface FeynmanTurnResponse {
  sessionId: string;
  learnerResponse: FeynmanMessage;
  history: FeynmanMessage[];
  isDemonstrationMode: boolean;
  modeNotice: string;
  turnCount: number;
  session?: FeynmanSession;
}

export interface FeynmanAssessmentResponse {
  sessionId: string;
  isDemonstrationMode: boolean;
  modeNotice: string;
  assessment: FeynmanAssessmentData;
  adaptiveMediaPayload: AdaptiveMediaPayload;
  session?: FeynmanSession;
}
