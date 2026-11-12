/**
 * Standalone Production Server for MULTIPATH
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { discoveryRouter } from './discoveryRouter.js';
import { feynmanRouter } from './feynmanRouter.js';
import { mediaRouter } from './mediaRouter.js';
import { geminiService } from './geminiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '500kb' }));

// API Routes
app.use('/api/discovery', discoveryRouter);
app.use('/api/feynman', feynmanRouter);
app.use('/api/media', mediaRouter);

// Health check
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Multipath Educational API',
    uptime: process.uptime(),
    geminiConfigured: geminiService.isConfigured(),
    model: geminiService.model,
    mode: geminiService.isConfigured()
      ? `Live Gemini AI (${geminiService.model})`
      : 'Demonstration Mode',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static build in production
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[MULTIPATH Server] Running on http://localhost:${PORT}`);
  console.log(`[MULTIPATH Server] Guided Discovery API available at /api/discovery`);
});
