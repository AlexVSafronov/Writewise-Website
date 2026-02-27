import type { PlacementTask } from '@/lib/placement-test-api';
import { MultipleChoiceRenderer } from './MultipleChoiceRenderer';
import { TextResponseRenderer } from './TextResponseRenderer';

interface Props {
  task: PlacementTask;
  answers: Record<string, string>;
  onChange: (taskId: string, value: string) => void;
}

export function ReadingComprehensionRenderer({ task, answers, onChange }: Props) {
  const subQuestions = task.subQuestions ?? [];

  return (
    <div className="space-y-6">
      {/* Passage */}
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-700 font-semibold uppercase tracking-wide mb-3">
          Read the following passage:
        </p>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{task.passage}</p>
      </div>

      {/* Sub-questions */}
      {subQuestions.map((sq, i) => (
        <div key={sq.id} className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <div className="flex-1 space-y-3">
              <p className="text-sm text-muted-foreground font-medium">{sq.instruction}</p>
              {sq.type === 'multiple_choice' ? (
                <MultipleChoiceRenderer
                  task={sq}
                  answer={answers[sq.id] ?? ''}
                  onChange={onChange}
                />
              ) : (
                <TextResponseRenderer
                  task={sq}
                  answer={answers[sq.id] ?? ''}
                  onChange={onChange}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
