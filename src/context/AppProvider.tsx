import React, { useState, useEffect } from 'react';
import type { NavTab, UserSessionState, RecentTopicVisit } from '../types/session';
import type { SubjectId } from '../types/subject';
import type { LearningPathId } from '../types/learningPath';
import { TOPICS } from '../data/topics';
import { INITIAL_SESSION_STATE } from '../data/mockSession';
import { storageService } from '../services/storageService';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { useAuth } from './AuthContext';
import {
  AppContext,
  type CoreFeatureType,
  type FeatureModalState,
  type DashboardSubTab,
} from './AppContextType';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardSubTab, setDashboardSubTab] = useState<DashboardSubTab>('progress');
  const [currentTab, setCurrentTab] = useState<NavTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab') as NavTab;
      if (tab === 'home' || tab === 'library' || tab === 'workspace' || tab === 'mylearning') {
        return tab;
      }
    }
    return 'home';
  });
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const topic = params.get('topic');
      if (topic && TOPICS.some((t) => t.id === topic)) {
        return topic;
      }
    }
    return null;
  });
  const [activePath, setActivePathState] = useState<LearningPathId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const path = params.get('path') as LearningPathId;
      if (path) return path;
    }
    return 'structured-explanation';
  });
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | 'all'>('all');
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sessionState, setSessionState] = useState<UserSessionState>(() => {
    // Hydrate bookmarks from persistent local storage on initial mount
    const savedBookmarks = storageService.getBookmarks();
    return {
      ...INITIAL_SESSION_STATE,
      savedTopicIds: savedBookmarks
    };
  });
  const [featureModal, setFeatureModal] = useState<FeatureModalState>({
    isOpen: false,
    feature: null,
  });

  const activeTopic = TOPICS.find((t) => t.id === selectedTopicId) || null;

  // Hydrate bookmarks and recent visits from actual persistent activity records whenever user context changes
  useEffect(() => {
    let isMounted = true;

    const bookmarksPromise = (user && isSupabaseConfigured())
      ? storageService.syncUserBookmarksFromCloud(user.id)
      : Promise.resolve(storageService.getBookmarks());

    Promise.all([storageService.getAllActivities(), bookmarksPromise]).then(([activities, currentBookmarks]) => {
      if (!isMounted) return;
      const visitMap = new Map<string, RecentTopicVisit>();
      if (activities && activities.length > 0) {
        for (const act of activities) {
          if (act.topicId && !visitMap.has(act.topicId)) {
            const timeAgo = new Date(act.timestamp).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            });
            visitMap.set(act.topicId, {
              topicId: act.topicId,
              lastVisited: timeAgo,
              lastPathUsed: (act.pathId as LearningPathId) || 'structured-explanation'
            });
          }
        }
      }
      setSessionState((prev) => ({
        ...prev,
        savedTopicIds: currentBookmarks,
        recentVisits: Array.from(visitMap.values()).slice(0, 8)
      }));
    }).catch((e) => console.warn('[AppProvider] Hydration error:', e));

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedTopicId]);

  const navigateTo = (
    tab: NavTab,
    topicId?: string,
    pathId?: LearningPathId,
    subTab?: DashboardSubTab
  ) => {
    setCurrentTab(tab);
    if (topicId) {
      setSelectedTopicId(topicId);
    }
    if (pathId) {
      setActivePathState(pathId);
    }
    if (subTab) {
      setDashboardSubTab(subTab);
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
      const nextSavedIds = exists
        ? prev.savedTopicIds.filter((id) => id !== topicId)
        : [...prev.savedTopicIds, topicId];
      // Persist to local-first storage immediately
      storageService.saveBookmarks(nextSavedIds);
      return {
        ...prev,
        savedTopicIds: nextSavedIds,
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
        dashboardSubTab,
        navigateTo,
        setDashboardSubTab,
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
