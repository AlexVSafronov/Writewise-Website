import { Input } from '@/components/ui/input';
import type { PlacementTask } from '@/lib/placement-test-api';

interface Props {
  task: PlacementTask;
  answer: string;
  onChange: (taskId: string, value: string) => void;
}

export function FillInBlankRenderer({ task, answer, onChange }: Props) {
  const template = task.template ?? '';
  // Split on ___ to show surrounding text
  const parts = template.split('___');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-base leading-relaxed">
        {parts.map((part, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-foreground">{part}</span>
            {i < parts.length - 1 && (
              <Input
                value={answer}
                onChange={(e) => onChange(task.id, e.target.value)}
                placeholder="…"
                className="inline-block w-36 h-9 text-center border-b-2 border-t-0 border-x-0 rounded-none border-purple-400 focus:border-purple-600 bg-transparent px-2 text-sm font-medium"
              />
            )}
          </span>
        ))}
      </div>
      {(task.blanks ?? 1) > 1 && (
        <p className="text-xs text-muted-foreground">
          Hint: There {task.blanks === 2 ? 'are 2 blanks' : `are ${task.blanks} blanks`} — separate
          your answers with a comma.
        </p>
      )}
    </div>
  );
}
