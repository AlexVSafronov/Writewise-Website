/**
 * app/not-found.tsx — rendered for any unmatched route.
 * Next.js automatically returns HTTP 404 when this component is shown.
 * Replaces the react-router <Route path="*"> catch-all.
 */
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import NotFound from '@/page-components/NotFound';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main>
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
