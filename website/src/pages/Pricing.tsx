import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO, generateFAQSchema } from "@/components/SEO";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with language learning.",
    features: [
      "5 exercises per day",
      "Basic AI feedback",
      "A2-B1 level content",
      "Progress tracking",
      "Community access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For dedicated learners who want to accelerate their progress.",
    features: [
      "Unlimited exercises",
      "Advanced AI feedback",
      "A2-C1 level content",
      "Personalized learning path",
      "Priority support",
      "Detailed analytics",
      "Writing portfolio",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Premium",
    price: "$49",
    period: "/month",
    description: "For professionals and serious learners.",
    features: [
      "Everything in Pro",
      "1-on-1 AI tutoring sessions",
      "Custom exercise creation",
      "Business writing focus",
      "Team collaboration",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "How does the free trial work?",
    answer: "You can start with our Free plan at no cost, or try Pro for 14 days free. No credit card required for either. If you decide to upgrade after your trial, you can choose any plan that fits your needs.",
  },
  {
    question: "What CEFR levels does WriteWise support?",
    answer: "WriteWise supports learners from A2 (Elementary) to C1 (Advanced). Our AI adapts content to your current level and gradually increases difficulty as you improve.",
  },
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and never share your personal data with third parties. Your writing exercises and progress are completely private.",
  },
  {
    question: "What languages are supported?",
    answer: "We currently support English, Spanish, French, German, Italian, Portuguese, Dutch, Polish, and more. We're constantly adding new languages based on user demand.",
  },
  {
    question: "How is the AI feedback different from grammar checkers?",
    answer: "Unlike simple grammar checkers, our AI mentor understands context, provides explanations for corrections, suggests alternative phrasings, and adapts feedback to your learning level.",
  },
  {
    question: "Can I use WriteWise for professional writing?",
    answer: "Yes! Our Premium plan includes business writing modules covering emails, reports, presentations, and more. Many professionals use WriteWise to improve their work communication.",
  },
];

const Pricing = () => {
  const faqSchema = generateFAQSchema(faqs);
  
  return (
    <Layout>
      <SEO
        title="Pricing - WriteWise Language Learning Plans"
        description="Choose from Free, Pro ($19/mo), or Premium ($49/mo) plans. AI-powered language learning with personalized feedback. Start free, upgrade anytime."
        keywords="WriteWise pricing, language learning subscription, AI tutor cost"
        structuredData={faqSchema}
      />
      {/* Hero */}
      <section className="bg-gradient-brand-subtle py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Simple, Transparent <span className="text-gradient-brand">Pricing</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Choose the plan that fits your learning goals. Start free and upgrade anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative transition-transform hover:-translate-y-1 ${
                  plan.popular ? "border-primary shadow-lg shadow-primary/20" : "card-elevated border-0"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-gradient-brand px-4 py-1 text-sm font-medium text-white">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-brand hover:opacity-90" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href="https://app.write-wise.com" target="_blank" rel="noopener noreferrer">
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
              Frequently Asked <span className="text-gradient-brand">Questions</span>
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Still have questions?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Our team is here to help you find the perfect plan for your learning journey.
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:hello@write-wise.com">Contact Support</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
