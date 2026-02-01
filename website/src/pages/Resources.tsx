import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play, FileText, Download, Clock, BookOpen, Video, HelpCircle, ArrowRight, ExternalLink, Wrench } from "lucide-react";
import { useResources, useFAQs } from "@/hooks/use-strapi";
import { Link } from "react-router-dom";

const Resources = () => {
  const { data: resourcesData, isLoading: resourcesLoading } = useResources();
  const { data: faqData, isLoading: faqLoading } = useFAQs(); // Fetch all FAQs

  const allResources = resourcesData?.data || [];

  // Organize resources by category
  const videos = allResources.filter(r => r.category === 'Videos');
  const guides = allResources.filter(r => r.category === 'Guides');
  const tools = allResources.filter(r => r.category === 'Tools');
  const articles = allResources.filter(r => r.category === 'Articles');

  // Organize FAQs by category
  const allFAQs = faqData?.data || [];
  const faqsByCategory = {
    General: allFAQs.filter(f => f.category === 'General'),
    Pricing: allFAQs.filter(f => f.category === 'Pricing'),
    Technical: allFAQs.filter(f => f.category === 'Technical'),
    Account: allFAQs.filter(f => f.category === 'Account'),
  };

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
                    <Link key={video.slug} to={`/resources/videos/${video.slug}`}>
                      <Card className="card-elevated group cursor-pointer border-0 transition-transform hover:-translate-y-1">
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
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <div className="mx-auto max-w-3xl">
                {faqLoading ? (
                  <div className="space-y-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i}>
                        <Skeleton className="mb-4 h-8 w-48" />
                        <div className="space-y-4">
                          {Array.from({ length: 3 }).map((_, j) => (
                            <div key={j} className="rounded-lg border p-4">
                              <Skeleton className="mb-2 h-6 w-3/4" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {Object.entries(faqsByCategory).map(([category, faqs]) => {
                      if (faqs.length === 0) return null;

                      return (
                        <div key={category} className="mb-12 last:mb-0">
                          <h3 className="mb-6 text-2xl font-bold text-foreground">
                            {category} <span className="text-gradient-brand">Questions</span>
                          </h3>
                          <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                              <AccordionItem key={faq.id} value={`${category}-${index}`}>
                                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                                  <div className="flex items-start gap-3">
                                    <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                                    <span>{faq.question}</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="ml-8 text-muted-foreground">
                                  {faq.answer}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      );
                    })}

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
                  </>
                )}
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
            <a href="https://app.write-wise.com?mode=signup" target="_blank" rel="noopener noreferrer">
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
