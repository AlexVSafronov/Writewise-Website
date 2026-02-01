import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { useBlogPost, useBlogPosts } from "@/hooks/use-strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: postData, isLoading, error } = useBlogPost(slug || '');
  const { data: relatedPostsData } = useBlogPosts(); // Get all posts for related articles

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Post Not Found</h1>
          <p className="mb-8 text-muted-foreground">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const post = postData?.data[0];

  // Debug: Log post data to console
  if (post) {
    console.log('Blog Post Data:', post);
    console.log('Content type:', typeof post.content);
    console.log('Content preview:', post.content?.substring(0, 200));
  }

  const imageUrl = post?.featuredImage?.data?.attributes?.url
    ? `${import.meta.env.VITE_STRAPI_URL || 'https://writewise-cms-m2xkjyh6ta-oe.a.run.app'}${post.featuredImage.data.attributes.url}`
    : 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop';

  // Get related posts (same category, limit to 2)
  const relatedPosts = relatedPostsData?.data
    .filter(p => p.slug !== slug && p.category === post?.category)
    .slice(0, 2)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
    })) || [];

  return (
    <Layout>
      {isLoading ? (
        <>
          <SEO
            title="Loading... - WriteWise Blog"
            description="Loading blog post..."
          />
          {/* Loading State */}
          <section className="bg-gradient-brand-subtle py-8">
            <div className="container mx-auto px-4">
              <Skeleton className="mb-6 h-8 w-32" />
              <div className="mx-auto max-w-3xl">
                <Skeleton className="mb-4 h-6 w-24" />
                <Skeleton className="mb-6 h-12 w-full" />
                <div className="flex flex-wrap items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </section>
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <Skeleton className="aspect-video w-full rounded-xl" />
              </div>
            </div>
          </section>
        </>
      ) : post ? (
        <>
          <SEO
            title={`${post.title} - WriteWise Blog`}
            description={post.seoDescription || post.excerpt}
            keywords={`language learning, ${post.category}, WriteWise blog`}
            ogType="article"
            ogImage={imageUrl}
          />

          {/* Hero */}
          <section className="bg-gradient-brand-subtle py-8">
            <div className="container mx-auto px-4">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <div className="mx-auto max-w-3xl">
                <Badge className="mb-4 bg-primary/10 text-primary">{post.category}</Badge>
                <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl overflow-hidden rounded-xl">
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              {/* Debug Panel - Remove after testing */}
              {import.meta.env.DEV && post.content && (
                <div className="mx-auto mb-8 max-w-5xl rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <details>
                    <summary className="cursor-pointer font-semibold text-yellow-900 dark:text-yellow-100">
                      🐛 Debug: Raw Markdown Content (DEV only)
                    </summary>
                    <pre className="mt-4 overflow-x-auto rounded bg-white p-4 text-xs dark:bg-gray-800">
                      {post.content.substring(0, 500)}
                      {post.content.length > 500 && '...\n\n(truncated)'}
                    </pre>
                    <div className="mt-2 text-sm text-yellow-800 dark:text-yellow-200">
                      Content length: {post.content.length} characters
                    </div>
                  </details>
                </div>
              )}

              <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_280px]">
                {/* Main Content */}
                <article
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {post.content || ''}
                  </ReactMarkdown>
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                  {/* Share Actions */}
                  <Card className="card-elevated border-0">
                    <CardContent className="p-4">
                      <h3 className="mb-4 font-semibold text-foreground">Share Article</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Author Card */}
                  <Card className="card-elevated border-0">
                    <CardContent className="p-4">
                      <h3 className="mb-3 font-semibold text-foreground">About the Author</h3>
                      <p className="mb-2 font-medium text-foreground">{post.author}</p>
                      {post.authorRole && (
                        <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <Card className="card-elevated border-0">
                      <CardContent className="p-4">
                        <h3 className="mb-4 font-semibold text-foreground">Related Articles</h3>
                        <div className="space-y-3">
                          {relatedPosts.map((related) => (
                            <Link
                              key={related.slug}
                              to={`/blog/${related.slug}`}
                              className="block rounded-lg p-2 transition-colors hover:bg-muted"
                            >
                              <Badge className="mb-1 bg-primary/10 text-xs text-primary">
                                {related.category}
                              </Badge>
                              <p className="text-sm font-medium text-foreground hover:text-primary">
                                {related.title}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </aside>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-brand py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Ready to Improve Your Writing?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-white/80">
                Join thousands of learners using WriteWise to master language skills.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <a href="https://app.write-wise.com?mode=signup" target="_blank" rel="noopener noreferrer">
                  Start Learning Free
                </a>
              </Button>
            </div>
          </section>
        </>
      ) : null}
    </Layout>
  );
};

export default BlogPost;
