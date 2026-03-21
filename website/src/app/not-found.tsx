/**
 * app/not-found.tsx — rendered for any unmatched route.
 * Next.js automatically returns HTTP 404 when this component is shown.
 * Replaces the react-router <Route path="*"> catch-all.
 */
import NotFound from '@/pages/NotFound';

export default function NotFoundPage() {
  return <NotFound />;
}
