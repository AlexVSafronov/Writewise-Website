import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type {
  PlacementTest,
  PlacementEvaluationResult,
} from '@/lib/placement-test-api';

// ============================================================================
// Types
// ============================================================================

export type PlacementStep = 'landing' | 'intro' | 'exam' | 'results';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface PlacementTestState {
  step: PlacementStep;
  userInfo: UserInfo | null;
  language: string | null;
  nativeLanguage: string;
  test: PlacementTest | null;
  answers: Record<string, string>;
  results: PlacementEvaluationResult | null;
  isGenerating: boolean;
  isEvaluating: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_STEP'; payload: PlacementStep }
  | { type: 'START_TEST' }
  | {
      type: 'REGISTER_SUCCESS';
      payload: { userInfo: UserInfo; language: string; nativeLanguage: string };
    }
  | { type: 'SET_NATIVE_LANGUAGE'; payload: string }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_TEST'; payload: PlacementTest }
  | { type: 'SET_ANSWER'; payload: { taskId: string; answer: string } }
  | { type: 'SET_EVALUATING'; payload: boolean }
  | { type: 'SET_RESULTS'; payload: PlacementEvaluationResult }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

// ============================================================================
// Native language detection
// ============================================================================

const LOCALE_TO_LANGUAGE: Record<string, string> = {
  en: 'English',
  de: 'German',
  es: 'Spanish',
  fr: 'French',
  it: 'Italian',
  pt: 'Portuguese',
};

export function detectNativeLanguage(): string {
  if (typeof navigator === 'undefined') return 'English';
  const locale = (navigator.language || 'en').split('-')[0].toLowerCase();
  return LOCALE_TO_LANGUAGE[locale] ?? 'English';
}

// ============================================================================
// Reducer
// ============================================================================

const SESSION_KEY = 'ww_placement_test';

function reducer(state: PlacementTestState, action: Action): PlacementTestState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload, error: null };
    case 'START_TEST':
      return { ...state, step: 'intro', error: null };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        userInfo: action.payload.userInfo,
        language: action.payload.language,
        nativeLanguage: action.payload.nativeLanguage,
        step: 'intro',
        error: null,
      };
    case 'SET_NATIVE_LANGUAGE':
      return { ...state, nativeLanguage: action.payload };
    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload, error: null };
    case 'SET_TEST':
      return { ...state, test: action.payload, step: 'exam', isGenerating: false, answers: {} };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.taskId]: action.payload.answer },
      };
    case 'SET_EVALUATING':
      return { ...state, isEvaluating: action.payload, error: null };
    case 'SET_RESULTS':
      return { ...state, results: action.payload, step: 'results', isEvaluating: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isGenerating: false, isEvaluating: false };
    case 'RESET':
      sessionStorage.removeItem(SESSION_KEY);
      return initialState();
    default:
      return state;
  }
}

function initialState(initialLanguage?: string): PlacementTestState {
  return {
    step: 'landing',
    userInfo: null,
    language: initialLanguage ?? null,
    nativeLanguage: detectNativeLanguage(),
    test: null,
    answers: {},
    results: null,
    isGenerating: false,
    isEvaluating: false,
    error: null,
  };
}

function loadFromSession(initialLanguage?: string): PlacementTestState {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PlacementTestState;
      // Restore mid-test session only if it matches the current language context
      if (parsed.step !== 'landing' && (!initialLanguage || parsed.language === initialLanguage)) {
        return parsed;
      }
    }
  } catch {
    // Ignore parse errors
  }
  return initialState(initialLanguage);
}

// ============================================================================
// Context
// ============================================================================

interface PlacementTestContextValue {
  state: PlacementTestState;
  dispatch: React.Dispatch<Action>;
}

const PlacementTestContext = createContext<PlacementTestContextValue | undefined>(undefined);

export function PlacementTestProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage?: string;
}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialLanguage,
    loadFromSession,
  );

  // Persist state to sessionStorage (except landing step — no need)
  useEffect(() => {
    if (state.step !== 'landing') {
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
      } catch {
        // Ignore storage errors
      }
    }
  }, [state]);

  return (
    <PlacementTestContext.Provider value={{ state, dispatch }}>
      {children}
    </PlacementTestContext.Provider>
  );
}

export function usePlacementTest(): PlacementTestContextValue {
  const ctx = useContext(PlacementTestContext);
  if (!ctx) throw new Error('usePlacementTest must be used inside PlacementTestProvider');
  return ctx;
}
