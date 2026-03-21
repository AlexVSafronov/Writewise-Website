/**
 * Production entry point — used by `vite-ssg build` (npm run build:ssg).
 *
 * vite-ssg calls the exported `createApp` factory:
 *   • During the SSG build pass (Node.js) to render each route to static HTML.
 *   • In the browser to hydrate the pre-rendered HTML on first load.
 *
 * The dev server (npm run dev) uses main.tsx instead.
 */
import { ViteSSG } from 'vite-ssg/react';
import { hydrate } from '@tanstack/react-query';
import App from './App';
import { routes } from './routes';
import { queryClient } from './lib/queryClient';
import { initGA } from './lib/analytics';
import './index.css';

export const createApp = ViteSSG(
  App,
  { routes },
  ({ isClient, initialState }) => {
    if (!isClient) return; // SSG pass — nothing to do; data is prefetched in vite.config.ts

    // ── Browser hydration ──────────────────────────────────────────────────────

    // Restore the React Query cache that was pre-fetched during SSG.
    // vite-ssg serialises `initialState` into window.__VITE_SSG_CONTEXT__ in
    // the HTML, so this data is available synchronously before React mounts.
    if (initialState.reactQueryState) {
      try {
        hydrate(queryClient, initialState.reactQueryState);
      } catch (e) {
        // Non-fatal: React Query will fetch fresh data on first render
        console.warn('Failed to hydrate React Query cache:', e);
      }
    }

    // Initialise GA4 page-view tracking (browser only).
    initGA();
  },
);
