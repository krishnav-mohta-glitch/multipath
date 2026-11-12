/**
 * TypeScript Types for MULTIPATH Guided Discovery Engine
 */

export type DiscoveryEvaluation = 'correct' | 'partially-correct' | 'incorrect' | 'insufficient-info' | null;

export interface DiscoveryMessage {
  id: string;
  role: 'tutor' | 'student';
  content: string;
  nextQuestion?: string;
  evaluation?: DiscoveryEvaluation;
  timestamp: string;
  isHint?: boolean;
  hintLevel?: number;
}

export interface DiscoverySolution {
  summary: string;
  steps: string[];
  keyTakeaway: string;
  finalAnswer: string;
}

export interface DiscoverySession {
  id: string;
  topicId: string;
  subject: string;
  topicTitle: string;
  problemContext: string;
  hintLevel: number;
  turnCount: number;
  history: DiscoveryMessage[];
  isCompleted: boolean;
  createdAt: string;
}

export interface StartSessionResponse {
  sessionId: string;
  session: DiscoverySession;
  firstQuestion: string;
  isDemonstrationMode: boolean;
  modeNotice: string;
}

export interface RespondResponse {
  evaluation: DiscoveryEvaluation;
  feedback: string;
  nextQuestion: string;
  isGoalReached: boolean;
  isDemonstrationMode: boolean;
  modeNotice: string;
  turnCount: number;
  history: DiscoveryMessage[];
}

export interface HintResponse {
  hintLevel: number;
  hint: string;
  isDemonstrationMode: boolean;
  remainingHints: number;
}

export interface SolutionResponse {
  isDemonstrationMode: boolean;
  solution: DiscoverySolution;
}
