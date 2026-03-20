// GA4 is loaded via the gtag.js script tag in index.html (G-VSCF3D4V1F).
// These helpers call window.gtag() directly so event tracking works without
// any env var configuration.

declare function gtag(...args: unknown[]): void;

const hasGtag = () => typeof gtag !== 'undefined';

export const initGA = () => {
  // No-op: gtag.js initialises itself via the script tag in index.html.
};

export const trackPageView = (path: string) => {
  if (!hasGtag()) return;
  gtag('event', 'page_view', { page_path: path });
};

export const trackEvent = (category: string, action: string, label?: string) => {
  if (!hasGtag()) return;
  gtag('event', action, { event_category: category, event_label: label });
};

// Called by the GrowthBook tracking callback when a user is bucketed into an experiment.
// Sends an `experiment_viewed` event to GA4, which BigQuery exports and GrowthBook
// queries to compute statistical significance.
export const trackExperiment = (experimentId: string, variationId: string) => {
  if (!hasGtag()) return;
  gtag('event', 'experiment_viewed', {
    event_category: 'experiment',
    experiment_id: experimentId,
    variation_id: variationId,
  });
};
