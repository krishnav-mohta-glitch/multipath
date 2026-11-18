import type { SubjectId } from './subject';
import type { LearningPathId } from './learningPath';

export type SimplicityMode = 'eli5' | 'standard' | 'formal';

export type SubjectComfortLevel = 'comfortable' | 'somewhat' | 'help';

export interface StudentLearningProfile {
  interests: string[];
  hobbies: string[];
  learningPreferences: string[];
  subjectFamiliarity?: Record<string, SubjectComfortLevel>;
  activeInterest: string;
  simplicityMode?: SimplicityMode;
}

export interface InterestDomain {
  id: string;
  name: string;
  icon: string;
  badge: string;
  tagline: string;
  theme: {
    glow: string;
    border: string;
    badge: string;
    text: string;
    accent: string;
  };
  sampleConnection: string;
}

export interface SandboxParameter {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export interface SandboxTelemetry {
  label: string;
  value: number | string;
  unit: string;
  badge?: string;
  feedback?: string;
}

export interface InteractiveSandboxModel {
  title: string;
  scenarioDescription: string;
  parameters: SandboxParameter[];
  formulaDisplay: string;
  calculateTelemetry: (params: Record<string, number>) => {
    metrics: SandboxTelemetry[];
    outcomeMessage: string;
    isSafeOrOptimal: boolean;
  };
}

export interface UnderstandingCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  transferQuestion: string;
  transferAnswer: string;
}

export interface RealWorldApplication {
  title: string;
  domain: string;
  description: string;
  mechanism: string;
  isInterestConnected: boolean;
}

export interface PersonalizedConceptExperience {
  topicId: string;
  topicTitle: string;
  subjectId: SubjectId | string;
  interestId: string;
  interestName: string;
  interestIcon: string;
  isPureAcademic: boolean;

  // A. Personalised Concept Introduction
  intro: {
    headline: string;
    hook: string;
    familiarScenario: string;
    intuitiveBridge: string;
  };

  // B. The Actual Academic Concept
  academicConcept: {
    formalDefinition: string;
    whyItWorks: string;
    governingFormulas: string[];
    keyTerms: { term: string; definition: string }[];
    conditionsAndAssumptions: string[];
    commonMisconceptions: { myth: string; reality: string }[];
  };

  // C. Interactive Interest-Themed Experience
  sandbox: InteractiveSandboxModel;

  // D. Visual Explanation
  visualExplanation: {
    type: '3d' | '2d-interactive' | 'schematic' | 'graph';
    title: string;
    caption: string;
    modelReference?: string;
  };

  // E. Real-World Applications
  realWorldApplications: RealWorldApplication[];

  // F. Test Your Understanding
  understandingChecks: UnderstandingCheckQuestion[];

  // G. Apply Beyond Your Interest (Exam & Transfer Context)
  transferBeyondInterest: {
    conventionalContext: string;
    examQuestionScenario: string;
    sampleProblem: string;
    takeawayInsight: string;
  };
}

export interface PersonalizedLearningContext {
  topicId: string;
  subjectId: string;
  classLevel?: number | string;
  board?: string;
  selectedInterest: string;
  learningPerspective?: LearningPathId;
  simplicityMode?: SimplicityMode;
}
