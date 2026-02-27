import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Send, Loader2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { usePlacementTest } from '../PlacementTestContext';
import { evaluatePlacementTest } from '@/lib/placement-test-api';
import { MultipleChoiceRenderer } from '../task-renderers/MultipleChoiceRenderer';
import { FillInBlankRenderer } from '../task-renderers/FillInBlankRenderer';
import { TextResponseRenderer } from '../task-renderers/TextResponseRenderer';
import { SentenceOrderingRenderer } from '../task-renderers/SentenceOrderingRenderer';
import { ErrorCorrectionRenderer } from '../task-renderers/ErrorCorrectionRenderer';
import { ReadingComprehensionRenderer } from '../task-renderers/ReadingComprehensionRenderer';
import { MatchingRenderer } from '../task-renderers/MatchingRenderer';
import type { PlacementTask } from '@/lib/placement-test-api';

const STEP_INDICATOR = ['Intro', 'Test', 'Results'];

const CEFR_BADGE_COLORS: Record<string, string> = {
  A1: 'bg-slate-100 text-slate-700',
  A2: 'bg-blue-100 text-blue-700',
  B1: 'bg-green-100 text-green-700',
  B2: 'bg-teal-100 text-teal-700',
  C1: 'bg-purple-100 text-purple-700',
  C2: 'bg-amber-100 text-amber-700',
};

function TaskRenderer({
  task,
  answers,
  onChange,
}: {
  task: PlacementTask;
  answers: Record<string, string>;
  onChange: (taskId: string, value: string) => void;
}) {
  switch (task.type) {
    case 'multiple_choice':
      return (
        <MultipleChoiceRenderer task={task} answer={answers[task.id] ?? ''} onChange={onChange} />
      );
    case 'fill_in_blank':
      return (
        <FillInBlankRenderer task={task} answer={answers[task.id] ?? ''} onChange={onChange} />
      );
    case 'text_response':
      return (
        <TextResponseRenderer task={task} answer={answers[task.id] ?? ''} onChange={onChange} />
      );
    case 'sentence_ordering':
      return (
        <SentenceOrderingRenderer task={task} answer={answers[task.id] ?? ''} onChange={onChange} />
      );
    case 'error_correction':
      return (
        <ErrorCorrectionRenderer task={task} answer={answers[task.id] ?? ''} onChange={onChange} />
      );
    case 'reading_comprehension':
      return (
        <ReadingComprehensionRenderer task={task} answers={answers} onChange={onChange} />
      );
    case 'matching':
      return (
        <MatchingRenderer task={task} answer={answers[task.id] ?? ''} onChange={onChange} />
      );
    default:
      return (
        <p className="text-sm text-muted-foreground">Unsupported task type: {task.type}</p>
      );
  }
}

export function ExamStep() {
  const { state, dispatch } = usePlacementTest();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const test = state.test;
  if (!test) return null;

  const sections = test.sections;
  const currentSection = sections[currentSectionIndex];
  const currentTask = currentSection?.tasks[currentTaskIndex];

  const totalTasks = sections.reduce((sum, s) => sum + s.tasks.length, 0);
  const completedTasks = sections
    .slice(0, currentSectionIndex)
    .reduce((sum, s) => sum + s.tasks.length, 0) + currentTaskIndex;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  function handleChange(taskId: string, value: string) {
    dispatch({ type: 'SET_ANSWER', payload: { taskId, value } });
  }

  function handleNext() {
    if (currentTaskIndex < currentSection.tasks.length - 1) {
      setCurrentTaskIndex((i) => i + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      // Move to next section
      setCurrentSectionIndex((i) => i + 1);
      setCurrentTaskIndex(0);
    }
  }

  function handlePrev() {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((i) => i - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      setCurrentSectionIndex((i) => i - 1);
      setCurrentTaskIndex(prevSection.tasks.length - 1);
    }
  }

  const isFirstTask = currentSectionIndex === 0 && currentTaskIndex === 0;
  const isLastTask =
    currentSectionIndex === sections.length - 1 &&
    currentTaskIndex === currentSection.tasks.length - 1;
  const isLastTaskInSection = currentTaskIndex === currentSection.tasks.length - 1;

  async function handleSubmit() {
    if (!state.sessionId || !state.language || !state.nativeLanguage || !state.test) {
      toast.error('Session data missing. Please start again.');
      return;
    }
    if (!state.userInfo?.email) {
      toast.error('User information missing. Please start again.');
      return;
    }

    setIsSubmitting(true);
    dispatch({ type: 'SET_EVALUATING', payload: true });

    try {
      const results = await evaluatePlacementTest({
        sessionId: state.sessionId,
        language: state.language,
        nativeLanguage: state.nativeLanguage,
        test: state.test,
        answers: state.answers,
        email: state.userInfo.email,
        firstName: state.userInfo.firstName,
      });
      dispatch({ type: 'SET_RESULTS', payload: results });
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err?.message || 'Evaluation failed' });
      toast.error('Failed to evaluate your test. Please try again.');
      setIsSubmitting(false);
    }
  }

  // Show loading overlay during evaluation
  if (isSubmitting || state.isEvaluating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center animate-pulse">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Evaluating your answers…</h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            Our AI is analysing your responses and determining your CEFR level.
            This usually takes 15–30 seconds.
          </p>
        </div>
        <div className="w-64">
          <Progress value={undefined} className="h-2 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-border bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg bg-gradient-brand bg-clip-text text-transparent">
            WriteWise
          </span>
          <div className="flex items-center gap-2">
            {STEP_INDICATOR.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    i === 1 ? 'text-purple-600' : 'text-muted-foreground'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 1
                        ? 'bg-purple-600 text-white'
                        : i === 0
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i === 0 ? '✓' : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < STEP_INDICATOR.length - 1 && (
                  <div className="w-6 h-px bg-border hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b border-border px-6 py-2">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>
              Section {currentSectionIndex + 1} of {sections.length}:{' '}
              <strong>{currentSection.title}</strong> ({currentSection.targetLevels})
            </span>
            <span>
              Task {currentTaskIndex + 1}/{currentSection.tasks.length} · {progressPercent}% complete
            </span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {currentTask && (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 lg:p-8 space-y-6">
              {/* Task header */}
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-brand text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {completedTasks + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold ${
                        CEFR_BADGE_COLORS[currentTask.targetCEFR] ?? 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {currentTask.targetCEFR}
                    </Badge>
                    <span className="text-xs text-muted-foreground capitalize">
                      {currentTask.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentTask.instruction}
                  </p>
                </div>
              </div>

              {/* Task renderer */}
              <div className="pl-11">
                <TaskRenderer
                  task={currentTask}
                  answers={state.answers}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={isFirstTask}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {isLastTask ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-brand hover:opacity-90 text-white gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Test
                </Button>
              ) : isLastTaskInSection && !isLastTask ? (
                <Button onClick={handleNext} className="bg-gradient-brand hover:opacity-90 text-white gap-2">
                  Next Section
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Section overview dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {currentSection.tasks.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentTaskIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentTaskIndex
                    ? 'bg-purple-600 scale-125'
                    : state.answers[currentSection.tasks[i].id]
                    ? 'bg-green-400'
                    : 'bg-gray-200'
                }`}
                title={`Task ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
