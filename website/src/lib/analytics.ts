import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

export const initGA = () => {
  if (!GA_ID) return;
  ReactGA.initialize(GA_ID);
};

export const trackPageView = (path: string) => {
  if (!GA_ID) return;
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackEvent = (category: string, action: string, label?: string) => {
  if (!GA_ID) return;
  ReactGA.event({ category, action, label });
};

// Called by the GrowthBook tracking callback when a user is bucketed into an experiment.
// This sends an `experiment_viewed` event to GA4, which BigQuery exports and GrowthBook
// queries to compute statistical significance.
export const trackExperiment = (experimentId: string, variationId: string) => {
  if (!GA_ID) return;
  ReactGA.event({
    category: 'experiment',
    action: 'experiment_viewed',
    label: `${experimentId}:${variationId}`,
  });
};
