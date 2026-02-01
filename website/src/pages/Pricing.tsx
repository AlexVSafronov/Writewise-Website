import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO, generateFAQSchema } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useStripePricing, useFAQs } from "@/hooks/use-strapi";

// Currency symbol mapping
const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
};

const Pricing = () => {
  const { data: pricingData, isLoading: pricingLoading } = useStripePricing();
  const { data: faqData, isLoading: faqLoading } = useFAQs('Pricing');

  const faqs = faqData?.data.map(item => ({
    question: item.question,
    answer: item.answer,
  })) || [];

  const faqSchema = generateFAQSchema(faqs);

  const stripePlans = (pricingData?.data || [])
    .sort((a, b) => a.order - b.order)
    .map(item => {
    const plan = item;

    // Determine CTA text based on plan code
    let cta = "Get Started";
    if (plan.code === "premium") {
      cta = "Contact Sales";
    } else if (plan.code === "basic") {
      cta = "Start Pro Trial";
    } else if (plan.code === "free" && plan.price === 0) {
      cta = "Start Free";
    }

    // Get currency symbol
    const currencySymbol = currencySymbols[plan.currency] || plan.currency;

    // Format price display
    const priceDisplay = plan.price === 0
      ? "Free"
      : `${currencySymbol}${plan.price}`;

    const period = plan.price === 0 ? "" : "/month";

    return {
      name: plan.name,
      price: priceDisplay,
      period: period,
      description: plan.description,
      features: plan.features,
      cta: cta,
      ctaLink: "https://app.write-wise.com",
      popular: plan.highlighted || false,
      isContactSales: false,
    };
  });

  // Static Business/Enterprise plan
  const businessPlan = {
    name: "Business",
    price: "Custom",
    period: "",
    description: "Custom solutions for teams & organizations. Flexible plans designed around your company's specific learning goals.",
    features: [
      "Customized learning programs",
      "Scalable team access",
      "Team & individual progress reporting",
      "Dedicated consultation & support",
    ],
    cta: "Contact Sales",
    ctaLink: "mailto:sales@writewise.com",
    popular: false,
    isContactSales: true,
  };

  // Combine Stripe plans with Business plan
  const plans = [...stripePlans, businessPlan];

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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricingLoading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-0">
                  <CardHeader className="pb-4">
                    <Skeleton className="h-6 w-24" />
                    <div className="mt-2 flex items-baseline gap-2">
                      <Skeleton className="h-12 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="mt-2 h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 space-y-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </CardContent>
                </Card>
              ))
            ) : (
              plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col transition-transform hover:-translate-y-1 ${
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
                  <CardContent className="flex flex-1 flex-col">
                    <ul className="mb-6 flex-1 space-y-3">
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
                      <a href={plan.ctaLink} target={plan.isContactSales ? "_self" : "_blank"} rel="noopener noreferrer">
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
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
            {faqLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : (
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
            )}
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
