import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, Play, ThumbsUp, MessageSquare, Share2, ChevronRight } from "lucide-react";
import { useResource, useResources } from "@/hooks/use-strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { useState } from "react";

// Helper function to extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;

  // Handle youtu.be short URLs
  const shortUrlMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortUrlMatch) return shortUrlMatch[1];

  // Handle youtube.com/watch?v= URLs
  const longUrlMatch = url.match(/[?&]v=([^&]+)/);
  if (longUrlMatch) return longUrlMatch[1];

  // Handle youtube.com/embed/ URLs
  const embedMatch = url.match(/\/embed\/([^?]+)/);
  if (embedMatch) return embedMatch[1];

  return null;
};

const VideoResource = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: resourceData, isLoading, error } = useResource(slug || '');
  const { data: allResourcesData } = useResources(); // For related videos
  const [isPlaying, setIsPlaying] = useState(false);

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Video Not Found</h1>
          <p className="mb-8 text-muted-foreground">The video you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/resources">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const video = resourceData?.data[0];

  const thumbnailUrl = video?.thumbnail?.data?.attributes?.url
    ? `${import.meta.env.VITE_STRAPI_URL || 'https://writewise-cms-m2xkjyh6ta-oe.a.run.app'}${video.thumbnail.data.attributes.url}`
    : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop';

  // Extract YouTube video ID from videoUrl
  const youtubeVideoId = video?.videoUrl ? getYouTubeVideoId(video.videoUrl) : null;

  // Get related videos (same category, limit to 3)
  const relatedVideos = allResourcesData?.data
    .filter(r => r.category === 'Videos' && r.slug !== slug)
    .slice(0, 3)
    .map(r => ({
      slug: r.slug,
      title: r.title,
      duration: r.duration || '',
    })) || [];

  return (
    <Layout>
      {isLoading ? (
        <>
          {/* Loading State */}
          <section className="border-b bg-background py-4">
            <div className="container mx-auto px-4">
              <Skeleton className="h-8 w-32" />
            </div>
          </section>
          <section className="bg-black">
            <div className="container mx-auto">
              <Skeleton className="aspect-video w-full max-w-5xl mx-auto" />
            </div>
          </section>
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <Skeleton className="mb-3 h-6 w-24" />
                <Skeleton className="mb-4 h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </section>
        </>
      ) : video ? (
        <>
          {/* Back Navigation */}
          <section className="border-b bg-background py-4">
            <div className="container mx-auto px-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/resources">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Resources
                </Link>
              </Button>
            </div>
          </section>

          {/* Video Player Area */}
          <section className="bg-black">
            <div className="container mx-auto">
              <div className="aspect-video w-full max-w-5xl mx-auto relative">
                {isPlaying && youtubeVideoId ? (
                  // YouTube iframe player
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  // Thumbnail with play button
                  <div
                    className="group cursor-pointer"
                    onClick={() => youtubeVideoId && setIsPlaying(true)}
                  >
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/50">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl transition-transform group-hover:scale-110">
                        <Play className="h-8 w-8 text-primary ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Video Info */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
                {/* Main Content */}
                <div>
                  <Badge className="mb-3 bg-primary/10 text-primary">{video.category}</Badge>
                  <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                    {video.title}
                  </h1>

                  <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {video.views && <span>{video.views} views</span>}
                    {video.views && video.duration && <span>•</span>}
                    {video.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {video.duration}
                      </div>
                    )}
                  </div>

                  <div className="mb-6 flex gap-2">
                    {video.likes && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        {video.likes}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Comments
                    </Button>
                  </div>

                  {video.fullDescription && (
                    <Card className="card-elevated border-0">
                      <CardContent className="p-6">
                        <h2 className="mb-3 font-semibold text-foreground">About this video</h2>
                        <div className="prose max-w-none prose-p:text-muted-foreground">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                            rehypePlugins={[rehypeRaw]}
                          >
                            {video.fullDescription}
                          </ReactMarkdown>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                  {/* Chapters */}
                  {video.chapters && video.chapters.length > 0 && (
                    <Card className="card-elevated border-0">
                      <CardContent className="p-4">
                        <h3 className="mb-4 font-semibold text-foreground">Chapters</h3>
                        <div className="space-y-1">
                          {video.chapters.map((chapter, index) => (
                            <button
                              key={index}
                              className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                            >
                              <span className="shrink-0 text-xs font-mono text-primary">
                                {chapter.time}
                              </span>
                              <span className="text-sm text-foreground">{chapter.title}</span>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Related Videos */}
                  {relatedVideos.length > 0 && (
                    <Card className="card-elevated border-0">
                      <CardContent className="p-4">
                        <h3 className="mb-4 font-semibold text-foreground">Up Next</h3>
                        <div className="space-y-3">
                          {relatedVideos.map((related) => (
                            <Link
                              key={related.slug}
                              to={`/resources/videos/${related.slug}`}
                              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground line-clamp-2">
                                  {related.title}
                                </p>
                                {related.duration && (
                                  <p className="text-xs text-muted-foreground">{related.duration}</p>
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
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
        </>
      ) : null}
    </Layout>
  );
};

export default VideoResource;
