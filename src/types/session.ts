import type { LearningPathId } from './learningPath';

export type NavTab = 'home' | 'library' | 'workspace' | 'mylearning';

export interface RecentTopicVisit {
  topicId: string;
  lastVisited: string;
  lastPathUsed: LearningPathId;
}

export interface LearningPreference {
  primaryStyle: LearningPathId;
  structuredAffinity: number; // 0 - 100
  visualAffinity: number;
  examplesAffinity: number;
  exploreAffinity: number;
}

export interface BookmarkItem {
  topicId: string;
  savedAt: string;
  notes?: string;
}

export interface UserSessionState {
  savedTopicIds: string[];
  recentVisits: RecentTopicVisit[];
  preferences: LearningPreference;
  notes: Record<string, string>;
}
