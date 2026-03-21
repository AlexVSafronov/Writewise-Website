'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Clock, Brain, BarChart3 } from 'lucide-react';

interface PlacementTestLandingProps {
  language: 'German' | 'English';
  flagEmoji: string;
  flagCode: string;
  externalTestUrl: string;
}

const benefits = [
  {
    icon: Clock,
    title: 'Takes ~20 minutes',
    description: 'Get an accurate CEFR level assessment in under half an hour.',
  },
  {
    icon: Brain,
    title: 'AI-powered evaluation',
    description: 'Adaptive questions test grammar, vocabulary, reading and writing.',
  },
  {
    icon: BarChart3,
    title: 'Instant results',
    description: 'Receive your CEFR level (A1–C2) with a personalised learning recommendation.',
  },
];

export function PlacementTestLanding({
  language,
  flagEmoji,
  flagCode,
  externalTestUrl,
}: PlacementTestLandingProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-brand-subtle py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm">
            Free AI Assessment
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {flagEmoji} Free {language}{' '}
            <span className="text-gradient-brand">Placement Test</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover your exact CEFR level (A1–C2) across grammar, vocabulary, reading and
            writing — completely free, in about 20 minutes.
          </p>
          <Button
            size="lg"
            className="bg-gradient-brand px-8 hover:opacity-90"
            asChild
          >
            <a href={externalTestUrl} target="_blank" rel="noopener noreferrer">
              Start {language} Test
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Free · No credit card required · Results in 20 minutes
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10 text-foreground">
            What to <span className="text-gradient-brand">expect</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card-elevated rounded-xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-brand">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CEFR */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10 text-foreground">
            Why take a <span className="text-gradient-brand">CEFR placement test</span>?
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                title: 'Know exactly where you stand',
                desc: `Stop guessing if you are B1 or B2. Get an objective assessment of your ${language} level.`,
              },
              {
                title: 'Plan your learning path',
                desc: 'Receive a personalised recommendation for what to focus on to reach your next CEFR level.',
              },
              {
                title: 'Prepare for official exams',
                desc: `Understand which certificate exam you are ready for — ${language === 'German' ? 'Goethe, TestDaF, DSH' : 'IELTS, Cambridge, TOEFL'} and more.`,
              },
            ].map(({ title, desc }) => (
              <div key={title} className="card-elevated rounded-xl p-6">
                <h3 className="font-semibold mb-3 text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-brand">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to discover your {language} level?
          </h2>
          <p className="text-white/80 mb-8">
            Free, no credit card required. Results in 20 minutes.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href={externalTestUrl} target="_blank" rel="noopener noreferrer">
              {flagEmoji} Start {language} Test
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
