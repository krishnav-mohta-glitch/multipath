export type LearningPathId =
  | 'structured-explanation'
  | 'visual-learning'
  | 'examples-applications'
  | 'explore-experiment';

export interface LearningPathMeta {
  id: LearningPathId;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  bestFor: string;
  iconName: string;
  colorScheme: {
    accent: string;
    border: string;
    bg: string;
    pillBg: string;
    pillText: string;
  };
}

// -------------------------------------------------------------
// 1. Structured Explanation Structure
// -------------------------------------------------------------
export interface ExplanationCallout {
  type: 'note' | 'axiom' | 'insight' | 'warning';
  title: string;
  text: string;
}

export interface ExplanationSection {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  callout?: ExplanationCallout;
}

export interface StructuredExplanationContent {
  introduction: string;
  sections: ExplanationSection[];
  summaryTakeaways: string[];
  reflectionPrompt: string;
}

// -------------------------------------------------------------
// 2. Visual Learning Structure
// -------------------------------------------------------------
export interface DiagramComponent {
  id: string;
  name: string;
  role: string;
  description: string;
  color?: string;
  badge?: string;
}

export interface ProcessFlowStep {
  step: number;
  label: string;
  detail: string;
  annotation?: string;
}

export interface VisualLayer {
  layerId: string;
  label: string;
  description: string;
  highlightedComponentIds: string[];
}

export interface VisualLearningContent {
  visualType: 'diagram' | 'process-flow' | 'anatomy' | 'matrix' | 'spectrum';
  headline: string;
  caption: string;
  diagramTitle: string;
  diagramDescription: string;
  components: DiagramComponent[];
  processFlow?: ProcessFlowStep[];
  interactiveLayers?: VisualLayer[];
  spatialAnalogy?: {
    metaphor: string;
    explanation: string;
  };
  visualSummary: string;
}

// -------------------------------------------------------------
// 3. Examples & Applications Structure
// -------------------------------------------------------------
export interface WorkedExampleStep {
  stepNumber: number;
  explanation: string;
  work: string;
  annotation?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  contextOrPrompt: string;
  steps: WorkedExampleStep[];
  finalResult: string;
  verificationTip: string;
}

export interface RealWorldApplication {
  domain: string;
  title: string;
  context: string;
  realWorldScenario: string;
  impactMetric: string;
}

export interface ExamplesApplicationsContent {
  overview: string;
  workedExamples: WorkedExample[];
  applications: RealWorldApplication[];
  selfCheckExercise: {
    question: string;
    hint: string;
    solution: string;
  };
}

// -------------------------------------------------------------
// 4. Explore & Experiment Structure
// -------------------------------------------------------------
export interface ExperimentVariable {
  id: string;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  options?: { value: number | string; label: string }[];
}

export interface ExploreExperimentContent {
  activityTitle: string;
  objective: string;
  instructions: string;
  experimentType: 'linear-equations' | 'photosynthesis' | 'french-revolution' | 'metaphors' | 'generic';
  variables: ExperimentVariable[];
  guidingQuestions: string[];
  whatToObserve: string[];
  takeawayInsight: string;
}

// -------------------------------------------------------------
// Master Container of Path Content
// -------------------------------------------------------------
export interface TopicPathContent {
  'structured-explanation': StructuredExplanationContent;
  'visual-learning': VisualLearningContent;
  'examples-applications': ExamplesApplicationsContent;
  'explore-experiment': ExploreExperimentContent;
}
