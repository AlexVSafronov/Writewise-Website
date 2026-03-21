import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { trackPageView } from '@/lib/analytics';
import { growthbook } from '@/lib/growthbook';
import { queryClient } from '@/lib/queryClient';

/**
 * Fires a GA4 page_view on every client-side navigation.
 * useEffect never runs during SSG (Node.js), so this is automatically
 * browser-only — no additional guards needed.
 */
const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
};

/**
 * Root application shell used by both the SSG entry (main.ssg.tsx) and
 * the dev-server entry (main.tsx).
 *
 * GrowthBookProvider is mounted only after the first client-side render
 * (mounted === true) so it is never included in the static HTML snapshot
 * produced by vite-ssg.  GrowthBook requires a live CDN connection to load
 * features; skipping it during SSG avoids hanging the build.
 *
 * QueryClientProvider is always present.  The pre-rendered React Query cache
 * (injected into window.__VITE_SSG_CONTEXT__ by vite-ssg) is hydrated in
 * main.ssg.tsx before React mounts, so the first render sees real data with
 * no loading states.
 */
const App = () => {
  // false on first render (SSG + browser initial paint), true after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const content = (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouteTracker />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );

  return mounted ? (
    <GrowthBookProvider growthbook={growthbook}>
      {content}
    </GrowthBookProvider>
  ) : content;
};

export default App;
