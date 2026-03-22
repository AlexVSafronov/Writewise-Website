import { PlacementTestProvider, usePlacementTest } from '@/components/placement-test/PlacementTestContext';
import { LanguageLandingStep } from '@/components/placement-test/steps/LanguageLandingStep';
import { IntroStep } from '@/components/placement-test/steps/IntroStep';
import { ExamStep } from '@/components/placement-test/steps/ExamStep';
import { ResultsStep } from '@/components/placement-test/steps/ResultsStep';

/**
 * Inner flow — reads context and renders the appropriate step.
 * Separated from the provider so it can consume context.
 */
function PlacementTestFlow() {
  const { state } = usePlacementTest();

  switch (state.step) {
    case 'landing':
      return <LanguageLandingStep />;
    case 'intro':
      return <IntroStep />;
    case 'exam':
      return <ExamStep />;
    case 'results':
      return <ResultsStep />;
    default:
      return <LanguageLandingStep />;
  }
}

/**
 * Shared placement test flow runner.
 *
 * Used by language-specific entry pages (PlacementTestGerman, PlacementTestEnglish).
 * The `initialLanguage` prop pre-sets the language in context so the landing step
 * renders the correct language-specific SEO content without needing a form selector.
 *
 * Flow:
 *  1. landing  — language-specific SEO page (LanguageLandingStep)
 *  2. intro    — registration form → test details (IntroStep)
 *  3. exam     — AI-generated CEFR test (ExamStep)
 *  4. results  — CEFR level + summary + CTAs (ResultsStep)
 *
 * State is persisted to sessionStorage so users don't lose progress on refresh.
 */
export default function PlacementTest({ initialLanguage }: { initialLanguage: string }) {
  return (
    <PlacementTestProvider initialLanguage={initialLanguage}>
      <PlacementTestFlow />
    </PlacementTestProvider>
  );
}
