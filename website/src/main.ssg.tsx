/**
 * Production entry point — used by `vite-react-ssg build` (npm run build:ssg).
 *
 * vite-react-ssg calls the exported `createRoot` factory:
 *   • During the SSG build pass (Node.js) to render each route to static HTML.
 *   • In the browser to hydrate the pre-rendered HTML on first load.
 *
 * The dev server (npm run dev) uses main.tsx instead.
 */
import { ViteReactSSG } from 'vite-react-ssg';
import { hydrate } from '@tanstack/react-query';
import App from './App';
import { routes } from './routes';
import { queryClient } from './lib/queryClient';
import { initGA } from './lib/analytics';
import './index.css';

export const createRoot = ViteReactSSG(
  App,
  { routes },
  ({ isClient, initialState }) => {
    if (!isClient) return; // SSG pass — nothing to do; data is prefetched in vite.config.ts

    // ── Browser hydration ──────────────────────────────────────────────────────

    // Restore the React Query cache that was pre-fetched during SSG.
    // vite-react-ssg serialises `initialState` into window.__VITE_SSG_CONTEXT__
    // in the HTML, so this data is available synchronously before React mounts.
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
