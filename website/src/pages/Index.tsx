import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO, generateWebsiteSchema, generateOrganizationSchema } from "@/components/SEO";
import {
  BookOpen,
  MessageSquare,
  Target,
  Sparkles,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Brain,
  PenTool,
} from "lucide-react";

const features = [
  {
    icon: PenTool,
    title: "Writing Practice",
    description: "Improve your writing skills with AI-powered exercises tailored to your level from A2 to C1.",
  },
  {
    icon: MessageSquare,
    title: "Real Conversations",
    description: "Practice authentic dialogues and scenarios you'll encounter in daily life and work.",
  },
  {
    icon: Brain,
    title: "Smart Feedback",
    description: "Get instant, detailed feedback on grammar, vocabulary, and style to accelerate learning.",
  },
  {
    icon: Target,
    title: "CEFR Aligned",
    description: "Progress through structured levels from A2 to C1 with clear milestones and goals.",
  },
  {
    icon: Sparkles,
    title: "AI Mentor",
    description: "Your personal AI tutor adapts to your pace, strengths, and areas for improvement.",
  },
  {
    icon: Award,
    title: "Track Progress",
    description: "Visualize your journey with detailed analytics and celebrate your achievements.",
  },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "1M+", label: "Exercises Completed" },
  { value: "4.9", label: "App Store Rating" },
  { value: "15+", label: "Languages" },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Business Professional",
    content: "WriteWise helped me go from B1 to B2 in just 3 months. The personalized feedback is incredibly helpful!",
    rating: 5,
  },
  {
    name: "Marco T.",
    role: "University Student",
    content: "Finally, an app that focuses on real writing skills. My essays have improved dramatically.",
    rating: 5,
  },
  {
    name: "Yuki K.",
    role: "Software Engineer",
    content: "The AI mentor feels like having a personal tutor available 24/7. Absolutely worth it.",
    rating: 5,
  },
];

const steps = [
  {
    number: "01",
    title: "Take the Assessment",
    description: "Start with a quick placement test to determine your current CEFR level.",
  },
  {
    number: "02",
    title: "Get Your Learning Path",
    description: "Receive a personalized curriculum based on your goals and schedule.",
  },
  {
    number: "03",
    title: "Practice Daily",
    description: "Complete engaging exercises with instant AI feedback and explanations.",
  },
  {
    number: "04",
    title: "Track & Improve",
    description: "Monitor your progress and celebrate milestones as you advance.",
  },
];

const Index = () => {
  const structuredData = {
    ...generateWebsiteSchema('WriteWise', 'https://write-wise.com'),
    ...generateOrganizationSchema('WriteWise', 'https://write-wise.com', '/logo.png'),
  };

  return (
    <Layout>
      <SEO
        title="WriteWise - AI-Powered Language Learning Platform"
        description="Master any language with WriteWise. AI-powered writing exercises, personalized feedback, and adaptive learning paths for intermediate learners (A2-C1)."
        keywords="language learning, AI tutor, writing practice, CEFR, English learning"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-brand-subtle py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              AI-Powered Language Learning
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Master Any Language with Your{" "}
              <span className="text-gradient-brand">AI Mentor</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              WriteWise helps intermediate learners (A2-C1) improve their language skills through
              personalized exercises, real-time feedback, and adaptive learning paths.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-gradient-brand px-8 hover:opacity-90" asChild>
                <a href="https://app.write-wise.com" target="_blank" rel="noopener noreferrer">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">
                  See How It Works
                </a>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Free forever plan
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="border-y bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gradient-brand md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to{" "}
              <span className="text-gradient-brand">Excel</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools and features designed by language learning experts
              to accelerate your journey to fluency.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="card-elevated border-0 transition-transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-brand">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How <span className="text-gradient-brand">WriteWise</span> Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Start your language learning journey in four simple steps.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="mb-4 text-5xl font-bold text-primary/20">{step.number}</div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/20 to-transparent lg:block lg:w-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Loved by <span className="text-gradient-brand">Learners</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied learners who have transformed their language skills.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="card-elevated border-0">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-foreground">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-medium text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-brand py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Transform Your Language Skills?
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Join 50,000+ learners and start your journey to fluency today. No credit card required.
            </p>
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <a href="https://app.write-wise.com" target="_blank" rel="noopener noreferrer">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
