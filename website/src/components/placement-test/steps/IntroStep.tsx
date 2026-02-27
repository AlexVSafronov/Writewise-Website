import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Brain,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { usePlacementTest } from '../PlacementTestContext';
import { generatePlacementTest } from '@/lib/placement-test-api';
import { toast } from 'sonner';

const STEP_INDICATOR = ['Intro', 'Test', 'Results'];

export function IntroStep() {
  const { state, dispatch } = usePlacementTest();
  const [isStarting, setIsStarting] = useState(false);

  async function handleStart() {
    if (!state.sessionId || !state.language || !state.nativeLanguage) {
      toast.error('Session information missing. Please start again.');
      dispatch({ type: 'RESET' });
      return;
    }

    setIsStarting(true);
    dispatch({ type: 'SET_GENERATING', payload: true });

    try {
      const test = await generatePlacementTest({
        sessionId: state.sessionId,
        language: state.language,
        nativeLanguage: state.nativeLanguage,
      });
      dispatch({ type: 'SET_TEST', payload: test });
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err?.message || 'Failed to generate test' });
      toast.error('Failed to generate your test. Please try again.');
      setIsStarting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
      {/* Minimal header */}
      <header className="py-4 px-6 border-b border-border/40 bg-white/80 backdrop-blur">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="font-bold text-xl text-gradient-brand">
            WriteWise
          </span>
          <div className="flex items-center gap-2">
            {STEP_INDICATOR.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    i === 0
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0
                        ? 'bg-gradient-brand text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < STEP_INDICATOR.length - 1 && (
                  <div className="w-8 h-px bg-border hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full space-y-6">
          {/* Title card */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-3">
              Your{' '}
              <span className="text-gradient-brand">
                {state.language}
              </span>{' '}
              Placement Test
            </h1>
            <p className="text-muted-foreground text-lg">
              Hi {state.userInfo?.firstName}! Here's what to expect before you begin.
            </p>
          </div>

          {/* Overview card */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
            {/* Time & format */}
            <div className="flex items-start gap-4 pb-5 border-b border-border">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Time &amp; Format</h3>
                <p className="text-sm text-muted-foreground">
                  The test takes approximately <strong>15–20 minutes</strong> and consists of
                  three progressive sections: Foundations (A1–A2), Intermediate (B1–B2), and
                  Advanced (C1–C2). Each section uses a variety of task types.
                </p>
              </div>
            </div>

            {/* Skills tested */}
            <div className="pb-5 border-b border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Skills Assessed</h3>
                  <p className="text-sm text-muted-foreground">
                    The test evaluates four core language skills:
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 ml-14">
                {['Vocabulary', 'Grammar', 'Reading', 'Writing'].map((label) => (
                  <div key={label} className="text-sm font-medium text-foreground">
                    · {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips for best results */}
            <div className="pb-5 border-b border-border">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Tips for Best Results</h3>
                </div>
              </div>
              <ul className="ml-14 space-y-2 list-disc pl-4">
                {[
                  'Find a quiet place with no distractions.',
                  'Answer from your current knowledge — don\'t use a dictionary.',
                  'If a question is too hard, it\'s OK — skip to the next one.',
                  'For writing tasks, aim for clear and natural language.',
                ].map((tip) => (
                  <li key={tip} className="text-sm text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* What you get */}
            <div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">What You'll Get</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
                    <li>Your CEFR level (A1–C2) displayed immediately</li>
                    <li>Skill breakdown across vocabulary, grammar, reading &amp; writing</li>
                    <li>Detailed analysis with question-by-question feedback — emailed to you</li>
                    <li>Personalised recommendations to improve with WriteWise</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-3">
            <Button
              onClick={handleStart}
              disabled={isStarting || state.isGenerating}
              className="bg-gradient-brand hover:opacity-90 text-white px-10 py-3 text-base font-semibold h-auto w-full sm:w-auto"
            >
              {isStarting || state.isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Preparing your test…
                </>
              ) : (
                <>
                  Begin Test
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
            {(isStarting || state.isGenerating) && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Our AI is generating a personalised test for you — this takes about 15 seconds.
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Instructions will be in{' '}
              <strong>{state.nativeLanguage}</strong>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
