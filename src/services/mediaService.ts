/**
 * Client-Side Adaptive Media Service
 * Handles format generation requests to /api/media/generate and local persistence.
 */

import type {
  MediaType,
  AdaptiveMediaResource,
  GenerateMediaResponse,
  PodcastContent,
  VideoContent,
  MindMapContent
} from '../types/media';
import { storageService } from './storageService';

const BASE_URL = '/api/media';
const STORAGE_KEY = 'multipath_adaptive_media_resources';

export class MediaService {
  /**
   * Request generation of a specific media format for the selected gaps.
   */
  async generateMedia(params: {
    format: MediaType;
    topicId: string;
    subject: string;
    topicTitle: string;
    selectedGaps: string[];
    gapDetails?: unknown;
  }): Promise<GenerateMediaResponse> {
    try {
      const res = await fetch(`${BASE_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data: GenerateMediaResponse = await res.json();
      return this.handleCompletedGeneration(data);
    } catch (err) {
      console.warn('[MediaService] Backend generation unavailable, using high-fidelity client synthesis:', err);
      return this.synthesizeClientFallback(params);
    }
  }

  private handleCompletedGeneration(data: GenerateMediaResponse): GenerateMediaResponse {
    const newResource: AdaptiveMediaResource = {
      id: data.resourceId || `res_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      topicId: data.topicId,
      subject: data.subject,
      topicTitle: data.topicTitle,
      associatedGaps: data.selectedGaps,
      mediaType: data.format,
      createdAt: data.generatedAt,
      content: data.content,
      generationStatus: 'completed'
    };
    this.persistLocally(newResource);
    storageService.saveMediaResource(newResource).catch((err) => {
      console.warn('[MediaService] storageService saveMediaResource error:', err);
    });

    return data;
  }

  private synthesizeClientFallback(params: {
    format: MediaType;
    topicId: string;
    subject: string;
    topicTitle: string;
    selectedGaps: string[];
    gapDetails?: unknown;
  }): GenerateMediaResponse {
    const primaryGap = params.selectedGaps[0] || 'core scientific invariants';
    const now = new Date().toISOString();
    const resourceId = `res_synth_${Date.now()}`;

    if (params.format === 'podcast') {
      const podcastContent: PodcastContent = {
        title: `${params.topicTitle} • Interactive Audio Overview`,
        subtitle: `Conversational educational dialogue between Devon and Maya breaking down ${params.topicTitle}.`,
        durationEstMinutes: 3,
        hosts: [
          { name: 'Devon', role: 'Inquiry Guide' },
          { name: 'Maya', role: 'Scientific Mentor' }
        ],
        targetedGaps: params.selectedGaps.length > 0 ? params.selectedGaps : ['Core Principles'],
        segments: [
          { id: 'seg_1', speaker: 'Devon', text: `Welcome to the Audio Overview on ${params.topicTitle}. Today we're breaking down this concept from first principles.` },
          { id: 'seg_2', speaker: 'Maya', text: `That's right, Devon. Most students get trapped by dry textbook definitions, but when you look at the physical reality of ${params.topicTitle}, it clicks immediately.` },
          { id: 'seg_3', speaker: 'Devon', text: `Let's focus on ${primaryGap}. Why is this so crucial in the syllabus?` },
          { id: 'seg_4', speaker: 'Maya', text: `Because every exam question and practical problem hinges on understanding this exact relationship: when one variable shifts, the system must balance out.` },
          { id: 'seg_5', speaker: 'Devon', text: `So when students apply this in real life, they can predict what happens before calculating a single formula.` },
          { id: 'seg_6', speaker: 'Maya', text: `Exactly! Master the intuition first, and the mathematics becomes simple common sense.` }
        ]
      };

      const result: GenerateMediaResponse = {
        format: 'podcast',
        topicId: params.topicId,
        subject: params.subject,
        topicTitle: params.topicTitle,
        selectedGaps: params.selectedGaps,
        generatedAt: now,
        isDemonstrationMode: true,
        resourceId,
        content: podcastContent
      };
      return this.handleCompletedGeneration(result);
    } else if (params.format === 'video') {
      const videoContent: VideoContent = {
        title: `${params.topicTitle} • Diagrammatic Video Overview`,
        topicId: params.topicId,
        subject: params.subject,
        durationSeconds: 120,
        totalScenes: 3,
        targetedGaps: params.selectedGaps.length > 0 ? params.selectedGaps : ['Visual Modeling'],
        scenes: [
          {
            id: 'scene_1',
            sceneNumber: 1,
            title: 'Visual Architecture & Balance',
            durationSeconds: 40,
            visualType: 'balance',
            visualData: {
              isBalanced: true,
              callout: `Spatial visualization of ${params.topicTitle}`
            },
            narration: `Observe the foundational architecture of ${params.topicTitle}. In this baseline state, all opposing forces and quantities are in balance.`,
            keyTakeaway: 'The system begins in stable equilibrium.'
          },
          {
            id: 'scene_2',
            sceneNumber: 2,
            title: 'Dynamic Perturbation & Reaction',
            durationSeconds: 40,
            visualType: 'chart',
            visualData: {
              callout: 'Dynamic response curves'
            },
            narration: `Now watch the reaction curve when we introduce a dynamic perturbation. Notice how the system compensates proportionally.`,
            keyTakeaway: 'Response magnitude scales directly with the applied change.'
          },
          {
            id: 'scene_3',
            sceneNumber: 3,
            title: 'Real-World System Synthesis',
            durationSeconds: 40,
            visualType: 'flow',
            visualData: {
              callout: 'Real-world application mapping'
            },
            narration: `By linking this diagrammatic insight to real-world applications, you can solve complex syllabus problems with complete confidence.`,
            keyTakeaway: 'First-principles intuition eliminates exam anxiety.'
          }
        ]
      };

      const result: GenerateMediaResponse = {
        format: 'video',
        topicId: params.topicId,
        subject: params.subject,
        topicTitle: params.topicTitle,
        selectedGaps: params.selectedGaps,
        generatedAt: now,
        isDemonstrationMode: true,
        resourceId,
        content: videoContent
      };
      return this.handleCompletedGeneration(result);
    } else {
      // Mindmap
      const mindMapContent: MindMapContent = {
        title: `${params.topicTitle} • Mind Map`,
        root: {
          id: 'root',
          label: params.topicTitle,
          subLabel: params.subject,
          description: 'Core conceptual node',
          type: 'core'
        },
        branches: [
          {
            id: 'branch_1',
            label: 'First Principles',
            color: '#10b981',
            relationToRoot: 'derives',
            nodes: [
              { id: 'node_1', label: 'Fundamental Invariants', description: 'Underlying laws and physical equations' }
            ]
          },
          {
            id: 'branch_2',
            label: 'Key Applications',
            color: '#3b82f6',
            relationToRoot: 'applies_to',
            nodes: [
              { id: 'node_2', label: 'Real-World Mechanics', description: 'Real-world manifestation and problem solving' }
            ]
          }
        ],
        connections: [
          { fromId: 'root', toId: 'node_1', label: 'governed by' },
          { fromId: 'root', toId: 'node_2', label: 'manifests in' }
        ]
      };
      const result: GenerateMediaResponse = {
        format: 'mindmap',
        topicId: params.topicId,
        subject: params.subject,
        topicTitle: params.topicTitle,
        selectedGaps: params.selectedGaps,
        generatedAt: now,
        isDemonstrationMode: true,
        resourceId,
        content: mindMapContent
      };
      return this.handleCompletedGeneration(result);
    }
  }

  /**
   * Get all persistent resources for a specific topic.
   * Prioritizes IndexedDB via storageService with LocalStorage fallback.
   */
  async getTopicResources(topicId: string): Promise<AdaptiveMediaResource[]> {
    // 1. Primary source: IndexedDB (with LocalStorage fallback inside storageService)
    try {
      const idbResources = await storageService.getAllMediaResources();
      const topicMatches = idbResources.filter((r) => r.topicId === topicId);
      if (topicMatches.length > 0) {
        return topicMatches;
      }
    } catch (err) {
      console.warn('[MediaService] storageService retrieval exception:', err);
    }

    // 2. Secondary fallback: direct LocalStorage query
    const local = this.getAllLocalResources().filter((r) => r.topicId === topicId);
    if (local.length > 0) {
      return local;
    }

    // 3. Background server query if local cache is empty
    try {
      const res = await fetch(`${BASE_URL}/resources?topicId=${encodeURIComponent(topicId)}`);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.resources) && json.resources.length > 0) {
          for (const item of json.resources) {
            this.persistLocally(item);
            storageService.saveMediaResource(item).catch(() => {});
          }
          return json.resources;
        }
      }
    } catch {
      // Fallback silently
    }

    return [];
  }

  /**
   * Deletes a resource across LocalStorage and IndexedDB.
   */
  async deleteResource(resourceId: string): Promise<boolean> {
    this.deleteLocalResource(resourceId);
    return storageService.deleteMediaResource(resourceId);
  }

  deleteLocalResource(resourceId: string): void {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getAllLocalResources().filter((r) => r.id !== resourceId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.warn('[MediaService] deleteLocalResource error:', e);
    }
  }

  /**
   * Saves a resource to local storage and syncs to server.
   */
  persistLocally(resource: AdaptiveMediaResource): void {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getAllLocalResources();
      const existingIdx = current.findIndex((r) => r.id === resource.id);
      if (existingIdx >= 0) {
        current[existingIdx] = resource;
      } else {
        current.unshift(resource);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.warn('[MediaService] Local storage save failed:', e);
    }
  }

  getAllLocalResources(): AdaptiveMediaResource[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }


}

export const mediaService = new MediaService();
