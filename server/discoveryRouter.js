/**
 * Guided Discovery API Router
 * Exposes endpoints for Socratic tutoring sessions, responses, progressive hints, and complete solutions.
 */

import express from 'express';
import { socraticEngine } from './socraticEngine.js';
import { geminiService } from './geminiService.js';

export const discoveryRouter = express.Router();

// Input sanitization / validation helper
function sanitizeString(input, maxLength = 1000) {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

/**
 * Health check & status endpoint
 */
discoveryRouter.get('/health', (req, res) => {
  const isConfigured = geminiService.isConfigured();
  res.json({
    status: 'ok',
    geminiConfigured: isConfigured,
    mode: isConfigured ? 'Live Gemini AI' : 'Demonstration Mode',
    timestamp: new Date().toISOString()
  });
});

/**
 * Start a new Guided Discovery session
 * POST /api/discovery/start
 * Body: { topicId, subject, topicTitle, initialQuestion }
 */
discoveryRouter.post('/start', (req, res) => {
  try {
    const { topicId, subject, topicTitle, initialQuestion } = req.body || {};

    if (!topicId || !subject) {
      return res.status(400).json({ error: 'Missing required fields: topicId and subject are required.' });
    }

    const cleanTopicId = sanitizeString(topicId, 100);
    const cleanSubject = sanitizeString(subject, 100);
    const cleanTopicTitle = sanitizeString(topicTitle || 'Topic', 200);
    const cleanQuestion = sanitizeString(initialQuestion || '', 500);

    const sessionData = socraticEngine.startSession({
      topicId: cleanTopicId,
      subject: cleanSubject,
      topicTitle: cleanTopicTitle,
      initialQuestion: cleanQuestion
    });

    return res.json(sessionData);
  } catch (error) {
    console.error('[discoveryRouter] Error in /start:', error);
    return res.status(500).json({ error: 'Failed to initiate Guided Discovery session.' });
  }
});

/**
 * Submit student response
 * POST /api/discovery/respond
 * Body: { sessionId, studentMessage }
 */
discoveryRouter.post('/respond', async (req, res) => {
  try {
    const { sessionId, studentMessage } = req.body || {};

    if (!sessionId || !studentMessage) {
      return res.status(400).json({ error: 'Missing sessionId or studentMessage.' });
    }

    const cleanSessionId = sanitizeString(sessionId, 100);
    const cleanMessage = sanitizeString(studentMessage, 2000);

    if (cleanMessage.length === 0) {
      return res.status(400).json({ error: 'Student message cannot be empty.' });
    }

    const result = await socraticEngine.processTurn({
      sessionId: cleanSessionId,
      studentMessage: cleanMessage
    });

    return res.json(result);
  } catch (error) {
    console.error('[discoveryRouter] Error in /respond:', error);
    return res.status(500).json({ error: 'Failed to process Socratic response.' });
  }
});

/**
 * Request progressive hint
 * POST /api/discovery/hint
 * Body: { sessionId }
 */
discoveryRouter.post('/hint', async (req, res) => {
  try {
    const { sessionId } = req.body || {};

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId.' });
    }

    const cleanSessionId = sanitizeString(sessionId, 100);
    const hintData = await socraticEngine.provideHint({ sessionId: cleanSessionId });

    if (hintData.error) {
      return res.status(404).json(hintData);
    }

    return res.json(hintData);
  } catch (error) {
    console.error('[discoveryRouter] Error in /hint:', error);
    return res.status(500).json({ error: 'Failed to retrieve hint.' });
  }
});

/**
 * Request complete solution
 * POST /api/discovery/solution
 * Body: { sessionId }
 */
discoveryRouter.post('/solution', async (req, res) => {
  try {
    const { sessionId } = req.body || {};

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId.' });
    }

    const cleanSessionId = sanitizeString(sessionId, 100);
    const solutionData = await socraticEngine.provideSolution({ sessionId: cleanSessionId });

    if (solutionData.error) {
      return res.status(404).json(solutionData);
    }

    return res.json(solutionData);
  } catch (error) {
    console.error('[discoveryRouter] Error in /solution:', error);
    return res.status(500).json({ error: 'Failed to retrieve complete solution.' });
  }
});
