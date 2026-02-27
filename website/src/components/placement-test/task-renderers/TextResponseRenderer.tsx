import { Textarea } from '@/components/ui/textarea';
import type { PlacementTask } from '@/lib/placement-test-api';

interface Props {
  task: PlacementTask;
  answer: string;
  onChange: (taskId: string, value: string) => void;
}

export function TextResponseRenderer({ task, answer, onChange }: Props) {
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const minWords = task.minWords ?? 30;
  const isEnough = wordCount >= minWords;

  return (
    <div className="space-y-3">
      <p className="text-base font-medium text-foreground">{task.prompt}</p>
      <Textarea
        value={answer}
        onChange={(e) => onChange(task.id, e.target.value)}
        placeholder={`Write your answer in ${task.targetCEFR === 'A1' || task.targetCEFR === 'A2' ? 'simple sentences' : 'at least ' + minWords + ' words'}…`}
        className="min-h-[140px] text-sm resize-y"
      />
      <div className="flex items-center justify-between text-xs">
        <span
          className={`font-medium transition-colors ${
            isEnough ? 'text-green-600' : 'text-muted-foreground'
          }`}
        >
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
          {!isEnough && ` (aim for at least ${minWords})`}
          {isEnough && ' ✓'}
        </span>
        <span className="text-muted-foreground">
          Answer in <strong>{task.id.split('-')[0] === 't' ? 'the target language' : 'the target language'}</strong>
        </span>
      </div>
    </div>
  );
}
