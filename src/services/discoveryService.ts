/**
 * Client-Side API Client for Guided Discovery
 * Communicates with /api/discovery endpoints.
 */

import type {
  StartSessionResponse,
  RespondResponse,
  HintResponse,
  SolutionResponse,
  DiscoverySession
} from '../types/discovery';

const BASE_URL = '/api/discovery';

export class DiscoveryService {
  async startSession(params: {
    topicId: string;
    subject: string;
    topicTitle: string;
    initialQuestion?: string;
  }): Promise<StartSessionResponse> {
    const res = await fetch(`${BASE_URL}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to start session' }));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    return res.json();
  }

  async submitResponse(
    sessionId: string,
    studentMessage: string,
    sessionContext?: DiscoverySession | null
  ): Promise<RespondResponse> {
    const res = await fetch(`${BASE_URL}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        studentMessage,
        session: sessionContext || undefined
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to process response' }));
      const error = new Error(err.error || `HTTP error ${res.status}`);
      (error as Error & { code?: string }).code = err.code;
      throw error;
    }

    return res.json();
  }

  async requestHint(
    sessionId: string,
    sessionContext?: DiscoverySession | null
  ): Promise<HintResponse> {
    const res = await fetch(`${BASE_URL}/hint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        session: sessionContext || undefined
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to request hint' }));
      const error = new Error(err.error || `HTTP error ${res.status}`);
      (error as Error & { code?: string }).code = err.code;
      throw error;
    }

    return res.json();
  }

  async requestSolution(
    sessionId: string,
    sessionContext?: DiscoverySession | null
  ): Promise<SolutionResponse> {
    const res = await fetch(`${BASE_URL}/solution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        session: sessionContext || undefined
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to request solution' }));
      const error = new Error(err.error || `HTTP error ${res.status}`);
      (error as Error & { code?: string }).code = err.code;
      throw error;
    }

    return res.json();
  }

  async checkHealth(): Promise<{ status: string; geminiConfigured: boolean; mode: string }> {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      if (res.ok) return res.json();
      return { status: 'error', geminiConfigured: false, mode: 'Unavailable' };
    } catch {
      return { status: 'offline', geminiConfigured: false, mode: 'Offline' };
    }
  }
}

export const discoveryService = new DiscoveryService();
