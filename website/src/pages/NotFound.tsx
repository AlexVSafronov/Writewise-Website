import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    // Tell search engines not to index this page
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      // Restore default when navigating away
      meta?.setAttribute('content', 'index, follow');
    };
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="mb-2 text-6xl font-bold text-primary">404</p>
        <h1 className="mb-4 text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
