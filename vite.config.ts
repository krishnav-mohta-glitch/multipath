import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import express from 'express'
// @ts-expect-error - server router module written in ESM JS
import { discoveryRouter } from './server/discoveryRouter.js'
// @ts-expect-error - server router module written in ESM JS
import { feynmanRouter } from './server/feynmanRouter.js'
// @ts-expect-error - server router module written in ESM JS
import { mediaRouter } from './server/mediaRouter.js'
// @ts-expect-error - server gemini module written in ESM JS
import { geminiService } from './server/geminiService.js'

function discoveryApiPlugin(): Plugin {
  const mountApp = () => {
    const app = express();
    app.use(express.json({ limit: '500kb' }));
    app.use('/api/discovery', discoveryRouter);
    app.use('/api/feynman', feynmanRouter);
    app.use('/api/media', mediaRouter);
    app.get('/api/health', (_req, res) => {
      res.json({
        status: 'healthy',
        service: 'MULTIPATH Educational Platform API (Vite Dev Server)',
        geminiConfigured: geminiService.isConfigured(),
        model: geminiService.model,
        mode: geminiService.isConfigured()
          ? `Live Gemini AI (${geminiService.model})`
          : 'Demonstration Mode',
        timestamp: new Date().toISOString()
      });
    });
    return app;
  };

  return {
    name: 'multipath-apis',
    configureServer(server) {
      server.middlewares.use(mountApp());
    },
    configurePreviewServer(server) {
      server.middlewares.use(mountApp());
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), discoveryApiPlugin()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@supabase/')) {
            return 'vendor-supabase';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('src/data/topics.ts')) {
            return 'curriculum-topics';
          }
          if (id.includes('src/data/curriculum')) {
            return 'curriculum-catalog';
          }
        },
      },
    },
  },
})
