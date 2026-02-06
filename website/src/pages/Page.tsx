import { useLocation, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { usePage } from "@/hooks/use-strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

const Page = () => {
  const location = useLocation();
  // Extract slug from pathname (e.g., "/privacy" -> "privacy")
  const slug = location.pathname.replace('/', '');
  const { data: pageData, isLoading, error } = usePage(slug);

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Page Not Found</h1>
          <p className="mb-8 text-muted-foreground">The page you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const page = pageData?.data[0];

  return (
    <Layout>
      {isLoading ? (
        <>
          <SEO
            title="Loading... - WriteWise"
            description="Loading page..."
          />
          <section className="bg-gradient-brand-subtle py-8">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <Skeleton className="mb-6 h-12 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </section>
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </section>
        </>
      ) : page ? (
        <>
          <SEO
            title={page.seoTitle || `${page.title} - WriteWise`}
            description={page.seoDescription || `${page.title} page for WriteWise`}
          />

          {/* Page Header */}
          <section className="bg-gradient-brand-subtle py-12">
            <div className="container mx-auto px-4">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  {page.title}
                </h1>
              </div>
            </div>
          </section>

          {/* Page Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <article className="prose max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {page.content || ''}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </Layout>
  );
};

export default Page;
