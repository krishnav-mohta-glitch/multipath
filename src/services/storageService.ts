/**
 * Storage and Learning History Service
 * Implements MULTIPATH Phase 6 & Phase 13:
 * - Guest mode: 100% in-browser IndexedDB & LocalStorage isolation.
 * - Authenticated mode: Synchronized with Supabase via CloudPersistenceService,
 *   with user-scoped local caching and multi-account isolation.
 */

import type {
  LearningActivityItem,
  TopicHistoryRecord,
  ReassessmentComparison,
  ConceptTransition
} from '../types/history';
import type { AdaptiveMediaResource } from '../types/media';
import type { FeynmanAssessmentData } from '../types/feynman';
import type { SubjectId } from '../types/subject';
import type { GuestDataPayload, GuestDataSummary } from '../types/cloudPersistence';
import { cloudPersistenceService } from './cloudPersistenceService';
import { isSupabaseConfigured } from './supabaseClient';

const DB_NAME = 'multipath_educational_db';
const DB_VERSION = 1;

// Guest storage keys
const LS_GUEST_ACTIVITIES_KEY = 'multipath_activity_history';
const LS_GUEST_TOPICS_KEY = 'multipath_topic_history';
const LS_GUEST_MEDIA_KEY = 'multipath_adaptive_media_resources';
const LS_GUEST_BOOKMARKS_KEY = 'multipath_saved_bookmarks';

class StorageService {
  private dbPromise: Promise<IDBDatabase | null> | null = null;
  private activeUserId: string | null = null;

  constructor() {
    this.initDatabase();
  }

  // =========================================================================
  // USER CONTEXT & CACHE SCOPING
  // =========================================================================

  setActiveUserId(userId: string | null): void {
    if (this.activeUserId === userId) return;
    this.activeUserId = userId;
  }

  getActiveUserId(): string | null {
    return this.activeUserId;
  }

  private getUserCacheKey(suffix: string): string {
    if (this.activeUserId) {
      return `multipath_user_${this.activeUserId}_${suffix}`;
    }
    switch (suffix) {
      case 'activities':
        return LS_GUEST_ACTIVITIES_KEY;
      case 'topics':
        return LS_GUEST_TOPICS_KEY;
      case 'media':
        return LS_GUEST_MEDIA_KEY;
      case 'bookmarks':
        return LS_GUEST_BOOKMARKS_KEY;
      default:
        return `multipath_guest_${suffix}`;
    }
  }

