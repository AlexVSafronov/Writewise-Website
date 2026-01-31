import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, FileText, Download, Clock, BookOpen, Video, HelpCircle, ArrowRight, ExternalLink, Wrench } from "lucide-react";
import { useResources } from "@/hooks/use-strapi";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to the login page and click 'Forgot Password'. Enter your email address and we'll send you a reset link.",
  },
  {
    question: "Can I use WriteWise offline?",
    answer: "Currently, WriteWise requires an internet connection for AI feedback. However, you can download exercises for offline practice.",
  },
  {
    question: "How do I change my learning language?",
    answer: "Go to Settings > Learning Preferences > Target Language. You can switch languages anytime without losing progress.",
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes 5 exercises per day, basic AI feedback, A2-B1 content, and community access.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "Go to Settings > Subscription > Manage Subscription. You can cancel anytime and retain access until the end of your billing period.",
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 14-day money-back guarantee for all paid plans. Contact support@write-wise.com for assistance.",
  },
];

const Resources = () => {
  const { data: resourcesData, isLoading: resourcesLoading } = useResources();

  const allResources = resourcesData?.data || [];

  // Organize resources by category
  const videos = allResources.filter(r => r.category === 'Videos');
  const guides = allResources.filter(r => r.category === 'Guides');
  const tools = allResources.filter(r => r.category === 'Tools');
  const articles = allResources.filter(r => r.category === 'Articles');

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-brand-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              Learning <span className="text-gradient-brand">Resources</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Video tutorials, guides, and FAQs to help you get the most out of WriteWise.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="guides" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-2xl mx-auto grid-cols-5">
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </TabsTrigger>
            </TabsList>

            {/* Guides Tab */}
            <TabsContent value="guides">
              {resourcesLoading ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="border-0">
                      <CardContent className="flex items-start gap-4 p-6">
                        <Skeleton className="h-12 w-12 shrink-0 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="mb-2 h-6 w-3/4" />
                          <Skeleton className="mb-4 h-4 w-full" />
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-24" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {guides.map((guide) => (
                    <Card key={guide.title} className="card-elevated border-0">
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-brand">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 font-semibold text-foreground">{guide.title}</h3>
                          <p className="mb-4 text-sm text-muted-foreground">{guide.description}</p>
                          <Button size="sm" variant="outline" className="gap-2" asChild>
                            <a href={guide.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                              View Resource
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools">
              {resourcesLoading ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="border-0">
                      <CardContent className="flex items-start gap-4 p-6">
                        <Skeleton className="h-12 w-12 shrink-0 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="mb-2 h-6 w-3/4" />
                          <Skeleton className="mb-4 h-4 w-full" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {tools.map((tool) => (
                    <Card key={tool.title} className="card-elevated border-0">
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-brand">
                          <Wrench className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 font-semibold text-foreground">{tool.title}</h3>
                          <p className="mb-4 text-sm text-muted-foreground">{tool.description}</p>
                          <Button size="sm" variant="outline" className="gap-2" asChild>
                            <a href={tool.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                              Open Tool
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles">
              {resourcesLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="border-0">
                      <CardContent className="p-6">
                        <Skeleton className="mb-4 h-6 w-24" />
                        <Skeleton className="mb-3 h-6 w-full" />
                        <Skeleton className="mb-4 h-4 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <Card key={article.title} className="card-elevated group cursor-pointer border-0 transition-transform hover:-translate-y-1" asChild>
                      <a href={article.link} target="_blank" rel="noopener noreferrer">
                        <CardContent className="p-6">
                          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                            {article.category}
                          </Badge>
                          <h3 className="mb-3 text-lg font-semibold text-foreground group-hover:text-primary">
                            {article.title}
                          </h3>
                          <p className="mb-4 text-sm text-muted-foreground">{article.description}</p>
                          <div className="flex items-center gap-2 text-sm text-primary">
                            Read Article
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              {resourcesLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="border-0">
                      <CardContent className="p-6">
                        <Skeleton className="mb-4 h-6 w-24" />
                        <Skeleton className="mb-3 h-6 w-full" />
                        <Skeleton className="mb-4 h-4 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {videos.map((video) => (
                    <Card key={video.title} className="card-elevated group cursor-pointer border-0 transition-transform hover:-translate-y-1" asChild>
                      <a href={video.link} target="_blank" rel="noopener noreferrer">
                        <CardContent className="p-6">
                          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                            {video.category}
                          </Badge>
                          <h3 className="mb-3 text-lg font-semibold text-foreground group-hover:text-primary">
                            {video.title}
                          </h3>
                          <p className="mb-4 text-sm text-muted-foreground">{video.description}</p>
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <Play className="h-4 w-4" />
                            Watch Video
                          </div>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <div className="mx-auto max-w-3xl">
                <div className="grid gap-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="card-elevated border-0">
                      <CardContent className="p-6">
                        <h3 className="mb-2 flex items-start gap-3 font-semibold text-foreground">
                          <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          {faq.question}
                        </h3>
                        <p className="ml-8 text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <p className="mb-4 text-muted-foreground">
                    Can't find what you're looking for?
                  </p>
                  <Button variant="outline" asChild>
                    <a href="mailto:support@write-wise.com">
                      Contact Support
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-brand py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Start Learning?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            Join thousands of learners improving their language skills with WriteWise.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="https://app.write-wise.com" target="_blank" rel="noopener noreferrer">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
