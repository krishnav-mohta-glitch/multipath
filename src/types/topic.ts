import type { SubjectId } from './subject';
import type { LearningPathId, TopicPathContent } from './learningPath';

export type DifficultyLevel = 'Foundational' | 'Intermediate' | 'Advanced';

export interface Topic {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  subjectId: SubjectId;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  overview: string;
  whyItMatters: string;
  learningObjectives: string[];
  coreQuestions: string[];
  prerequisites: string[];
  keyTerms: {
    term: string;
    definition: string;
  }[];
  paths: TopicPathContent;
  availablePaths: LearningPathId[];
}
