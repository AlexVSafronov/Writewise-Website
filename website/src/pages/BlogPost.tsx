import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { useBlogPost } from "@/hooks/use-strapi";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: postData, isLoading, error } = useBlogPost(slug || '');

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Post Not Found</h1>
          <p className="mb-8 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
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

  const imageUrl = post?.featuredImage?.data?.attributes?.url
    ? `${import.meta.env.VITE_STRAPI_URL || 'https://writewise-cms-m2xkjyh6ta-oe.a.run.app'}${post.featuredImage.data.attributes.url}`
    : 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop';

  return (
    <Layout>
      {isLoading ? (
        <>
          <SEO
            title="Loading... - WriteWise Blog"
            description="Loading blog post..."
          />
          <div className="container mx-auto px-4 py-12">
            <Skeleton className="mb-8 h-10 w-32" />
            <article className="mx-auto max-w-4xl">
              <Skeleton className="mb-8 aspect-video w-full" />
              <Skeleton className="mb-4 h-12 w-3/4" />
              <div className="mb-8 flex flex-wrap gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </article>
          </div>
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
          <div className="container mx-auto px-4 py-12">
            <Button variant="ghost" className="mb-8" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <article className="mx-auto max-w-4xl">
              {/* Featured Image */}
              <div className="mb-8 overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="aspect-video w-full object-cover"
                />
              </div>

              {/* Category Badge */}
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
                {post.title}
              </h1>

              {/* Metadata */}
              <div className="mb-8 flex flex-wrap items-center gap-6 border-b pb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <div>
                    <span className="font-medium text-foreground">{post.author}</span>
                    {post.authorRole && <span className="ml-1">· {post.authorRole}</span>}
                  </div>
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

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* CTA Section */}
            <div className="mx-auto mt-16 max-w-4xl rounded-lg bg-gradient-brand p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white">
                Ready to Start Learning?
              </h2>
              <p className="mb-6 text-white/80">
                Put these insights into practice with WriteWise's AI-powered language learning platform.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <a href="https://app.write-wise.com?mode=signup" target="_blank" rel="noopener noreferrer">
                  Get Started Free
                </a>
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default BlogPost;
