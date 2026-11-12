import express from 'express';
import cors from 'cors';
import { discoveryRouter } from '../server/discoveryRouter.js';
import { feynmanRouter } from '../server/feynmanRouter.js';
import { mediaRouter } from '../server/mediaRouter.js';
import { geminiService } from '../server/geminiService.js';

const app = express();

// Security: Constrained CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim())
  : [
      'https://multipath-one.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:3001'
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. serverless internal, curl, mobile clients)
      if (!origin) return callback(null, true);
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.startsWith('http://localhost:');
      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Not an authorized origin.'));
    },
    credentials: true
  })
);

// Security: Enforce 500kb max request body size to guard against payload flooding
app.use(express.json({ limit: '500kb' }));

// Security: In-memory sliding-window rate limiter per serverless instance
// NOTE: This guards individual serverless instance lifecycles. On Vercel's distributed
// multi-region infrastructure, an external KV / Redis store (e.g. Upstash) is recommended
// if strict global cluster-wide rate coordination is required.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 reqs/min per IP

function rateLimiter(req, res, next) {
  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'anonymous';

  const now = Date.now();
  const clientData = rateLimitMap.get(clientIp) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > clientData.resetAt) {
    clientData.count = 0;
    clientData.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  clientData.count++;
  rateLimitMap.set(clientIp, clientData);

  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS_PER_WINDOW - clientData.count));
  res.setHeader('X-RateLimit-Scope', 'per-instance');

  if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Too many requests. Please slow down and try again later.',
      retryAfterSeconds: Math.ceil((clientData.resetAt - now) / 1000)
    });
  }

  next();
}

app.use(rateLimiter);

// Routing: Mount routers with both /api/... and root prefixes to guarantee
// correct resolution across Vercel rewrite variations
app.use('/api/discovery', discoveryRouter);
app.use('/discovery', discoveryRouter);

app.use('/api/feynman', feynmanRouter);
app.use('/feynman', feynmanRouter);

app.use('/api/media', mediaRouter);
app.use('/media', mediaRouter);

// Health check endpoint
const healthHandler = (req, res) => {
  res.json({
    status: 'healthy',
    service: 'MULTIPATH Educational Platform API (Vercel Serverless)',
    geminiConfigured: geminiService.isConfigured(),
    model: geminiService.model,
    mode: geminiService.isConfigured()
      ? `Live Gemini AI (${geminiService.model})`
      : 'Demonstration Mode',
    timestamp: new Date().toISOString()
  });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

export default app;

