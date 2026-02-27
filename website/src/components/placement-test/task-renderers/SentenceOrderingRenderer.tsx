import { useState, useEffect } from 'react';
import { GripVertical, X } from 'lucide-react';
import type { PlacementTask } from '@/lib/placement-test-api';

interface Props {
  task: PlacementTask;
  answer: string;
  onChange: (taskId: string, value: string) => void;
}

export function SentenceOrderingRenderer({ task, answer, onChange }: Props) {
  const shuffled = task.shuffledParts ?? [];

  // orderedParts: what the user has placed so far
  const [orderedParts, setOrderedParts] = useState<string[]>(() =>
    answer ? answer.split(' | ') : []
  );
  // remainingParts: not yet placed
  const [remainingParts, setRemainingParts] = useState<string[]>(() => {
    if (answer) {
      const placed = answer.split(' | ');
      return shuffled.filter((p) => !placed.includes(p));
    }
    return [...shuffled];
  });

  // Sync state → answer string
  useEffect(() => {
    onChange(task.id, orderedParts.join(' | '));
  }, [orderedParts]);

  function addPart(part: string) {
    setOrderedParts((prev) => [...prev, part]);
    setRemainingParts((prev) => prev.filter((p) => p !== part));
  }

  function removePart(index: number) {
    const removed = orderedParts[index];
    setOrderedParts((prev) => prev.filter((_, i) => i !== index));
    setRemainingParts((prev) => [...prev, removed]);
  }

  function clearAll() {
    setRemainingParts([...shuffled]);
    setOrderedParts([]);
  }

  return (
    <div className="space-y-4">
      {/* Built sentence area */}
      <div className="min-h-[56px] p-3 bg-purple-50 border-2 border-purple-200 rounded-xl flex flex-wrap gap-2 items-start">
        {orderedParts.length === 0 ? (
          <span className="text-sm text-muted-foreground self-center">
            Click words below to build the sentence…
          </span>
        ) : (
          orderedParts.map((part, i) => (
            <button
              key={i}
              type="button"
              onClick={() => removePart(i)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              {part}
              <X className="w-3 h-3" />
            </button>
          ))
        )}
      </div>

      {/* Available parts */}
      <div className="flex flex-wrap gap-2">
        {remainingParts.map((part, i) => (
          <button
            key={i}
            type="button"
            onClick={() => addPart(part)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-border rounded-lg text-sm font-medium hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            <GripVertical className="w-3 h-3 text-muted-foreground" />
            {part}
          </button>
        ))}
      </div>

      {orderedParts.length > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="text-xs text-muted-foreground hover:text-foreground underline"
        >
          Clear and start over
        </button>
      )}
    </div>
  );
}
