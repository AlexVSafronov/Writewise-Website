import { QueryClient } from '@tanstack/react-query';

/**
 * Singleton QueryClient shared between the SSG entry (main.ssg.tsx) and
 * the dev-server entry (main.tsx).  Exporting it from a dedicated module
 * avoids circular imports between App.tsx and the entry files.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});
