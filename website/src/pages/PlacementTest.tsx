import { PlacementTestProvider, usePlacementTest } from '@/components/placement-test/PlacementTestContext';
import { LandingStep } from '@/components/placement-test/steps/LandingStep';
import { IntroStep } from '@/components/placement-test/steps/IntroStep';
import { ExamStep } from '@/components/placement-test/steps/ExamStep';
import { ResultsStep } from '@/components/placement-test/steps/ResultsStep';

/**
 * Inner component that reads context and renders the appropriate step.
 * Separated from the provider so it can consume context.
 */
function PlacementTestFlow() {
  const { state } = usePlacementTest();

  switch (state.step) {
    case 'landing':
      return <LandingStep />;
    case 'intro':
      return <IntroStep />;
    case 'exam':
      return <ExamStep />;
    case 'results':
      return <ResultsStep />;
    default:
      return <LandingStep />;
  }
}

/**
 * Public route: /placement-test
 *
 * Manages the full placement test user journey:
 *  1. Landing page  — marketing + lead capture form (website design)
 *  2. Intro screen  — what to expect (app design, no header/footer)
 *  3. Exam          — AI-generated CEFR test (app design)
 *  4. Results       — CEFR level + summary + CTAs (app design)
 *
 * State is managed via PlacementTestContext and persisted to sessionStorage
 * so users don't lose progress on accidental page refresh during the exam.
 */
export default function PlacementTest() {
  return (
    <PlacementTestProvider>
      <PlacementTestFlow />
    </PlacementTestProvider>
  );
}
