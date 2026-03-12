import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { HUB_LANGUAGES } from '@/components/placement-test/config/languageConfigs';

export default function PlacementTestHub() {
  return (
    <Layout>
      <SEO
        title="Free Language Placement Test — Find Your CEFR Level | WriteWise"
        description="Take our free AI-powered CEFR placement test in German, English, Spanish, French, Italian or Portuguese. Discover your exact level (A1–C2) in 20 minutes."
        keywords="language placement test, CEFR level test, free language assessment, German placement test, English placement test"
        canonicalUrl="https://write-wise.com/placement-test"
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="bg-gradient-brand-subtle py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm">
            Free AI Assessment
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Test Your{' '}
            <span className="text-gradient-brand">Language Level</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get an accurate, personalised CEFR level assessment (A1–C2) across grammar,
            vocabulary, reading and writing — completely free, in 20 minutes.
          </p>
        </div>
      </section>

      {/* ── Language picker ───────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-3">
            Which language would you like to assess?
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Choose a language below to start your free placement test.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {HUB_LANGUAGES.map(({ language, slug, flagCode, flagAlt, active }) =>
              active ? (
                <Link
                  key={language}
                  to={`/placement-test/${slug}`}
                  className="group card-elevated rounded-2xl p-5 flex flex-col items-center gap-3 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-colors">
                    <img
                      src={`https://flagcdn.com/w80/${flagCode}.png`}
                      srcSet={`https://flagcdn.com/w160/${flagCode}.png 2x`}
                      alt={flagAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-semibold text-sm text-foreground text-center">
                    {language}
                  </span>
                  <span className="text-xs text-primary font-medium flex items-center gap-1">
                    Start test <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ) : (
                <div
                  key={language}
                  className="card-elevated rounded-2xl p-5 flex flex-col items-center gap-3 opacity-60 cursor-not-allowed"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-border">
                    <img
                      src={`https://flagcdn.com/w80/${flagCode}.png`}
                      srcSet={`https://flagcdn.com/w160/${flagCode}.png 2x`}
                      alt={flagAlt}
                      className="w-full h-full object-cover grayscale"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-semibold text-sm text-foreground text-center">
                    {language}
                  </span>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    Coming soon
                  </Badge>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Why take a placement test ─────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why take a <span className="text-gradient-brand">CEFR placement test</span>?
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                title: 'Know exactly where you stand',
                desc: 'Stop guessing if you are B1 or B2. Get an objective assessment across all four skill areas.',
              },
              {
                title: 'Plan your learning path',
                desc: 'Receive a personalised recommendation for what to focus on to reach your next CEFR level.',
              },
              {
                title: 'Prepare for official exams',
                desc: 'Understand which certificate exam you are ready for — Goethe, IELTS, Cambridge, and more.',
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

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-brand">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to discover your level?
          </h2>
          <p className="text-white/80 mb-8">
            Free, no credit card required. Results in 20 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/placement-test/german">
                🇩🇪 Start German Test
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/placement-test/english">
                🇬🇧 Start English Test
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
