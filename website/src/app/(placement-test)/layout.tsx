/**
 * Layout for the placement test flow pages (/placement-test/german, /placement-test/english).
 * Intentionally empty — no marketing Header/Footer — because the test steps
 * (IntroStep, ExamStep, ResultsStep) render their own full-screen headers.
 */
export default function PlacementTestFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
