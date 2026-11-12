/**
 * Client-Side Adaptive Media Service
 * Handles format generation requests to /api/media/generate and local persistence.
 */

import type {
  MediaType,
  AdaptiveMediaResource,
  GenerateMediaResponse
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
    const res = await fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Media generation failed.' }));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data: GenerateMediaResponse = await res.json();

    // Cache in local storage and IndexedDB for instant retrieval and activity logging
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

  /**
   * Get all persistent resources for a specific topic.
   */
  async getTopicResources(topicId: string): Promise<AdaptiveMediaResource[]> {
    // 1. Try fetching from server
    try {
      const res = await fetch(`${BASE_URL}/resources?topicId=${encodeURIComponent(topicId)}`);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.resources) && json.resources.length > 0) {
          // Merge with local storage
          for (const item of json.resources) {
            this.persistLocally(item);
          }
        }
      }
    } catch {
      // Fallback silently to localStorage
    }

    // 2. Return from localStorage
    const local = this.getAllLocalResources();
    return local.filter((r) => r.topicId === topicId);
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

  deleteResource(resourceId: string): void {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getAllLocalResources();
      const updated = current.filter((r) => r.id !== resourceId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('[MediaService] Local delete failed:', e);
    }
  }
}

export const mediaService = new MediaService();
