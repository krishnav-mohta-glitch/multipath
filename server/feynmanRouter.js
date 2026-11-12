/**
 * Feynman Mode API Router
 * Exposes endpoints for student-as-teacher sessions, curious learner dialogues,
 * 6-dimension diagnostic assessments, and Adaptive Media payloads.
 */

import express from 'express';
import { feynmanEngine } from './feynmanEngine.js';
import { geminiService } from './geminiService.js';

export const feynmanRouter = express.Router();

function sanitizeString(input, maxLength = 3000) {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

/**
 * Health check & status
 */
feynmanRouter.get('/health', (req, res) => {
  const isConfigured = geminiService.isConfigured();
  res.json({
    status: 'ok',
    service: 'Feynman Mode Curious Learner API',
    geminiConfigured: isConfigured,
    mode: isConfigured ? 'Live Gemini AI' : 'Demonstration Mode',
    timestamp: new Date().toISOString()
  });
});

/**
 * Start a new Feynman Mode teaching session
 * POST /api/feynman/start
 */
feynmanRouter.post('/start', async (req, res) => {
  try {
    const { topicId, subject, topicTitle, learningObjectives, initialExplanation } = req.body || {};

    if (!topicId || !topicTitle) {
      return res.status(400).json({ error: 'Missing topicId or topicTitle' });
    }

    const cleanTopicId = sanitizeString(topicId, 100);
    const cleanSubject = sanitizeString(subject || 'general', 100);
    const cleanTopicTitle = sanitizeString(topicTitle, 200);
    const cleanExplanation = sanitizeString(initialExplanation || '', 3000);
    const cleanObjectives = Array.isArray(learningObjectives)
      ? learningObjectives.map(o => sanitizeString(o, 300)).filter(Boolean)
      : [];

    const result = await feynmanEngine.startSession({
      topicId: cleanTopicId,
      subject: cleanSubject,
      topicTitle: cleanTopicTitle,
      learningObjectives: cleanObjectives,
      initialExplanation: cleanExplanation
    });

    return res.json(result);
  } catch (error) {
    console.error('[feynmanRouter] Error in /start:', error);
    return res.status(500).json({ error: 'Failed to initiate Feynman session.' });
  }
});

/**
 * Submit student teaching explanation/turn
 * POST /api/feynman/respond
 */
feynmanRouter.post('/respond', async (req, res) => {
  try {
    const { sessionId, studentExplanation } = req.body || {};

    if (!sessionId || !studentExplanation) {
      return res.status(400).json({ error: 'Missing sessionId or studentExplanation.' });
    }

    const cleanSessionId = sanitizeString(sessionId, 100);
    const cleanExplanation = sanitizeString(studentExplanation, 3000);

    if (cleanExplanation.length === 0) {
      return res.status(400).json({ error: 'Explanation cannot be empty.' });
    }

    const result = await feynmanEngine.processTurn({
      sessionId: cleanSessionId,
      studentExplanation: cleanExplanation
    });

    return res.json(result);
  } catch (error) {
    console.error('[feynmanRouter] Error in /respond:', error);
    return res.status(500).json({ error: 'Failed to process student explanation.' });
  }
});

/**
 * Trigger diagnostic assessment & knowledge gap report
 * POST /api/feynman/assess
 */
feynmanRouter.post('/assess', async (req, res) => {
  try {
    const { sessionId } = req.body || {};

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId.' });
    }

    const cleanSessionId = sanitizeString(sessionId, 100);
    const assessmentResult = await feynmanEngine.generateAssessment({ sessionId: cleanSessionId });

    if (assessmentResult.error) {
      return res.status(400).json(assessmentResult);
    }

    return res.json(assessmentResult);
  } catch (error) {
    console.error('[feynmanRouter] Error in /assess:', error);
    return res.status(500).json({ error: 'Failed to generate Feynman assessment.' });
  }
});

/**
 * Retrieve Adaptive Media payload for Phase 5
 * GET /api/feynman/adaptive-media/:sessionId
 */
feynmanRouter.get('/adaptive-media/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const cleanSessionId = sanitizeString(sessionId, 100);

    const payloadResult = feynmanEngine.getAdaptiveMediaPayload({ sessionId: cleanSessionId });

    if (payloadResult.error) {
      return res.status(404).json(payloadResult);
    }

    return res.json(payloadResult);
  } catch (error) {
    console.error('[feynmanRouter] Error in /adaptive-media:', error);
    return res.status(500).json({ error: 'Failed to retrieve adaptive media payload.' });
  }
});
