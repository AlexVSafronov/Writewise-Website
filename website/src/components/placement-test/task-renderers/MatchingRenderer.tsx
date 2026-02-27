import { useState, useEffect } from 'react';
import type { PlacementTask } from '@/lib/placement-test-api';

interface Props {
  task: PlacementTask;
  answer: string;
  onChange: (taskId: string, value: string) => void;
}

// answer format: "left1→right2,left2→right1,..."
function encodeMatches(matches: Record<string, string>): string {
  return Object.entries(matches)
    .map(([l, r]) => `${l}→${r}`)
    .join(',');
}

function decodeMatches(answer: string): Record<string, string> {
  if (!answer) return {};
  return Object.fromEntries(
    answer
      .split(',')
      .filter(Boolean)
      .map((pair) => pair.split('→'))
      .filter((parts) => parts.length === 2)
      .map(([l, r]) => [l, r])
  );
}

export function MatchingRenderer({ task, answer, onChange }: Props) {
  const leftItems = task.leftItems ?? [];
  const rightItems = task.rightItems ?? [];

  const [matches, setMatches] = useState<Record<string, string>>(() => decodeMatches(answer));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  useEffect(() => {
    onChange(task.id, encodeMatches(matches));
  }, [matches]);

  const usedRight = new Set(Object.values(matches));

  function handleLeftClick(left: string) {
    // Toggle selection or clear existing match
    if (selectedLeft === left) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(left);
    }
  }

  function handleRightClick(right: string) {
    if (!selectedLeft) return;

    setMatches((prev) => {
      const next = { ...prev };
      // Remove any existing mapping to this right item
      Object.keys(next).forEach((k) => {
        if (next[k] === right) delete next[k];
      });
      next[selectedLeft] = right;
      return next;
    });
    setSelectedLeft(null);
  }

  function removeMatch(left: string) {
    setMatches((prev) => {
      const next = { ...prev };
      delete next[left];
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Click a left item, then click the matching right item to create a pair.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Items</p>
          {leftItems.map((left) => {
            const matchedRight = matches[left];
            const isSelected = selectedLeft === left;
            const isMatched = Boolean(matchedRight);

            return (
              <button
                key={left}
                type="button"
                onClick={() => isMatched ? removeMatch(left) : handleLeftClick(left)}
                className={`w-full text-left px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all
                  ${isSelected ? 'border-purple-500 bg-purple-50 text-purple-900' : ''}
                  ${isMatched ? 'border-green-500 bg-green-50 text-green-900' : ''}
                  ${!isSelected && !isMatched ? 'border-border bg-white hover:border-purple-300 hover:bg-purple-50/40' : ''}
                `}
              >
                <span className="flex items-center justify-between gap-2">
                  <span>{left}</span>
                  {isMatched && (
                    <span className="text-xs text-green-600 shrink-0">→ {matchedRight}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Matches</p>
          {rightItems.map((right) => {
            const isUsed = usedRight.has(right);
            return (
              <button
                key={right}
                type="button"
                onClick={() => !isUsed && handleRightClick(right)}
                disabled={isUsed && !selectedLeft}
                className={`w-full text-left px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all
                  ${isUsed ? 'border-green-300 bg-green-50 text-green-700 opacity-60 cursor-default' : ''}
                  ${!isUsed && selectedLeft ? 'border-blue-300 bg-blue-50 hover:border-blue-500 hover:bg-blue-100 cursor-pointer' : ''}
                  ${!isUsed && !selectedLeft ? 'border-border bg-white text-muted-foreground cursor-default' : ''}
                `}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>

      {selectedLeft && (
        <p className="text-xs text-purple-600 font-medium">
          Now click a right-column item to match with "{selectedLeft}"
        </p>
      )}
    </div>
  );
}
