import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, FileText, Download, Clock, BookOpen, Video, HelpCircle, ArrowRight, ExternalLink } from "lucide-react";

const videos = [
  {
    title: "Getting Started with WriteWise",
    description: "A complete walkthrough of setting up your account and taking your first assessment.",
    duration: "5:30",
    category: "Getting Started",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
  },
  {
    title: "Understanding Your Learning Dashboard",
    description: "Learn how to read your progress metrics and optimize your study sessions.",
    duration: "8:15",
    category: "Features",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
  },
  {
    title: "How to Use AI Feedback Effectively",
    description: "Get the most out of WriteWise's AI mentor with these pro tips.",
    duration: "12:00",
    category: "Tips & Tricks",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
  },
  {
    title: "Writing Better Business Emails",
    description: "Master professional email communication with practical examples.",
    duration: "15:20",
    category: "Business Writing",
    thumbnail: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=225&fit=crop",
  },
  {
    title: "Common Grammar Mistakes and How to Avoid Them",
    description: "Learn to identify and fix the most common errors in your writing.",
    duration: "10:45",
    category: "Grammar",
    thumbnail: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=225&fit=crop",
  },
  {
    title: "Creating Your Personal Study Plan",
    description: "Build a sustainable learning routine that fits your schedule.",
    duration: "7:30",
    category: "Getting Started",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=225&fit=crop",
  },
];

const guides = [
  {
    title: "Complete CEFR Level Guide",
    description: "Everything you need to know about CEFR levels and how WriteWise maps to them.",
    pages: 24,
    format: "PDF",
  },
  {
    title: "Business Writing Handbook",
    description: "Professional templates and examples for emails, reports, and presentations.",
    pages: 48,
    format: "PDF",
  },
  {
    title: "Grammar Quick Reference",
    description: "A handy reference guide for common grammar rules and exceptions.",
    pages: 16,
    format: "PDF",
  },
  {
    title: "Vocabulary Building Strategies",
    description: "Proven techniques to expand and retain new vocabulary effectively.",
    pages: 20,
    format: "PDF",
  },
];

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
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </TabsTrigger>
            </TabsList>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <Card key={video.title} className="card-elevated group cursor-pointer overflow-hidden border-0 transition-transform hover:-translate-y-1">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
                          <Play className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                        {video.category}
                      </Badge>
                      <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides">
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
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {guide.pages} pages • {guide.format}
                          </span>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
