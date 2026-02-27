import type { PlacementTask } from '@/lib/placement-test-api';

interface Props {
  task: PlacementTask;
  answer: string;
  onChange: (taskId: string, value: string) => void;
}

export function MultipleChoiceRenderer({ task, answer, onChange }: Props) {
  const options = task.options ?? [];

  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-foreground">{task.question}</p>
      <div className="space-y-2.5">
        {options.map((option, i) => {
          const isSelected = answer === option;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(task.id, option)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 text-sm font-medium
                ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 text-purple-900'
                    : 'border-border bg-white hover:border-purple-300 hover:bg-purple-50/40 text-foreground'
                }`}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold
                    ${isSelected ? 'border-purple-500 bg-purple-500 text-white' : 'border-border text-muted-foreground'}`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
