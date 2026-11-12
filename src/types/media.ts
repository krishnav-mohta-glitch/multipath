/**
 * TypeScript Definitions for MULTIPATH Phase 5 Adaptive Media Generation
 */

export type MediaType = 'mindmap' | 'podcast' | 'video';

// --- Mind Map Interfaces ---
export interface MindMapNode {
  id: string;
  label: string;
  description: string;
  isRemediationFocus?: boolean;
  misconceptionWarning?: string;
  evidenceQuote?: string;
}

export interface MindMapBranch {
  id: string;
  label: string;
  color: string;
  relationToRoot: string;
  nodes: MindMapNode[];
}

export interface MindMapConnection {
  fromId: string;
  toId: string;
  label: string;
}

export interface MindMapContent {
  title: string;
  root: {
    id: string;
    label: string;
    subLabel: string;
    description: string;
    type: string;
  };
  branches: MindMapBranch[];
  connections: MindMapConnection[];
}

// --- Podcast Interfaces ---
export interface PodcastSegment {
  id: string;
  speaker: string;
  text: string;
  focusGap?: string;
  audioCue?: string;
}

export interface PodcastContent {
  title: string;
  subtitle: string;
  durationEstMinutes: number;
  hosts: Array<{ name: string; role: string }>;
  targetedGaps: string[];
  segments: PodcastSegment[];
}

// --- Video Storyboard Interfaces ---
export interface VideoScene {
  id: string;
  sceneNumber: number;
  title: string;
  durationSeconds: number;
  narration: string;
  visualType: string;
  visualData: {
    leftWeight?: string;
    rightWeight?: string;
    removedWeight?: string;
    beamAngle?: number;
    isBalanced?: boolean;
    callout?: string;
    membrane?: string;
    input?: string;
    outputs?: string[];
    colorFilter?: string;
    engine?: string;
    carriers?: string[];
    status?: string;
    location?: string;
    inputs?: string[];
    output?: string;
    enzyme?: string;
    focus?: string;
    note?: string;
    [key: string]: unknown;
  };
  keyTakeaway: string;
}

export interface VideoContent {
  title: string;
  topicId: string;
  subject: string;
  durationSeconds: number;
  totalScenes: number;
  targetedGaps: string[];
  scenes: VideoScene[];
}

// --- Unified Resource Persistence Record ---
export interface AdaptiveMediaResource {
  id: string;
  topicId: string;
  subject: string;
  topicTitle: string;
  associatedGaps: string[];
  mediaType: MediaType;
  createdAt: string;
  content: MindMapContent | PodcastContent | VideoContent;
  generationStatus: 'completed' | 'generating' | 'failed';
}

export interface GenerateMediaResponse {
  format: MediaType;
  topicId: string;
  subject: string;
  topicTitle: string;
  selectedGaps: string[];
  content: MindMapContent | PodcastContent | VideoContent;
  generatedAt: string;
  isDemonstrationMode: boolean;
  resourceId?: string;
}
