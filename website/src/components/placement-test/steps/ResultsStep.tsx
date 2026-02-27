import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  AlertTriangle,
  Mail,
  ExternalLink,
  RotateCcw,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { usePlacementTest } from '../PlacementTestContext';

const CEFR_LABEL: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper-Intermediate',
  C1: 'Advanced',
  C2: 'Proficient',
};

const CEFR_COLOR: Record<
  string,
  { ring: string; bg: string; text: string; bar: string; badge: string }
> = {
  A1: {
    ring: 'ring-slate-400',
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    bar: 'bg-slate-400',
    badge: 'bg-slate-100 text-slate-700',
  },
  A2: {
    ring: 'ring-blue-400',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    bar: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-700',
  },
  B1: {
    ring: 'ring-green-400',
    bg: 'bg-green-50',
    text: 'text-green-700',
    bar: 'bg-green-500',
    badge: 'bg-green-100 text-green-700',
  },
  B2: {
    ring: 'ring-teal-400',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    bar: 'bg-teal-500',
    badge: 'bg-teal-100 text-teal-700',
  },
  C1: {
    ring: 'ring-purple-400',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    bar: 'bg-purple-500',
    badge: 'bg-purple-100 text-purple-700',
  },
  C2: {
    ring: 'ring-amber-400',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    bar: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-700',
  },
};

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.write-wise.com';

export function ResultsStep() {
  const { state, dispatch } = usePlacementTest();
  const results = state.results;

  if (!results) return null;

  const colors = CEFR_COLOR[results.cefrLevel] ?? CEFR_COLOR['B1'];
  const cefrLabel = CEFR_LABEL[results.cefrLevel] ?? '';
  const signupUrl = `${APP_URL}?mode=signup&level=${results.cefrLevel}&lang=${encodeURIComponent(state.language ?? '')}`;

  const dimensions: Array<{ key: keyof typeof results.dimensionScores; label: string }> = [
    { key: 'vocabulary', label: 'Vocabulary' },
    { key: 'grammar', label: 'Grammar' },
    { key: 'reading', label: 'Reading' },
    { key: 'writing', label: 'Writing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Minimal header */}
      <header className="py-4 px-6 border-b border-border bg-white shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="font-bold text-xl bg-gradient-brand bg-clip-text text-transparent">
            WriteWise
          </span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
            <CheckCircle className="w-4 h-4" />
            Test Complete
          </div>
        </div>
      </header>

      <main className="flex-1 py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Congratulation */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Well done, {state.userInfo?.firstName}! Here are your results.
            </p>
          </div>

          {/* CEFR Badge + Score */}
          <div className={`rounded-2xl border-2 ${colors.ring} ${colors.bg} p-8 flex flex-col items-center gap-4`}>
            <div
              className={`w-24 h-24 rounded-2xl ${colors.bg} ring-4 ${colors.ring} flex items-center justify-center`}
            >
              <span className={`text-4xl font-black ${colors.text}`}>{results.cefrLevel}</span>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                {cefrLabel} — {state.language}
              </h2>
              <p className="text-muted-foreground">
                Overall score:{' '}
                <span className={`font-bold text-lg ${colors.text}`}>{results.overallScore}/100</span>
              </p>
            </div>

            {/* Score arc */}
            <div className="w-full max-w-xs bg-white/60 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
                style={{ width: `${results.overallScore}%` }}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              Assessment Summary
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {results.highLevelSummary}
            </p>
          </div>

          {/* Strengths & Focus Areas */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                Your Strengths
              </h3>
              <ul className="space-y-2.5">
                {results.strongAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✅</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
                Focus Areas
              </h3>
              <ul className="space-y-2.5">
                {results.improvementAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 mt-0.5">⚠️</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skill Dimensions */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-semibold mb-5 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Skill Breakdown
            </h3>
            <div className="space-y-4">
              {dimensions.map(({ key, label }) => {
                const score = results.dimensionScores[key];
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1.5 text-sm">
                      <span className="font-medium">{label}</span>
                      <span className="text-muted-foreground">{score}/100</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-semibold mb-3">Personalised Recommendations</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{results.recommendations}</p>
          </div>

          {/* Email notice */}
          {state.userInfo?.email && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <Mail className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-800">
                <strong>Detailed report sent!</strong> A full analysis with question-by-question
                feedback has been emailed to{' '}
                <span className="font-medium">{state.userInfo.email}</span>.
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white space-y-4">
            <Badge className="bg-white/20 text-white hover:bg-white/20 text-xs mb-2">
              {results.cefrLevel} Level Detected
            </Badge>
            <h3 className="text-2xl font-bold">
              Ready to reach{' '}
              {results.cefrLevel === 'C2'
                ? 'full fluency?'
                : results.cefrLevel === 'C1'
                ? 'C2?'
                : results.cefrLevel === 'B2'
                ? 'C1?'
                : results.cefrLevel === 'B1'
                ? 'B2?'
                : results.cefrLevel === 'A2'
                ? 'B1?'
                : 'A2?'}
            </h3>
            <p className="text-white/85 text-sm max-w-md mx-auto">
              Start your free WriteWise trial and get AI-personalised writing exercises tailored
              to your {results.cefrLevel} level.
            </p>
            <a href={signupUrl} target="_blank" rel="noopener noreferrer">
              <Button
                className="bg-white text-purple-700 hover:bg-white/90 font-semibold px-8 py-3 h-auto text-base mt-2"
              >
                Start Free Trial
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Take again */}
          <div className="text-center pb-8">
            <button
              type="button"
              onClick={() => dispatch({ type: 'RESET' })}
              className="text-sm text-muted-foreground hover:text-foreground underline flex items-center gap-1.5 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Take the test again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
