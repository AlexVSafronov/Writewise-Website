import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Brain,
  Target,
  BookOpen,
  Shield,
  CheckCircle2,
  ArrowRight,
  Loader2,
  PenTool,
} from 'lucide-react';
import { usePlacementTest } from '../PlacementTestContext';
import { generatePlacementTest } from '@/lib/placement-test-api';
import { toast } from 'sonner';

export function IntroStep() {
  const { state, dispatch } = usePlacementTest();
  const [isStarting, setIsStarting] = useState(false);

  async function handleStart() {
    if (!state.language || !state.nativeLanguage) {
      toast.error('Language information missing. Please start again.');
      dispatch({ type: 'RESET' });
      return;
    }

    setIsStarting(true);
    dispatch({ type: 'SET_GENERATING', payload: true });

    try {
      const test = await generatePlacementTest({
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
              <PenTool className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">WriteWise</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Free Assessment
          </Badge>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm">
            <Target className="mr-1.5 h-3.5 w-3.5" />
            {state.language} Placement Test
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Discover Your{' '}
            <span className="text-gradient-brand">{state.language} Level</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Hi {state.userInfo?.firstName}! Take our AI-powered placement test to find your
            exact CEFR level across all language skills.
          </p>
        </div>

        {/* At a glance */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          {[
            {
              icon: Clock,
              title: '~20 Minutes',
              desc: 'Complete at your own pace — no time limit per question',
            },
            {
              icon: Brain,
              title: '20 Questions',
              desc: 'Covering grammar, vocabulary, writing, and comprehension',
            },
            {
              icon: Target,
              title: 'CEFR Assessment',
              desc: 'Get your exact level from A1 to C2 with detailed analysis',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border-0 shadow-sm text-center">
              <CardContent className="pt-6 pb-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="border-0 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                step: '1',
                title: 'Answer diverse question types',
                desc: 'Multiple choice, fill-in-the-gap, sentence reordering, error correction, matching, and short writing tasks.',
              },
              {
                step: '2',
                title: 'Questions progress across CEFR levels',
                desc: 'The test covers A1 through C2 — foundations, intermediate, and advanced — gradually increasing in difficulty.',
              },
              {
                step: '3',
                title: 'Get instant results',
                desc: 'Receive your CEFR level with a skill breakdown across vocabulary, grammar, reading, and writing.',
              },
              {
                step: '4',
                title: 'Receive a detailed report',
                desc: 'A comprehensive analysis is emailed to you with personalised learning recommendations.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Before You Start */}
        <Card className="border-0 shadow-sm bg-muted/50 mb-10">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Before You Start
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                'Find a quiet place without distractions',
                'Answer from your current knowledge — no dictionaries or translators',
                "If a question is too hard, skip it — that's useful information too",
                'For writing tasks, aim for clear and natural language',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-brand text-white px-10 text-base"
            onClick={handleStart}
            disabled={isStarting || state.isGenerating}
          >
            {isStarting || state.isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Preparing your test…
              </>
            ) : (
              <>
                Begin Placement Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          {(isStarting || state.isGenerating) && (
            <p className="text-sm text-muted-foreground mt-3 animate-pulse">
              Our AI is generating a personalised {state.language} test — this may take 1–2 minutes. Please don't close this tab.
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            Instructions will be in <strong>{state.nativeLanguage}</strong>
          </p>
        </div>
      </main>
    </div>
  );
}
