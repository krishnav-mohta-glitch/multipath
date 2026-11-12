import React, { useState, useEffect } from 'react';
import type { NavTab, UserSessionState } from '../types/session';
import type { SubjectId } from '../types/subject';
import type { LearningPathId } from '../types/learningPath';
import { TOPICS } from '../data/topics';
import { INITIAL_SESSION_STATE } from '../data/mockSession';
import { storageService } from '../services/storageService';
import {
  AppContext,
  type CoreFeatureType,
  type FeatureModalState,
} from './AppContextType';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activePath, setActivePathState] = useState<LearningPathId>('structured-explanation');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sessionState, setSessionState] = useState<UserSessionState>(INITIAL_SESSION_STATE);
  const [featureModal, setFeatureModal] = useState<FeatureModalState>({
    isOpen: false,
    feature: null,
  });

  const activeTopic = TOPICS.find((t) => t.id === selectedTopicId) || null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedTopicId]);

  const navigateTo = (tab: NavTab, topicId?: string, pathId?: LearningPathId) => {
    setCurrentTab(tab);
    if (topicId) {
      setSelectedTopicId(topicId);
    }
    if (pathId) {
      setActivePathState(pathId);
    }
  };

  const openTopic = (topicId: string, pathId?: LearningPathId) => {
    setSelectedTopicId(topicId);
    const chosenPath = pathId || 'structured-explanation';
    setActivePathState(chosenPath);
    setCurrentTab('workspace');

    setSessionState((prev) => {
      const existing = prev.recentVisits.filter((v) => v.topicId !== topicId);
      return {
        ...prev,
        recentVisits: [
          {
            topicId,
            lastVisited: 'Just now',
            lastPathUsed: chosenPath,
          },
          ...existing,
        ],
      };
    });

    // Record activity in local learning history
    const matched = TOPICS.find((t) => t.id === topicId);
    if (matched) {
      storageService.recordActivity({
        type: 'topic-opened',
        topicId,
        subjectId: matched.subjectId,
        topicTitle: matched.title,
        pathId: chosenPath,
        details: `Explored ${matched.title} via ${chosenPath.replace(/-/g, ' ')}.`
      }).catch((e) => console.warn('[AppProvider] recordActivity error:', e));
    }
  };

  const backToLibrary = () => {
    setCurrentTab('library');
  };

  const setActivePath = (pathId: LearningPathId) => {
    setActivePathState(pathId);
    if (selectedTopicId) {
      setSessionState((prev) => ({
        ...prev,
        recentVisits: prev.recentVisits.map((v) =>
          v.topicId === selectedTopicId ? { ...v, lastPathUsed: pathId } : v
        ),
      }));

      const matched = TOPICS.find((t) => t.id === selectedTopicId);
      if (matched) {
        storageService.recordActivity({
          type: 'path-changed',
          topicId: selectedTopicId,
          subjectId: matched.subjectId,
          topicTitle: matched.title,
          pathId,
          details: `Switched learning perspective to ${pathId.replace(/-/g, ' ')}.`
        }).catch((e) => console.warn('[AppProvider] recordActivity error:', e));
      }
    }
  };

  const toggleBookmark = (topicId: string) => {
    setSessionState((prev) => {
      const exists = prev.savedTopicIds.includes(topicId);
      return {
        ...prev,
        savedTopicIds: exists
          ? prev.savedTopicIds.filter((id) => id !== topicId)
          : [...prev.savedTopicIds, topicId],
      };
    });
  };

  const isBookmarked = (topicId: string) => {
    return sessionState.savedTopicIds.includes(topicId);
  };

  const openFeatureModal = (feature: CoreFeatureType) => {
    setFeatureModal({ isOpen: true, feature });
  };

  const closeFeatureModal = () => {
    setFeatureModal({ isOpen: false, feature: null });
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        selectedTopicId,
        activeTopic,
        activePath,
        selectedSubjectId,
        searchQuery,
        sessionState,
        featureModal,
        navigateTo,
        openTopic,
        backToLibrary,
        setActivePath,
        toggleBookmark,
        isBookmarked,
        setSelectedSubjectId,
        setSearchQuery,
        openFeatureModal,
        closeFeatureModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
