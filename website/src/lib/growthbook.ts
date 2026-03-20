import { GrowthBook } from '@growthbook/growthbook-react';
import { trackExperiment } from './analytics';

const CLIENT_KEY = import.meta.env.VITE_GROWTHBOOK_CLIENT_KEY as string | undefined;

export const growthbook = new GrowthBook({
  apiHost: 'https://cdn.growthbook.io',
  clientKey: CLIENT_KEY || '',
  // Renders the GrowthBook dev toolbar in development (toggle experiments locally)
  enableDevMode: import.meta.env.DEV,
  trackingCallback: (experiment, result) => {
    trackExperiment(experiment.key, String(result.variationId));
  },
});

// Load feature flags from GrowthBook CDN.
// Skipped if no client key is configured (local dev without GrowthBook).
if (CLIENT_KEY) {
  growthbook.loadFeatures({ autoRefresh: true });
}
