const STRAPI_URL =
  import.meta.env.VITE_STRAPI_URL ||
  'https://writewise-cms-m2xkjyh6ta-oe.a.run.app';

const API_BASE = `${STRAPI_URL}/api`;

// ============================================================================
// Types (mirrors the Kotlin models from the app service)
// ============================================================================

export interface PlacementTask {
  id: string;
  type:
    | 'multiple_choice'
    | 'fill_in_blank'
    | 'text_response'
    | 'sentence_ordering'
    | 'error_correction'
    | 'reading_comprehension'
    | 'matching';
  targetCEFR: string;
  instruction: string;

  // multiple_choice
  question?: string;
  options?: string[];

  // fill_in_blank
  template?: string;
  blanks?: number;

  // text_response
  prompt?: string;
  minWords?: number;

  // sentence_ordering
  shuffledParts?: string[];

  // error_correction
  sentence?: string;

  // reading_comprehension
  passage?: string;
  subQuestions?: PlacementTask[];

  // matching
  leftItems?: string[];
  rightItems?: string[];
}

export interface PlacementSection {
  id: string;
  title: string;
  targetLevels: string;
  tasks: PlacementTask[];
}

export interface PlacementTest {
  id: string;
  language: string;
  nativeLanguage: string;
  estimatedMinutes: number;
  sections: PlacementSection[];
}

export interface DimensionScores {
  range: number;                // 0-100 — lexis & grammar variety
  accuracy: number;             // 0-100 — grammar, spelling, punctuation
  coherenceAndCohesion: number; // 0-100 — organisation & connectors
  taskFulfilment: number;       // 0-100 — relevance & completeness
}

export interface QuestionAnalysis {
  questionId: string;
  taskType: string;
  userAnswer: string;
  isCorrect: boolean | null;
  feedback: string;
  suggestedCorrection?: string;
}

export interface PlacementEvaluationResult {
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  overallScore: number;
  highLevelSummary: string;
  strongAreas: string[];
  improvementAreas: string[];
  dimensionScores: DimensionScores;
  detailedAnalysis: QuestionAnalysis[];
  recommendations: string;
}

// ============================================================================
// API calls (all through CMS as proxy)
// ============================================================================

/** Register lead and subscribe to Mailjet. Returns sessionId. */
export async function registerPlacementLead(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  language: string;
  consent: true;
}): Promise<{ success: boolean; sessionId: string }> {
  const res = await fetch(`${API_BASE}/placement-test/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Registration failed (${res.status})`);
  }
  return res.json();
}

/** Generate the AI placement test. Returns the test JSON including its id. */
export async function generatePlacementTest(data: {
  language: string;
  nativeLanguage: string;
}): Promise<PlacementTest> {
  const res = await fetch(`${API_BASE}/placement-test/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Test generation failed (${res.status})`);
  }
  return res.json();
}

/** Evaluate answers and get CEFR result. Uses testId (from PlacementTest.id) instead of the full test object. */
export async function evaluatePlacementTest(data: {
  testId: string;
  language: string;
  nativeLanguage: string;
  answers: Record<string, string>;
  email: string;
  firstName: string;
}): Promise<PlacementEvaluationResult> {
  const res = await fetch(`${API_BASE}/placement-test/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Evaluation failed (${res.status})`);
  }
  return res.json();
}
