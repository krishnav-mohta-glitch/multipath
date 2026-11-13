import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { LearningActivityItem } from '../types/history';
import type { AdaptiveMediaResource, MediaType } from '../types/media';
import type { LearningPreference } from '../types/session';
import type { SubjectId } from '../types/subject';
import type { LearningPathId } from '../types/learningPath';
import type {
  DbActivityEvent,
  DbLearningSession,
  DbSavedResource,
  DbLearningPreference,
  GuestDataPayload,
  GuestImportResult
} from '../types/cloudPersistence';

export function stringToDeterministicUUID(input: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(input)) return input;

  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  let h3 = 0x9e3779b9;
  let h4 = 0x85ebca6b;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
    h3 = Math.imul(h3 ^ ch, 2246822507);
    h4 = Math.imul(h4 ^ ch, 3266489909);
  }
  const toHex8 = (n: number) => (n >>> 0).toString(16).padStart(8, '0');
  const hex = toHex8(h1) + toHex8(h2) + toHex8(h3) + toHex8(h4);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

export class CloudPersistenceService {
  // =========================================================================
  // 1. SAVED TOPICS (BOOKMARKS)
  // =========================================================================

  async getSavedTopics(userId: string): Promise<string[]> {
    if (!isSupabaseConfigured() || !supabase) return [];

    try {
      const { data, error } = await supabase
        .from('saved_topics')
        .select('topic_id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[CloudPersistence] getSavedTopics error:', error.message);
        return [];
      }

      return (data || []).map((row: { topic_id: string }) => row.topic_id);
    } catch (err) {
      console.warn('[CloudPersistence] getSavedTopics exception:', err);
      return [];
    }
  }

  async saveTopic(userId: string, topicId: string, notes?: string): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const { error } = await supabase
        .from('saved_topics')
        .upsert(
          {
            user_id: userId,
            topic_id: topicId,
            notes: notes || null
          },
          { onConflict: 'user_id,topic_id' }
        );

      if (error) {
        console.warn('[CloudPersistence] saveTopic error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[CloudPersistence] saveTopic exception:', err);
      return false;
    }
  }

  async removeSavedTopic(userId: string, topicId: string): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const { error } = await supabase
        .from('saved_topics')
        .delete()
        .eq('user_id', userId)
        .eq('topic_id', topicId);

      if (error) {
        console.warn('[CloudPersistence] removeSavedTopic error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[CloudPersistence] removeSavedTopic exception:', err);
      return false;
    }
  }

  // =========================================================================
  // 2. ACTIVITY EVENTS (IMMUTABLE LOG)
  // =========================================================================

  async recordActivityEvent(
    userId: string,
    event: Omit<LearningActivityItem, 'timestamp'> & { timestamp?: string; id?: string }
  ): Promise<LearningActivityItem | null> {
    if (!isSupabaseConfigured() || !supabase) return null;

    const eventId = event.id ? stringToDeterministicUUID(event.id) : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : stringToDeterministicUUID(`act_${Date.now()}_${Math.random()}`));
    const timestamp = event.timestamp || new Date().toISOString();

    const dbPayload: Partial<DbActivityEvent> = {
      id: eventId,
      user_id: userId,
      event_type: event.type,
      topic_id: event.topicId,
      subject_id: event.subjectId,
      path_id: event.pathId || null,
      details: event.details || null,
      payload: {
        mediaFormat: event.mediaFormat || null,
        topicTitle: event.topicTitle || null
      },
      schema_version: 1,
      timestamp
    };

    try {
      const { error } = await supabase
        .from('activity_events')
        .upsert(dbPayload, { onConflict: 'user_id,id', ignoreDuplicates: true });

      if (error) {
        console.warn('[CloudPersistence] recordActivityEvent error:', error.message);
        return null;
      }

      return {
        id: eventId,
        timestamp,
        type: event.type,
        topicId: event.topicId,
        topicTitle: event.topicTitle,
        subjectId: event.subjectId,
        pathId: event.pathId,
        details: event.details,
        mediaFormat: event.mediaFormat
      };
    } catch (err) {
      console.warn('[CloudPersistence] recordActivityEvent exception:', err);
      return null;
    }
  }

  async getActivityEvents(userId: string, limit = 100): Promise<LearningActivityItem[]> {
    if (!isSupabaseConfigured() || !supabase) return [];

    try {
      const { data, error } = await supabase
        .from('activity_events')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        console.warn('[CloudPersistence] getActivityEvents error:', error.message);
        return [];
      }

      return (data || []).map((row: DbActivityEvent) => ({
        id: row.id,
        timestamp: row.timestamp,
        type: row.event_type as LearningActivityItem['type'],
        topicId: row.topic_id,
        topicTitle: (row.payload?.topicTitle as string) || row.topic_id,
        subjectId: row.subject_id as SubjectId,
        pathId: (row.path_id as LearningPathId) || undefined,
        details: row.details || '',
        mediaFormat: (row.payload?.mediaFormat as MediaType) || undefined
      }));
    } catch (err) {
      console.warn('[CloudPersistence] getActivityEvents exception:', err);
      return [];
    }
  }

  // =========================================================================
  // 3. LEARNING SESSIONS
  // =========================================================================

  async upsertLearningSession(
    userId: string,
    session: Omit<DbLearningSession, 'user_id' | 'updated_at'>,
    ignoreDuplicates = false
  ): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const { error } = await supabase
        .from('learning_sessions')
        .upsert(
          {
            ...session,
            user_id: userId,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id,id', ignoreDuplicates }
        );

      if (error) {
        console.warn('[CloudPersistence] upsertLearningSession error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[CloudPersistence] upsertLearningSession exception:', err);
      return false;
    }
  }

  async getLearningSessions(userId: string): Promise<DbLearningSession[]> {
    if (!isSupabaseConfigured() || !supabase) return [];

    try {
      const { data, error } = await supabase
        .from('learning_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('started_at', { ascending: false });

      if (error) {
        console.warn('[CloudPersistence] getLearningSessions error:', error.message);
        return [];
      }

      return (data || []) as DbLearningSession[];
    } catch (err) {
      console.warn('[CloudPersistence] getLearningSessions exception:', err);
      return [];
    }
  }

  // =========================================================================
  // 4. SAVED RESOURCES (ADAPTIVE MEDIA)
  // =========================================================================

  async saveResource(
    userId: string, 
    resource: AdaptiveMediaResource, 
    ignoreDuplicates = false
  ): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const { error } = await supabase
        .from('saved_resources')
        .upsert(
          {
            id: resource.id,
            user_id: userId,
            topic_id: resource.topicId,
            subject_id: resource.subject,
            resource_type: resource.mediaType,
            title: resource.topicTitle,
            associated_gaps: resource.associatedGaps || [],
            content: resource.content,
            saved_at: resource.createdAt || new Date().toISOString()
          },
          { onConflict: 'user_id,id', ignoreDuplicates }
        );

      if (error) {
        console.warn('[CloudPersistence] saveResource error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[CloudPersistence] saveResource exception:', err);
      return false;
    }
  }

  async getSavedResources(userId: string): Promise<AdaptiveMediaResource[]> {
    if (!isSupabaseConfigured() || !supabase) return [];

    try {
      const { data, error } = await supabase
        .from('saved_resources')
        .select('*')
        .eq('user_id', userId)
        .order('saved_at', { ascending: false });

      if (error) {
        console.warn('[CloudPersistence] getSavedResources error:', error.message);
        return [];
      }

      return (data || []).map((row: DbSavedResource) => ({
        id: row.id,
        topicId: row.topic_id,
        subject: row.subject_id,
        topicTitle: row.title,
        associatedGaps: row.associated_gaps || [],
        mediaType: row.resource_type as MediaType,
        createdAt: row.saved_at,
        content: row.content as AdaptiveMediaResource['content'],
        generationStatus: 'completed'
      }));
    } catch (err) {
      console.warn('[CloudPersistence] getSavedResources exception:', err);
      return [];
    }
  }

  async deleteResource(userId: string, resourceId: string): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const { error } = await supabase
        .from('saved_resources')
        .delete()
        .eq('user_id', userId)
        .eq('id', resourceId);

      if (error) {
        console.warn('[CloudPersistence] deleteResource error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[CloudPersistence] deleteResource exception:', err);
      return false;
    }
  }

  // =========================================================================
  // 5. LEARNING PREFERENCES
  // =========================================================================

  async getLearningPreferences(userId: string): Promise<LearningPreference | null> {
    if (!isSupabaseConfigured() || !supabase) return null;

    try {
      const { data, error } = await supabase
        .from('learning_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.warn('[CloudPersistence] getLearningPreferences error:', error.message);
        return null;
      }
      if (!data) return null;

      const row = data as DbLearningPreference;
      return {
        primaryStyle: (row.primary_style as LearningPathId) || 'explore-experiment',
        structuredAffinity: row.structured_affinity,
        visualAffinity: row.visual_affinity,
        examplesAffinity: row.examples_affinity,
        exploreAffinity: row.explore_affinity
      };
    } catch (err) {
      console.warn('[CloudPersistence] getLearningPreferences exception:', err);
      return null;
    }
  }

  async saveLearningPreferences(userId: string, prefs: LearningPreference): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const { error } = await supabase
        .from('learning_preferences')
        .upsert(
          {
            user_id: userId,
            primary_style: prefs.primaryStyle,
            structured_affinity: prefs.structuredAffinity,
            visual_affinity: prefs.visualAffinity,
            examples_affinity: prefs.examplesAffinity,
            explore_affinity: prefs.exploreAffinity,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.warn('[CloudPersistence] saveLearningPreferences error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[CloudPersistence] saveLearningPreferences exception:', err);
      return false;
    }
  }

  // =========================================================================
  // 6. GUEST-TO-ACCOUNT IMPORT ENGINE
  // =========================================================================

  async importGuestData(userId: string, guestData: GuestDataPayload): Promise<GuestImportResult> {
    const result: GuestImportResult = {
      success: true,
      importedCounts: {
        bookmarks: 0,
        activities: 0,
        sessions: 0,
        resources: 0
      },
      errors: []
    };

    if (!isSupabaseConfigured() || !supabase) {
      return {
        success: false,
        importedCounts: result.importedCounts,
        errors: ['Supabase is not configured.']
      };
    }

    // 1. Import bookmarks (saved topics: preserve pre-existing account bookmarks and notes)
    if (guestData.bookmarks && guestData.bookmarks.length > 0) {
      const existingTopics = await this.getSavedTopics(userId);
      for (const topicId of guestData.bookmarks) {
        if (existingTopics.includes(topicId)) {
          // Pre-existing bookmark in destination account is strictly preserved without overwrite
          result.importedCounts.bookmarks += 1;
          continue;
        }
        const note = guestData.notes ? guestData.notes[topicId] : undefined;
        const ok = await this.saveTopic(userId, topicId, note);
        if (ok) {
          result.importedCounts.bookmarks += 1;
        } else {
          result.errors.push(`Failed to import bookmark: ${topicId}`);
        }
      }
    }

    // 2. Import activity events (using deterministic UUIDs for idempotency)
    if (guestData.activities && guestData.activities.length > 0) {
      for (const act of guestData.activities) {
        const deterministicId = stringToDeterministicUUID(act.id || `guest_act_${act.timestamp}_${act.topicId}`);
        const res = await this.recordActivityEvent(userId, {
          ...act,
          id: deterministicId
        });
        if (res) {
          result.importedCounts.activities += 1;
        } else {
          result.errors.push(`Failed to import activity: ${act.topicId} (${act.type})`);
        }
      }
    }

    // 3. Import topic history & learning sessions
    if (guestData.topics && Object.keys(guestData.topics).length > 0) {
      for (const [topicId, topicRecord] of Object.entries(guestData.topics)) {
        if (topicRecord.feynmanAssessments && topicRecord.feynmanAssessments.length > 0) {
          for (let i = 0; i < topicRecord.feynmanAssessments.length; i++) {
            const entry = topicRecord.feynmanAssessments[i];
            const sessionId = `feyn_import_${topicId}_${i}_${stringToDeterministicUUID(entry.recordedAt).slice(0, 8)}`;
            const ok = await this.upsertLearningSession(
              userId,
              {
                id: sessionId,
                topic_id: topicId,
                subject_id: topicRecord.subjectId,
                mode: 'feynman-technique',
                status: 'completed',
                turn_count: 3,
                duration_seconds: 180,
                history: [],
                assessment_data: entry.assessment,
                started_at: entry.recordedAt,
                completed_at: entry.recordedAt
              },
              true
            );
            if (ok) {
              result.importedCounts.sessions += 1;
            } else {
              result.errors.push(`Failed to import session: ${sessionId}`);
            }
          }
        }
      }
    }

    // 4. Import media resources (preserve pre-existing account resources)
    if (guestData.mediaResources && guestData.mediaResources.length > 0) {
      for (const res of guestData.mediaResources) {
        const ok = await this.saveResource(userId, res, true);
        if (ok) {
          result.importedCounts.resources += 1;
        } else {
          result.errors.push(`Failed to import media resource: ${res.id}`);
        }
      }
    }

    // 5. Import preferences if present
    if (guestData.preferences) {
      await this.saveLearningPreferences(userId, guestData.preferences);
    }

    result.success = result.errors.length === 0;
    return result;
  }

  // =========================================================================
  // 7. PERSONAL DATA EXPORT (JSON)
  // =========================================================================

  async exportPersonalDataAsJSON(
    userId: string,
    studentProfile?: Record<string, unknown> | null
  ): Promise<string> {
    const [bookmarks, activities, sessions, resources, preferences] = await Promise.all([
      this.getSavedTopics(userId),
      this.getActivityEvents(userId, 500),
      this.getLearningSessions(userId),
      this.getSavedResources(userId),
      this.getLearningPreferences(userId)
    ]);

    const exportPayload = {
      application: 'MULTIPATH Educational Platform',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      account: {
        userId,
        profile: studentProfile || null
      },
      learningData: {
        savedTopics: bookmarks,
        activityEvents: activities,
        learningSessions: sessions,
        savedResources: resources,
        preferences: preferences || null
      },
      privacySummary:
        'Personal learning data export provided under student data ownership and portability guarantees. Enforced via authenticated PostgreSQL Row Level Security.'
    };

    return JSON.stringify(exportPayload, null, 2);
  }
}

export const cloudPersistenceService = new CloudPersistenceService();
