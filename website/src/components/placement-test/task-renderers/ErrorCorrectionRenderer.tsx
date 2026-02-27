import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';
import type { PlacementTask } from '@/lib/placement-test-api';

interface Props {
  task: PlacementTask;
  answer: string;
  onChange: (taskId: string, value: string) => void;
}

export function ErrorCorrectionRenderer({ task, answer, onChange }: Props) {
  return (
    <div className="space-y-4">
      {/* Original sentence */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-amber-700 font-medium mb-1 uppercase tracking-wide">
            Original sentence (contains error{task.sentence && task.sentence.length > 80 ? 's' : ''})
          </p>
          <p className="text-base text-amber-900 font-medium italic">"{task.sentence}"</p>
        </div>
      </div>

      {/* Correction input */}
      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">
          Write the corrected sentence:
        </label>
        <Textarea
          value={answer}
          onChange={(e) => onChange(task.id, e.target.value)}
          placeholder="Type the corrected sentence here…"
          className="min-h-[80px] text-sm resize-none"
        />
      </div>
    </div>
  );
}
