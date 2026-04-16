'use client';

/**
 * Providers — client-side provider tree.
 *
 * The root layout (app/layout.tsx) is a Server Component so it can export
 * `metadata`. All interactive providers that require the browser must live
 * here, in a 'use client' boundary, and be imported as children of the layout.
 */

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { growthbook, getAnonymousId } from '@/lib/growthbook';
import PageViewTracker from './PageViewTracker';

// Create a stable QueryClient singleton — one per browser session.
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new client (never share between requests)
    return makeQueryClient();
  }
  // Browser: reuse the same client across re-renders
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  // Set user attributes once the browser is available so GrowthBook can
  // bucket the user correctly. The provider itself always wraps children —
  // useFeature must have a context even during SSR pre-rendering.
  useEffect(() => {
    growthbook.setAttributes({
      id: getAnonymousId(),
      url: window.location.href,
      path: window.location.pathname,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GrowthBookProvider growthbook={growthbook}>
          <PageViewTracker />
          <Toaster />
          <Sonner />
          {children}
        </GrowthBookProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
