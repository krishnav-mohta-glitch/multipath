/**
 * Adaptive Media API Router
 * Exposes endpoints for generating Mind Maps, Podcasts, and Explainer Video storyboards,
 * and managing persistent media resources.
 */

import express from 'express';
import { mediaEngine } from './mediaEngine.js';
import { geminiService } from './geminiService.js';

export const mediaRouter = express.Router();

function sanitizeString(input, maxLength = 200) {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

/**
 * Health check
 */
mediaRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Adaptive Media Generation Engine',
    geminiConfigured: geminiService.isConfigured(),
    timestamp: new Date().toISOString()
  });
});

/**
 * Generate a specific media format
 * POST /api/media/generate
 * Body: { format: 'mindmap' | 'podcast' | 'video', topicId, subject, topicTitle, selectedGaps, gapDetails }
 */
mediaRouter.post('/generate', async (req, res) => {
  try {
    const { format, topicId, subject, topicTitle, selectedGaps, gapDetails } = req.body || {};

    if (!format || !topicId) {
      return res.status(400).json({ error: 'Missing required parameters: format and topicId.' });
    }

    const cleanFormat = sanitizeString(format, 20).toLowerCase();
    const cleanTopicId = sanitizeString(topicId, 100);
    const cleanSubject = sanitizeString(subject || 'general', 100);
    const cleanTopicTitle = sanitizeString(topicTitle || 'Topic', 200);

    const gapsList = Array.isArray(selectedGaps) ? selectedGaps : [];

    let result;
    if (cleanFormat === 'mindmap') {
      result = await mediaEngine.generateMindMap({
        topicId: cleanTopicId,
        subject: cleanSubject,
        topicTitle: cleanTopicTitle,
        selectedGaps: gapsList,
        gapDetails
      });
    } else if (cleanFormat === 'podcast') {
      result = await mediaEngine.generatePodcast({
        topicId: cleanTopicId,
        subject: cleanSubject,
        topicTitle: cleanTopicTitle,
        selectedGaps: gapsList,
        gapDetails
      });
    } else if (cleanFormat === 'video') {
      result = await mediaEngine.generateVideoStoryboard({
        topicId: cleanTopicId,
        subject: cleanSubject,
        topicTitle: cleanTopicTitle,
        selectedGaps: gapsList,
        gapDetails
      });
    } else {
      return res.status(400).json({ error: `Unsupported media format: ${format}. Supported formats: mindmap, podcast, video.` });
    }

    // Automatically register generated resource in server cache
    const saved = mediaEngine.saveResource({
      topicId: cleanTopicId,
      subject: cleanSubject,
      topicTitle: cleanTopicTitle,
      associatedGaps: gapsList,
      mediaType: cleanFormat,
      content: result.content,
      generationStatus: 'completed'
    });

    return res.json({
      ...result,
      resourceId: saved.id
    });
  } catch (error) {
    console.error('[mediaRouter] Error in /generate:', error);
    return res.status(500).json({ error: 'Failed to generate adaptive media resource.' });
  }
});

/**
 * Get saved resources by topic
 * GET /api/media/resources?topicId=...
 */
mediaRouter.get('/resources', (req, res) => {
  try {
    const { topicId } = req.query;
    if (topicId && typeof topicId === 'string') {
      const resources = mediaEngine.getResourcesByTopic(topicId);
      return res.json({ resources });
    }
    const all = mediaEngine.getAllResources();
    return res.json({ resources: all });
  } catch (error) {
    console.error('[mediaRouter] Error in /resources:', error);
    return res.status(500).json({ error: 'Failed to retrieve saved resources.' });
  }
});

/**
 * Save / cache an existing resource
 * POST /api/media/resources
 */
mediaRouter.post('/resources', (req, res) => {
  try {
    const resource = req.body;
    if (!resource || !resource.topicId || !resource.mediaType) {
      return res.status(400).json({ error: 'Invalid resource data.' });
    }
    const saved = mediaEngine.saveResource(resource);
    return res.json({ resource: saved });
  } catch (error) {
    console.error('[mediaRouter] Error saving resource:', error);
    return res.status(500).json({ error: 'Failed to save resource.' });
  }
});