  private initDatabase(): Promise<IDBDatabase | null> {
    if (this.dbPromise) return this.dbPromise;

    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      this.dbPromise = Promise.resolve(null);
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
          const db = (event.target as IDBOpenDBRequest).result;

          if (!db.objectStoreNames.contains('activities')) {
            db.createObjectStore('activities', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('topic_history')) {
            db.createObjectStore('topic_history', { keyPath: 'topicId' });
          }
          if (!db.objectStoreNames.contains('media_resources')) {
            db.createObjectStore('media_resources', { keyPath: 'id' });
          }
        };

        request.onsuccess = (event: Event) => {
          resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = () => {
          console.warn('[StorageService] IndexedDB unavailable, falling back to LocalStorage.');
          resolve(null);
        };
      } catch (err) {
        console.warn('[StorageService] IndexedDB init exception:', err);
        resolve(null);
      }
    });

    return this.dbPromise;
  }

  // =========================================================================
  // 1. LEARNING ACTIVITY LOGGING
  // =========================================================================

  async recordActivity(
    item: Omit<LearningActivityItem, 'id' | 'timestamp'>
  ): Promise<LearningActivityItem> {
    const timestamp = new Date().toISOString();
    const tempId = `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // Cloud path when authenticated
    if (this.activeUserId && isSupabaseConfigured()) {
      const recorded = await cloudPersistenceService.recordActivityEvent(this.activeUserId, {
        ...item,
        id: tempId,
        timestamp
      });

      const fullItem: LearningActivityItem = recorded || {
        ...item,
        id: tempId,
        timestamp
      };

      // Update user-scoped local cache
      try {
        const cacheKey = this.getUserCacheKey('activities');
        const existing = this.getCachedActivities(cacheKey);
        existing.unshift(fullItem);
        localStorage.setItem(cacheKey, JSON.stringify(existing.slice(0, 200)));
      } catch (e) {
        console.warn('[StorageService] Cache update error:', e);
      }

      await this.updateTopicHistory(fullItem);
      return fullItem;
    }

    // Local guest path
    const fullItem: LearningActivityItem = {
      ...item,
      id: tempId,
      timestamp
    };

    try {
      const existing = this.getAllActivitiesFromLS();
      existing.unshift(fullItem);
      localStorage.setItem(LS_GUEST_ACTIVITIES_KEY, JSON.stringify(existing.slice(0, 200)));
    } catch (e) {
      console.warn('[StorageService] LS activity save failed:', e);
    }

    const db = await this.initDatabase();
    if (db) {
      try {
        const tx = db.transaction('activities', 'readwrite');
        tx.objectStore('activities').put(fullItem);
      } catch {
        // silent fallback
      }
    }

    await this.updateTopicHistory(fullItem);
    return fullItem;
  }

  async getAllActivities(): Promise<LearningActivityItem[]> {
    // Cloud path when authenticated
    if (this.activeUserId && isSupabaseConfigured()) {
      const cacheKey = this.getUserCacheKey('activities');
      try {
        const cloudEvents = await cloudPersistenceService.getActivityEvents(this.activeUserId, 150);
        if (cloudEvents && cloudEvents.length > 0) {
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(cacheKey, JSON.stringify(cloudEvents.slice(0, 200)));
            } catch {
              // ignore
            }
          }
          return cloudEvents;
        }
      } catch (e) {
        console.warn('[StorageService] Cloud activity fetch failed, using cache:', e);
      }
      return this.getCachedActivities(cacheKey);
    }

    // Local guest path
    const db = await this.initDatabase();
    if (db) {
      try {
        const items = await new Promise<LearningActivityItem[]>((resolve) => {
          const tx = db.transaction('activities', 'readonly');
          const store = tx.objectStore('activities');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
        if (items.length > 0) {
          return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
      } catch {
        // fallback to LS
      }
    }

    return this.getAllActivitiesFromLS();
  }

  private getCachedActivities(cacheKey: string): LearningActivityItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private getAllActivitiesFromLS(): LearningActivityItem[] {
    return this.getCachedActivities(LS_GUEST_ACTIVITIES_KEY);
  }

  // =========================================================================
  // 2. TOPIC HISTORY & REASSESSMENT
  // =========================================================================

  private async updateTopicHistory(activity: LearningActivityItem): Promise<void> {
    const historyMap = this.getAllTopicHistory();
    const existing = historyMap[activity.topicId] || {
      topicId: activity.topicId,
      subjectId: activity.subjectId,
      topicTitle: activity.topicTitle,
      visitCount: 0,
      firstVisited: activity.timestamp,
      lastVisited: activity.timestamp,
      pathsUsed: [],
      discoveryCompletedCount: 0,
      feynmanAssessments: [],
      generatedResourceIds: []
    };

    if ((activity.type as string) === 'topic-opened' || (activity.type as string) === 'topic_viewed') {
      existing.visitCount += 1;
    }
    existing.lastVisited = activity.timestamp;

    if (activity.pathId && !existing.pathsUsed.includes(activity.pathId)) {
      existing.pathsUsed.push(activity.pathId);
    }

    if ((activity.type as string) === 'discovery-session' || (activity.type as string) === 'learning_session_completed') {
      existing.discoveryCompletedCount += 1;
    }

    historyMap[activity.topicId] = existing;

    const cacheKey = this.getUserCacheKey('topics');
    try {
      localStorage.setItem(cacheKey, JSON.stringify(historyMap));
    } catch (e) {
      console.warn('[StorageService] Topic history save failed:', e);
    }

    if (!this.activeUserId) {
      const db = await this.initDatabase();
      if (db) {
        try {
          const tx = db.transaction('topic_history', 'readwrite');
          tx.objectStore('topic_history').put(existing);
        } catch {
          // fallback
        }
      }
    }
  }

  getAllTopicHistory(): Record<string, TopicHistoryRecord> {
    const cacheKey = this.getUserCacheKey('topics');
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  }

  async recordFeynmanAssessment(
    topicId: string,
    subjectId: SubjectId,
    topicTitle: string,
    assessment: FeynmanAssessmentData
  ): Promise<{ record: TopicHistoryRecord; comparison: ReassessmentComparison | null }> {
    const historyMap = this.getAllTopicHistory();
    const existing = historyMap[topicId] || {
      topicId,
      subjectId,
      topicTitle,
      visitCount: 1,
      firstVisited: new Date().toISOString(),
      lastVisited: new Date().toISOString(),
      pathsUsed: [],
      discoveryCompletedCount: 0,
      feynmanAssessments: [],
      generatedResourceIds: []
    };

    const previousAssessmentEntry =
      existing.feynmanAssessments.length > 0
        ? existing.feynmanAssessments[existing.feynmanAssessments.length - 1]
        : null;

    const recordedAt = new Date().toISOString();
    const newEntry = {
      assessment,
      recordedAt
    };
    existing.feynmanAssessments.push(newEntry);
    historyMap[topicId] = existing;

    const cacheKey = this.getUserCacheKey('topics');
    try {
      localStorage.setItem(cacheKey, JSON.stringify(historyMap));
    } catch (e) {
      console.warn('[StorageService] Assessment save failed:', e);
    }

    // If authenticated, persist learning session record to cloud
    if (this.activeUserId && isSupabaseConfigured()) {
      const sessionId = `feyn_${topicId}_${Date.now()}`;
      cloudPersistenceService.upsertLearningSession(this.activeUserId, {
        id: sessionId,
        topic_id: topicId,
        subject_id: subjectId,
        mode: 'feynman-technique',
        status: 'completed',
        turn_count: 3,
        duration_seconds: 180,
        history: [],
        assessment_data: assessment,
        started_at: recordedAt,
        completed_at: recordedAt
      }).catch((e) => console.warn('[StorageService] Session cloud persist error:', e));
    } else {
      const db = await this.initDatabase();
      if (db) {
        try {
          const tx = db.transaction('topic_history', 'readwrite');
          tx.objectStore('topic_history').put(existing);
        } catch {
          // fallback
        }
      }
    }

    let comparison: ReassessmentComparison | null = null;
    if (previousAssessmentEntry) {
      comparison = this.buildReassessmentComparison(
        topicId,
        subjectId,
        topicTitle,
        previousAssessmentEntry.assessment,
        previousAssessmentEntry.recordedAt,
        assessment,
        newEntry.recordedAt
      );
    }

    await this.recordActivity({
      type: 'feynman-assessed',
      topicId,
      subjectId,
      topicTitle,
      details: comparison
        ? `Reassessed: ${comparison.newlyDemonstrated.length} new concept(s) demonstrated.`
        : `Initial Feynman assessment recorded (${assessment.conceptAssessments.filter((c) => c.status === 'demonstrated').length} demonstrated).`
    });

    return { record: existing, comparison };
  }

  buildReassessmentComparison(
    topicId: string,
    subjectId: SubjectId,
    topicTitle: string,
    previous: FeynmanAssessmentData,
    prevDate: string,
    current: FeynmanAssessmentData,
    currDate: string
  ): ReassessmentComparison {
    const transitions: ConceptTransition[] = [];
    const newlyDemonstrated: string[] = [];

    for (const currConcept of current.conceptAssessments) {
      const prevConcept = previous.conceptAssessments.find((p) => p.name === currConcept.name);
      const prevStatus = prevConcept ? prevConcept.status : 'not-yet-demonstrated';
      const prevEvidence = prevConcept ? prevConcept.evidence : 'Not previously discussed';

      const improved =
        (prevStatus === 'not-yet-demonstrated' && currConcept.status === 'demonstrated') ||
        (prevStatus === 'partly-demonstrated' && currConcept.status === 'demonstrated');

      if (improved) {
        newlyDemonstrated.push(currConcept.name);
      }

      let notes = 'Status maintained.';
      if (prevStatus !== currConcept.status) {
        notes = `Transitioned from ${prevStatus.replace(/-/g, ' ')} to ${currConcept.status.replace(/-/g, ' ')}.`;
      }

      transitions.push({
        conceptId: currConcept.id,
        conceptName: currConcept.name,
        previousStatus: prevStatus,
        currentStatus: currConcept.status,
        previousEvidence: prevEvidence,
        currentEvidence: currConcept.evidence,
        improved,
        notes
      });
    }

    const resolvedMisconceptions: Array<{ statement: string; resolvedEvidence: string }> = [];
    for (const prevIncorrect of previous.knowledgeGapReport.incorrectStatements || []) {
      const stillIncorrect = (current.knowledgeGapReport.incorrectStatements || []).some(
        (c) => c.conceptName === prevIncorrect.conceptName
      );
      if (!stillIncorrect) {
        const matchingCurrent = current.conceptAssessments.find(
          (c) => c.name === prevIncorrect.conceptName && c.status === 'demonstrated'
        );
        resolvedMisconceptions.push({
          statement: prevIncorrect.studentQuote,
          resolvedEvidence: matchingCurrent?.evidence || 'Addressed with accurate reasoning in follow-up session.'
        });
      }
    }

    const remainingGaps = (current.knowledgeGapReport.conceptsNeedingClarification || []).map((c) => c.name);

    return {
      topicId,
      topicTitle,
      subjectId,
      previousDate: prevDate,
      currentDate: currDate,
      conceptTransitions: transitions,
      resolvedMisconceptions,
      remainingGaps,
      newlyDemonstrated
    };
  }

  // =========================================================================
  // 3. PERSONAL RESOURCE LIBRARY MANAGEMENT
  // =========================================================================

  async getAllMediaResources(): Promise<AdaptiveMediaResource[]> {
    if (this.activeUserId && isSupabaseConfigured()) {
      const cacheKey = this.getUserCacheKey('media');
      try {
        const cloudResources = await cloudPersistenceService.getSavedResources(this.activeUserId);
        if (cloudResources) {
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(cacheKey, JSON.stringify(cloudResources));
            } catch {
              // ignore
            }
          }
          return cloudResources;
        }
      } catch (e) {
        console.warn('[StorageService] Cloud resources fetch failed, using cache:', e);
      }
      return this.getCachedMedia(cacheKey);
    }

    const db = await this.initDatabase();
    if (db) {
      try {
        const resources = await new Promise<AdaptiveMediaResource[]>((resolve) => {
          const tx = db.transaction('media_resources', 'readonly');
          const store = tx.objectStore('media_resources');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
        if (resources.length > 0) {
          return resources.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      } catch {
        // fallback
      }
    }

    return this.getCachedMedia(LS_GUEST_MEDIA_KEY);
  }

  private getCachedMedia(cacheKey: string): AdaptiveMediaResource[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async saveMediaResource(resource: AdaptiveMediaResource): Promise<void> {
    if (this.activeUserId && isSupabaseConfigured()) {
      const cacheKey = this.getUserCacheKey('media');
      const list = this.getCachedMedia(cacheKey);
      const idx = list.findIndex((r) => r.id === resource.id);
      if (idx >= 0) {
        list[idx] = resource;
      } else {
        list.unshift(resource);
      }
      try {
        localStorage.setItem(cacheKey, JSON.stringify(list));
      } catch {
        // ignore
      }

      await cloudPersistenceService.saveResource(this.activeUserId, resource);
      await this.recordActivity({
        type: 'media-generated',
        topicId: resource.topicId,
        subjectId: resource.subject as SubjectId,
        topicTitle: resource.topicTitle,
        details: `Generated ${resource.mediaType} for ${resource.associatedGaps.join(', ')}`,
        mediaFormat: resource.mediaType
      });
      return;
    }

    const list = this.getCachedMedia(LS_GUEST_MEDIA_KEY);
    const idx = list.findIndex((r) => r.id === resource.id);
    if (idx >= 0) {
      list[idx] = resource;
    } else {
      list.unshift(resource);
    }

    try {
      localStorage.setItem(LS_GUEST_MEDIA_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('[StorageService] LS media resource save failed:', e);
    }

    const db = await this.initDatabase();
    if (db) {
      try {
        const tx = db.transaction('media_resources', 'readwrite');
        tx.objectStore('media_resources').put(resource);
      } catch {
        // fallback
      }
    }

    await this.recordActivity({
      type: 'media-generated',
      topicId: resource.topicId,
      subjectId: resource.subject as SubjectId,
      topicTitle: resource.topicTitle,
      details: `Generated ${resource.mediaType} for ${resource.associatedGaps.join(', ')}`,
      mediaFormat: resource.mediaType
    });
  }

  async deleteMediaResource(resourceId: string): Promise<boolean> {
    if (this.activeUserId && isSupabaseConfigured()) {
      const cacheKey = this.getUserCacheKey('media');
      const list = this.getCachedMedia(cacheKey);
      const target = list.find((r) => r.id === resourceId);
      const updated = list.filter((r) => r.id !== resourceId);

      try {
        localStorage.setItem(cacheKey, JSON.stringify(updated));
      } catch {
        // ignore
      }

      await cloudPersistenceService.deleteResource(this.activeUserId, resourceId);
      if (target) {
        await this.recordActivity({
          type: 'resource-deleted',
          topicId: target.topicId,
          subjectId: target.subject as SubjectId,
          topicTitle: target.topicTitle,
          details: `Deleted ${target.mediaType} resource.`,
          mediaFormat: target.mediaType
        });
      }
      return true;
    }

    const list = this.getCachedMedia(LS_GUEST_MEDIA_KEY);
    const target = list.find((r) => r.id === resourceId);
    const updated = list.filter((r) => r.id !== resourceId);

    try {
      localStorage.setItem(LS_GUEST_MEDIA_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('[StorageService] LS media delete failed:', e);
    }

    const db = await this.initDatabase();
    if (db) {
      try {
        const tx = db.transaction('media_resources', 'readwrite');
        tx.objectStore('media_resources').delete(resourceId);
      } catch {
        // fallback
      }
    }

    if (target) {
      await this.recordActivity({
        type: 'resource-deleted',
        topicId: target.topicId,
        subjectId: target.subject as SubjectId,
        topicTitle: target.topicTitle,
        details: `Deleted ${target.mediaType} resource.`,
        mediaFormat: target.mediaType
      });
    }

    return true;
  }

  // =========================================================================
  // 4. BOOKMARKS & TOPIC PERSISTENCE
  // =========================================================================

  getBookmarks(): string[] {
    const key = this.getUserCacheKey('bookmarks');
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveBookmarks(bookmarks: string[]): void {
    const key = this.getUserCacheKey('bookmarks');
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('[StorageService] saveBookmarks error:', e);
    }

    // Sync to cloud if authenticated
    if (this.activeUserId && isSupabaseConfigured()) {
      cloudPersistenceService.getSavedTopics(this.activeUserId).then((existingCloud) => {
        const toAdd = bookmarks.filter((id) => !existingCloud.includes(id));
        const toRemove = existingCloud.filter((id) => !bookmarks.includes(id));

        for (const topicId of toAdd) {
          cloudPersistenceService.saveTopic(this.activeUserId!, topicId);
        }
        for (const topicId of toRemove) {
          cloudPersistenceService.removeSavedTopic(this.activeUserId!, topicId);
        }
      }).catch((e) => console.warn('[StorageService] Cloud bookmark sync error:', e));
    }
  }

  async syncUserBookmarksFromCloud(userId: string): Promise<string[]> {
    if (!isSupabaseConfigured()) return this.getBookmarks();
    const cloudTopics = await cloudPersistenceService.getSavedTopics(userId);
    const key = `multipath_user_${userId}_bookmarks`;
    try {
      localStorage.setItem(key, JSON.stringify(cloudTopics));
    } catch {
      // ignore
    }
    return cloudTopics;
  }

  // =========================================================================
  // 5. GUEST DATA SNAPSHOT & MIGRATION CONTROLS
  // =========================================================================

  hasGuestData(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const bookmarksRaw = localStorage.getItem(LS_GUEST_BOOKMARKS_KEY);
      const bookmarks = bookmarksRaw ? JSON.parse(bookmarksRaw) : [];
      if (Array.isArray(bookmarks) && bookmarks.length > 0) return true;

      const actRaw = localStorage.getItem(LS_GUEST_ACTIVITIES_KEY);
      const activities = actRaw ? JSON.parse(actRaw) : [];
      if (Array.isArray(activities) && activities.length > 0) return true;

      const mediaRaw = localStorage.getItem(LS_GUEST_MEDIA_KEY);
      const media = mediaRaw ? JSON.parse(mediaRaw) : [];
      if (Array.isArray(media) && media.length > 0) return true;

      return false;
    } catch {
      return false;
    }
  }

  getGuestDataSummary(): GuestDataSummary {
    if (typeof window === 'undefined') {
      return { bookmarksCount: 0, activitiesCount: 0, sessionsCount: 0, resourcesCount: 0, hasData: false };
    }

    try {
      const bRaw = localStorage.getItem(LS_GUEST_BOOKMARKS_KEY);
      const bookmarks = bRaw ? JSON.parse(bRaw) : [];

      const aRaw = localStorage.getItem(LS_GUEST_ACTIVITIES_KEY);
      const activities = aRaw ? JSON.parse(aRaw) : [];

      const mRaw = localStorage.getItem(LS_GUEST_MEDIA_KEY);
      const media = mRaw ? JSON.parse(mRaw) : [];

      const tRaw = localStorage.getItem(LS_GUEST_TOPICS_KEY);
      const topics = tRaw ? JSON.parse(tRaw) : {};
      let sessionsCount = 0;
      for (const t of Object.values(topics) as TopicHistoryRecord[]) {
        sessionsCount += (t.feynmanAssessments?.length || 0) + (t.discoveryCompletedCount || 0);
      }

      const totalCount = bookmarks.length + activities.length + media.length + sessionsCount;
      return {
        bookmarksCount: bookmarks.length,
        activitiesCount: activities.length,
        sessionsCount,
        resourcesCount: media.length,
        hasData: totalCount > 0
      };
    } catch {
      return { bookmarksCount: 0, activitiesCount: 0, sessionsCount: 0, resourcesCount: 0, hasData: false };
    }
  }

  async getGuestDataSnapshot(): Promise<GuestDataPayload> {
    const bookmarks = this.getCachedBookmarks(LS_GUEST_BOOKMARKS_KEY);
    const activities = await this.getAllGuestActivities();
    const mediaResources = await this.getAllGuestMediaResources();
    const topics = this.getCachedTopics(LS_GUEST_TOPICS_KEY);

    return {
      bookmarks,
      activities,
      topics,
      mediaResources
    };
  }

  private getCachedBookmarks(key: string): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private getCachedTopics(key: string): Record<string, TopicHistoryRecord> {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  }

  private async getAllGuestActivities(): Promise<LearningActivityItem[]> {
    const db = await this.initDatabase();
    if (db) {
      try {
        const items = await new Promise<LearningActivityItem[]>((resolve) => {
          const tx = db.transaction('activities', 'readonly');
          const req = tx.objectStore('activities').getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
        if (items.length > 0) return items;
      } catch {
        // fallback
      }
    }
    return this.getCachedActivities(LS_GUEST_ACTIVITIES_KEY);
  }

  private async getAllGuestMediaResources(): Promise<AdaptiveMediaResource[]> {
    const db = await this.initDatabase();
    if (db) {
      try {
        const items = await new Promise<AdaptiveMediaResource[]>((resolve) => {
          const tx = db.transaction('media_resources', 'readonly');
          const req = tx.objectStore('media_resources').getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
        if (items.length > 0) return items;
      } catch {
        // fallback
      }
    }
    return this.getCachedMedia(LS_GUEST_MEDIA_KEY);
  }

  async clearGuestDataOnly(): Promise<void> {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(LS_GUEST_ACTIVITIES_KEY);
        localStorage.removeItem(LS_GUEST_TOPICS_KEY);
        localStorage.removeItem(LS_GUEST_MEDIA_KEY);
        localStorage.removeItem(LS_GUEST_BOOKMARKS_KEY);
      } catch {
        // ignore
      }

      const db = await this.initDatabase();
      if (db) {
        try {
          const tx = db.transaction(['activities', 'topic_history', 'media_resources'], 'readwrite');
          tx.objectStore('activities').clear();
          tx.objectStore('topic_history').clear();
          tx.objectStore('media_resources').clear();
        } catch {
          // ignore
        }
      }
    }
  }

  // =========================================================================
  // 6. PRIVACY, STATS & EXPORT CONTROLS
  // =========================================================================

  async getStorageStats(): Promise<{
    activitiesCount: number;
    topicsExploredCount: number;
    assessmentsCount: number;
    mediaResourcesCount: number;
    storageType: string;
    hasIndexedDB: boolean;
  }> {
    const activities = await this.getAllActivities();
    const media = await this.getAllMediaResources();
    const topicsMap = this.getAllTopicHistory();

    let totalAssessments = 0;
    for (const t of Object.values(topicsMap)) {
      totalAssessments += t.feynmanAssessments?.length || 0;
    }

    const hasIDB = typeof window !== 'undefined' && 'indexedDB' in window;
    const isCloud = !!this.activeUserId && isSupabaseConfigured();

    return {
      activitiesCount: activities.length,
      topicsExploredCount: Object.keys(topicsMap).length,
      assessmentsCount: totalAssessments,
      mediaResourcesCount: media.length,
      storageType: isCloud
        ? 'Supabase Cloud (PostgreSQL RLS) with Local Cache'
        : hasIDB
          ? 'IndexedDB with LocalStorage backup (Device-only)'
          : 'LocalStorage (Device-only)',
      hasIndexedDB: hasIDB
    };
  }

  async exportAllDataAsJSON(profile?: Record<string, unknown> | null): Promise<string> {
    if (this.activeUserId && isSupabaseConfigured()) {
      return cloudPersistenceService.exportPersonalDataAsJSON(this.activeUserId, profile);
    }

    const activities = await this.getAllActivities();
    const topics = this.getAllTopicHistory();
    const media = await this.getAllMediaResources();
    const bookmarks = this.getBookmarks();

    const backup = {
      application: 'MULTIPATH Educational Platform',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      accountType: 'Guest (Local Browser)',
      bookmarks,
      activities,
      topics,
      mediaResources: media,
      privacySummary: 'All data was collected and stored strictly locally on your browser.'
    };

    return JSON.stringify(backup, null, 2);
  }

  async clearAllLearningData(): Promise<void> {
    if (this.activeUserId) {
      const cacheKeyAct = this.getUserCacheKey('activities');
      const cacheKeyTop = this.getUserCacheKey('topics');
      const cacheKeyMed = this.getUserCacheKey('media');
      const cacheKeyBm = this.getUserCacheKey('bookmarks');
      try {
        localStorage.removeItem(cacheKeyAct);
        localStorage.removeItem(cacheKeyTop);
        localStorage.removeItem(cacheKeyMed);
        localStorage.removeItem(cacheKeyBm);
      } catch {
        // ignore
      }
      return;
    }

    await this.clearGuestDataOnly();
  }

  getPrivacyNotice(): {
    title: string;
    description: string;
    guarantees: string[];
  } {
    return {
      title: 'Local Privacy & Storage Architecture',
      description:
        'MULTIPATH is engineered for independent student thinking and rigorous personal learning. Guest records are stored strictly on your device. Authenticated accounts sync to your secure Supabase database protected by PostgreSQL Row Level Security.',
      guarantees: [
        'Zero tracking cookies or commercial ad trackers',
        'No mandatory account registration or passwords required for guest learning',
        'Your diagnostic knowledge gaps are strictly protected under your authenticated identity',
        'Full data portability: Export your entire history as standard JSON at any time'
      ]
    };
  }
}

export const storageService = new StorageService();
