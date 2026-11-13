import type { LearningActivityItem, TopicHistoryRecord } from './history';
import type { AdaptiveMediaResource } from './media';
import type { LearningPreference } from './session';

export interface DbSavedTopic {
  id: string;
  user_id: string;
  topic_id: string;
  notes?: string | null;
  created_at: string;
}

export interface DbActivityEvent {
  id: string;
  user_id: string;
  event_type: string;
  topic_id: string;
  subject_id: string;
  path_id?: string | null;
  details?: string | null;
  payload: Record<string, unknown>;
  schema_version: number;
  timestamp: string;
}

export interface DbLearningSession {
  id: string;
  user_id: string;
  topic_id: string;
  subject_id: string;
  mode: 'socratic-discovery' | 'feynman-technique';
  status:
    | 'planned'
    | 'started'
    | 'paused'
    | 'completed'
    | 'partially_completed'
    | 'abandoned'
    | 'skipped'
    | 'invalidated';
  turn_count: number;
  duration_seconds: number;
  history: unknown[];
  assessment_data?: unknown | null;
  started_at: string;
  completed_at?: string | null;
  updated_at: string;
}

export interface DbSavedResource {
  id: string;
  user_id: string;
  topic_id: string;
  subject_id: string;
  resource_type: 'mindmap' | 'podcast' | 'video';
  title: string;
  associated_gaps: string[];
  content: unknown;
  saved_at: string;
}

export interface DbLearningPreference {
  user_id: string;
  primary_style: string;
  structured_affinity: number;
  visual_affinity: number;
  examples_affinity: number;
  explore_affinity: number;
  updated_at: string;
}

export interface GuestDataPayload {
  bookmarks: string[];
  activities: LearningActivityItem[];
  topics: Record<string, TopicHistoryRecord>;
  mediaResources: AdaptiveMediaResource[];
  preferences?: LearningPreference;
  notes?: Record<string, string>;
}

export interface GuestDataSummary {
  bookmarksCount: number;
  activitiesCount: number;
  sessionsCount: number;
  resourcesCount: number;
  hasData: boolean;
}

export interface GuestImportResult {
  success: boolean;
  importedCounts: {
    bookmarks: number;
    activities: number;
    sessions: number;
    resources: number;
  };
  errors: string[];
}
