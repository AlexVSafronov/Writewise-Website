'use client';

import { SEO, generateFAQSchema } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  Globe,
  Brain,
  Pencil,
  ArrowRight,
} from 'lucide-react';
import { usePlacementTest } from '../PlacementTestContext';
import { useFAQsByPage } from '@/hooks/use-strapi';
import { LANGUAGE_CONFIGS } from '../config/languageConfigs';
import type { FAQItem } from '../config/languageConfigs';

// ============================================================================
// Constants shared across all language pages
// ============================================================================

const CEFR_LEVELS = [
  { level: 'A1', label: 'Beginner',           color: 'bg-slate-100 text-slate-700' },
  { level: 'A2', label: 'Elementary',         color: 'bg-blue-100 text-blue-700' },
  { level: 'B1', label: 'Intermediate',       color: 'bg-green-100 text-green-700' },
  { level: 'B2', label: 'Upper-Intermediate', color: 'bg-teal-100 text-teal-700' },
  { level: 'C1', label: 'Advanced',           color: 'bg-purple-100 text-purple-700' },
  { level: 'C2', label: 'Proficient',         color: 'bg-amber-100 text-amber-700' },
];

const SKILLS = [
  { icon: BookOpen, label: 'Vocabulary',  description: 'Range & accuracy of words you know' },
  { icon: Brain,    label: 'Grammar',     description: 'Accuracy of grammatical structures' },
  { icon: Globe,    label: 'Reading',     description: 'Comprehension of written texts' },
  { icon: Pencil,   label: 'Writing',     description: 'Ability to express ideas in writing' },
];

// ============================================================================
// Component
// ============================================================================

export function LanguageLandingStep() {
  const { state, dispatch } = usePlacementTest();

  const config = state.language ? LANGUAGE_CONFIGS[state.language] : null;

  // CMS-managed FAQs — keyed by page slug e.g. "placement-test-german"
  const pageKey = config ? `placement-test-${config.slug}` : '';
  const { data: cmsData } = useFAQsByPage(pageKey);
  const cmsFaqs: FAQItem[] = (cmsData?.data ?? []).map((f) => ({
    question: f.question,
    answer:   f.answer,
  }));

  // Use CMS FAQs when available, fall back to static config FAQs
  const faqs: FAQItem[] = cmsFaqs.length > 0
    ? cmsFaqs
    : (config?.staticFaqs ?? []);

  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : undefined;

  if (!config) return null;

  return (
    <>
      <SEO structuredData={faqSchema} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-brand-subtle opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: copy */}
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
                {config.badgeLabel}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                {config.heroTitle}{' '}
                <span className="text-gradient-brand">{config.heroTitleHighlight}</span>
                {' '}in 20 Minutes
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {config.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>15–20 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span>CEFR-aligned (A1–C2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Detailed report emailed to you</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-gradient-brand hover:opacity-90 text-white px-8 text-base font-semibold"
                onClick={() => dispatch({ type: 'START_TEST' })}
              >
                {config.ctaLabel}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Right: CEFR levels visual */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {CEFR_LEVELS.map(({ level, label, color }) => (
                <div key={level} className="card-elevated p-4 rounded-xl flex items-center gap-3">
                  <span className={`text-xl font-bold px-3 py-1.5 rounded-lg ${color}`}>
                    {level}
                  </span>
                  <div>
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground">CEFR Level</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What the test covers ──────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-10">What the test covers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map(({ icon: Icon, label, description }) => (
              <div key={label} className="card-elevated p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                step: '1',
                title: 'Enter your details',
                desc: 'Tell us your name and email so we can send you the full report.',
              },
              {
                step: '2',
                title: 'Take the 20-minute test',
                desc: 'Complete AI-generated CEFR questions spanning vocabulary, grammar, reading and writing.',
              },
              {
                step: '3',
                title: 'Get your results',
                desc: 'See your CEFR level instantly. A detailed report with personalised recommendations is emailed to you.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-brand text-white text-xl font-bold flex items-center justify-center mb-4">
                  {step}
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to find your{' '}
            <span className="text-gradient-brand">{config.language} level</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            Free, no credit card required. Get your CEFR level and personalised learning plan in 20 minutes.
          </p>
          <Button
            size="lg"
            className="bg-gradient-brand hover:opacity-90 text-white px-10 text-base font-semibold"
            onClick={() => dispatch({ type: 'START_TEST' })}
          >
            {config.ctaLabel}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-10">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="card-elevated rounded-xl border-0 px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}
    </>
  );
}
