import { GrowthBook } from '@growthbook/growthbook-react';
import { trackExperiment } from './analytics';

const CLIENT_KEY = process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY as string | undefined;

/**
 * Returns a stable anonymous ID for the current browser session.
 * Stored in localStorage so the same user always sees the same experiment variant.
 */
export function getAnonymousId(): string {
  const KEY = 'ww_anon_id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export const growthbook = new GrowthBook({
  apiHost: 'https://cdn.growthbook.io',
  clientKey: CLIENT_KEY || '',
  // Renders the GrowthBook dev toolbar in development (toggle experiments locally)
  enableDevMode: process.env.NODE_ENV === 'development',
  trackingCallback: (experiment, result) => {
    trackExperiment(experiment.key, String(result.variationId));
  },
});

// Load feature flags from GrowthBook CDN.
// Skipped during SSG (Node.js has no `window`) and when no client key is set.
if (CLIENT_KEY && typeof window !== 'undefined') {
  growthbook.loadFeatures({ autoRefresh: true });
}
