import { createContext } from 'react';
import type { NavTab, UserSessionState } from '../types/session';
import type { SubjectId } from '../types/subject';
import type { LearningPathId } from '../types/learningPath';
import type { Topic } from '../types/topic';

export type CoreFeatureType = 'multiple-paths' | 'guided-discovery' | 'feynman-mode';

export interface FeatureModalState {
  isOpen: boolean;
  feature: CoreFeatureType | null;
}

export interface AppContextValue {
  currentTab: NavTab;
  selectedTopicId: string | null;
  activeTopic: Topic | null;
  activePath: LearningPathId;
  selectedSubjectId: SubjectId | 'all';
  searchQuery: string;
  sessionState: UserSessionState;
  featureModal: FeatureModalState;
  
  // Navigation actions
  navigateTo: (tab: NavTab, topicId?: string, pathId?: LearningPathId) => void;
  openTopic: (topicId: string, pathId?: LearningPathId) => void;
  backToLibrary: () => void;
  
  // Topic Workspace actions
  setActivePath: (pathId: LearningPathId) => void;
  toggleBookmark: (topicId: string) => void;
  isBookmarked: (topicId: string) => boolean;
  
  // Filter & Search actions
  setSelectedSubjectId: (subjectId: SubjectId | 'all') => void;
  setSearchQuery: (q: string) => void;
  
  // Core Feature modal
  openFeatureModal: (feature: CoreFeatureType) => void;
  closeFeatureModal: () => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
