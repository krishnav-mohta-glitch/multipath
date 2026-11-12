/**
 * Client-Side API Client for Feynman Mode
 * Communicates with /api/feynman endpoints.
 */

import type {
  StartFeynmanResponse,
  FeynmanTurnResponse,
  FeynmanAssessmentResponse,
  AdaptiveMediaPayload,
  FeynmanSession
} from '../types/feynman';

const BASE_URL = '/api/feynman';

export class FeynmanService {
  async startSession(params: {
    topicId: string;
    subject: string;
    topicTitle: string;
    learningObjectives: string[];
    initialExplanation?: string;
  }): Promise<StartFeynmanResponse> {
    const res = await fetch(`${BASE_URL}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to start Feynman session' }));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    return res.json();
  }

  async submitExplanation(
    sessionId: string,
    studentExplanation: string,
    sessionContext?: FeynmanSession | null
  ): Promise<FeynmanTurnResponse> {
    const res = await fetch(`${BASE_URL}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        studentExplanation,
        session: sessionContext || undefined
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to submit explanation' }));
      const error = new Error(err.error || `HTTP error ${res.status}`);
      (error as Error & { code?: string }).code = err.code;
      throw error;
    }

    return res.json();
  }

  async requestAssessment(
    sessionId: string,
    sessionContext?: FeynmanSession | null
  ): Promise<FeynmanAssessmentResponse> {
    const res = await fetch(`${BASE_URL}/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        session: sessionContext || undefined
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate assessment' }));
      const error = new Error(err.error || `HTTP error ${res.status}`);
      (error as Error & { code?: string }).code = err.code;
      throw error;
    }

    return res.json();
  }

  async getAdaptiveMediaPayload(sessionId: string): Promise<{ readyForMediaGeneration: boolean; payload: AdaptiveMediaPayload }> {
    const res = await fetch(`${BASE_URL}/adaptive-media/${sessionId}`);

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to retrieve media payload' }));
      throw new Error(err.error || `HTTP error ${res.status}`);
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

export const feynmanService = new FeynmanService();
