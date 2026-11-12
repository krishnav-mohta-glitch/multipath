import express from 'express';
import cors from 'cors';
import { discoveryRouter } from '../server/discoveryRouter.js';
import { feynmanRouter } from '../server/feynmanRouter.js';
import { mediaRouter } from '../server/mediaRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routers
app.use('/api/discovery', discoveryRouter);
app.use('/api/feynman', feynmanRouter);
app.use('/api/media', mediaRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'MULTIPATH Educational Platform API (Vercel Serverless)',
    timestamp: new Date().toISOString()
  });
});

export default app;
