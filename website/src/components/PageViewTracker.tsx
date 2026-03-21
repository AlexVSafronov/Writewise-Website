'use client';

/**
 * PageViewTracker — fires a GA4 page_view event on every route change.
 *
 * Replaces the <RouteTracker> component from the old App.tsx / react-router
 * setup.  Uses usePathname() from next/navigation instead of useLocation().
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  return null;
}
