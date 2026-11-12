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
