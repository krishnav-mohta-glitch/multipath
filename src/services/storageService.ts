/**
 * Storage and Learning History Service
 * Implements MULTIPATH Phase 6: Learning History, Reassessment & Resource Management.
 * 
 * Storage Architecture:
 * - Primary: IndexedDB with structured object stores (`activities`, `topic_history`, `media_resources`).
 * - Secondary / Fallback: LocalStorage synchronization with error resilience.
 * - Privacy: 100% in-browser local storage, zero third-party telemetry, no cloud accounts required.
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

const DB_NAME = 'multipath_educational_db';
const DB_VERSION = 1;

const LS_ACTIVITIES_KEY = 'multipath_activity_history';
const LS_TOPICS_KEY = 'multipath_topic_history';
const LS_MEDIA_KEY = 'multipath_adaptive_media_resources';

class StorageService {
  private dbPromise: Promise<IDBDatabase | null> | null = null;

  constructor() {
    this.initDatabase();
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
    const fullItem: LearningActivityItem = {
      ...item,
      id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString()
    };

    // 1. Update activity list in LocalStorage
    try {
      const existing = this.getAllActivitiesFromLS();
      existing.unshift(fullItem);
      // Keep most recent 200 items in LocalStorage
      localStorage.setItem(LS_ACTIVITIES_KEY, JSON.stringify(existing.slice(0, 200)));
    } catch (e) {
      console.warn('[StorageService] LS activity save failed:', e);
    }

    // 2. Update IndexedDB if available
    const db = await this.initDatabase();
    if (db) {
      try {
        const tx = db.transaction('activities', 'readwrite');
        tx.objectStore('activities').put(fullItem);
      } catch {
        // silent fallback
      }
    }

    // 3. Update aggregate TopicHistoryRecord
    await this.updateTopicHistory(fullItem);

    return fullItem;
  }

  async getAllActivities(): Promise<LearningActivityItem[]> {
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
          // Sort reverse chronological
          return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
      } catch {
        // fallback to LS
      }
    }

    return this.getAllActivitiesFromLS();
  }

  private getAllActivitiesFromLS(): LearningActivityItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(LS_ACTIVITIES_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  // =========================================================================
  // 2. TOPIC HISTORY & REASSESSMENT
  // =========================================================================

  private async updateTopicHistory(activity: LearningActivityItem): Promise<void> {
    const historyMap = this.getAllTopicHistoryFromLS();
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

    if (activity.type === 'topic-opened') {
      existing.visitCount += 1;
    }
    existing.lastVisited = activity.timestamp;

    if (activity.pathId && !existing.pathsUsed.includes(activity.pathId)) {
      existing.pathsUsed.push(activity.pathId);
    }

    if (activity.type === 'discovery-session') {
      existing.discoveryCompletedCount += 1;
    }

    historyMap[activity.topicId] = existing;

    try {
      localStorage.setItem(LS_TOPICS_KEY, JSON.stringify(historyMap));
    } catch (e) {
      console.warn('[StorageService] LS topic history save failed:', e);
    }

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

  getAllTopicHistory(): Record<string, TopicHistoryRecord> {
    return this.getAllTopicHistoryFromLS();
  }

  private getAllTopicHistoryFromLS(): Record<string, TopicHistoryRecord> {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(LS_TOPICS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  }

  /**
   * Records a Feynman Mode diagnostic assessment and generates a comparison if a prior assessment exists.
   */
  async recordFeynmanAssessment(
    topicId: string,
    subjectId: SubjectId,
    topicTitle: string,
    assessment: FeynmanAssessmentData
  ): Promise<{ record: TopicHistoryRecord; comparison: ReassessmentComparison | null }> {
    const historyMap = this.getAllTopicHistoryFromLS();
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

    // Append new assessment
    const newEntry = {
      assessment,
      recordedAt: new Date().toISOString()
    };
    existing.feynmanAssessments.push(newEntry);
    historyMap[topicId] = existing;

    // Save
    try {
      localStorage.setItem(LS_TOPICS_KEY, JSON.stringify(historyMap));
    } catch (e) {
      console.warn('[StorageService] LS assessment save failed:', e);
    }

    const db = await this.initDatabase();
    if (db) {
      try {
        const tx = db.transaction('topic_history', 'readwrite');
        tx.objectStore('topic_history').put(existing);
      } catch {
        // fallback
      }
    }

    // Build comparison if prior assessment was available
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

    // Record activity log
    await this.recordActivity({
      type: 'feynman-assessed',
      topicId,
      subjectId,
      topicTitle,
      details: comparison
        ? `Reassessed: ${comparison.newlyDemonstrated.length} new concept(s) demonstrated.`
        : `Initial Feynman assessment recorded (${assessment.conceptAssessments.filter(c => c.status === 'demonstrated').length} demonstrated).`
    });

    return { record: existing, comparison };
  }

  /**
   * Compares two Feynman assessments without creating arbitrary numerical percentages.
   * Grounded strictly in concept transitions and student evidence quotes.
   */
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

    // Find resolved misconceptions
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

    return this.getAllMediaResourcesFromLS();
  }

  private getAllMediaResourcesFromLS(): AdaptiveMediaResource[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(LS_MEDIA_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async saveMediaResource(resource: AdaptiveMediaResource): Promise<void> {
    const list = this.getAllMediaResourcesFromLS();
    const idx = list.findIndex((r) => r.id === resource.id);
    if (idx >= 0) {
      list[idx] = resource;
    } else {
      list.unshift(resource);
    }

    try {
      localStorage.setItem(LS_MEDIA_KEY, JSON.stringify(list));
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

    // Record activity
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
    const list = this.getAllMediaResourcesFromLS();
    const target = list.find((r) => r.id === resourceId);
    const updated = list.filter((r) => r.id !== resourceId);

    try {
      localStorage.setItem(LS_MEDIA_KEY, JSON.stringify(updated));
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
  // 4. PRIVACY, STATS & EXPORT CONTROLS
  // =========================================================================

  getBookmarks(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('multipath_saved_bookmarks');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveBookmarks(bookmarks: string[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('multipath_saved_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('[StorageService] saveBookmarks error:', e);
    }
  }

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
    const topicsMap = this.getAllTopicHistoryFromLS();

    let totalAssessments = 0;
    for (const t of Object.values(topicsMap)) {
      totalAssessments += t.feynmanAssessments?.length || 0;
    }

    const hasIDB = typeof window !== 'undefined' && 'indexedDB' in window;

    return {
      activitiesCount: activities.length,
      topicsExploredCount: Object.keys(topicsMap).length,
      assessmentsCount: totalAssessments,
      mediaResourcesCount: media.length,
      storageType: hasIDB ? 'IndexedDB with LocalStorage backup' : 'LocalStorage (Local Device)',
      hasIndexedDB: hasIDB
    };
  }

  async exportAllDataAsJSON(): Promise<string> {
    const activities = await this.getAllActivities();
    const topics = this.getAllTopicHistoryFromLS();
    const media = await this.getAllMediaResources();
    const bookmarks = this.getBookmarks();

    const backup = {
      application: 'MULTIPATH Educational Platform',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      bookmarks,
      activities,
      topics,
      mediaResources: media,
      privacySummary: 'All data was collected and stored strictly locally on your browser.'
    };

    return JSON.stringify(backup, null, 2);
  }

  async clearAllLearningData(): Promise<void> {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(LS_ACTIVITIES_KEY);
        localStorage.removeItem(LS_TOPICS_KEY);
        localStorage.removeItem(LS_MEDIA_KEY);
        localStorage.removeItem('multipath_saved_bookmarks');

        // Clear active session keys
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key &&
            (key.startsWith('multipath_active_discovery_') ||
              key.startsWith('multipath_active_feynman_'))
          ) {
            keysToRemove.push(key);
          }
        }
        for (const k of keysToRemove) {
          localStorage.removeItem(k);
        }
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

  getPrivacyNotice(): {
    title: string;
    description: string;
    guarantees: string[];
  } {
    return {
      title: 'Local Privacy & Storage Architecture',
      description:
        'MULTIPATH is engineered for independent student thinking and rigorous personal learning. All learning histories, Socratic transcripts, Feynman assessments, and generated media are stored exclusively in your browser.',
      guarantees: [
        'Zero tracking cookies or commercial ad trackers',
        'No mandatory account registration or passwords required',
        'Your diagnostic knowledge gaps are private to your device',
        'Full data portability: Export or clear your entire history with one click'
      ]
    };
  }
}

export const storageService = new StorageService();
