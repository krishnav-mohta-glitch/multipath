import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import express from 'express'
// @ts-expect-error - server router module written in ESM JS
import { discoveryRouter } from './server/discoveryRouter.js'
// @ts-expect-error - server router module written in ESM JS
import { feynmanRouter } from './server/feynmanRouter.js'
// @ts-expect-error - server router module written in ESM JS
import { mediaRouter } from './server/mediaRouter.js'

function discoveryApiPlugin(): Plugin {
  return {
    name: 'multipath-apis',
    configureServer(server) {
      const app = express();
      app.use(express.json());
      app.use('/api/discovery', discoveryRouter);
      app.use('/api/feynman', feynmanRouter);
      app.use('/api/media', mediaRouter);
      server.middlewares.use(app);
    },
    configurePreviewServer(server) {
      const app = express();
      app.use(express.json());
      app.use('/api/discovery', discoveryRouter);
      app.use('/api/feynman', feynmanRouter);
      app.use('/api/media', mediaRouter);
      server.middlewares.use(app);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), discoveryApiPlugin()],
})
