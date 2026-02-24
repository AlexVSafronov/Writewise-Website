import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Expose the client so the pre-render script can capture the populated cache
// via Puppeteer's page.evaluate() after all Strapi fetches have settled.
(window as any).__reactQueryClient = queryClient;

// Seed the cache with data captured during pre-rendering.
// prerender.mjs injects window.__REACT_QUERY_STATE__ into the HTML before </body>,
// so on a direct page load the data is available synchronously here before React
// mounts — meaning the first render sees a warm cache and skips all Strapi fetches.
const prerenderedState = (window as any).__REACT_QUERY_STATE__;
if (prerenderedState) {
  try {
    hydrate(queryClient, prerenderedState);
  } catch (e) {
    // Non-fatal: worst case React Query fetches fresh data as usual
    console.warn('Failed to hydrate React Query cache from pre-rendered state:', e);
  }
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
