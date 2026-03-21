import type { Metadata } from 'next';
import { PlacementTestLanding } from '@/components/pages/PlacementTestLanding';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'English Language Placement Test — Free CEFR Assessment',
  description:
    'Take our free AI-powered English placement test and discover your exact CEFR level (A1–C2) across grammar, vocabulary, reading and writing. Results in 20 minutes.',
  keywords:
    'English placement test, CEFR level English, English language assessment, free English test, IELTS preparation',
  alternates: {
    canonical: 'https://write-wise.com/placement-test/english',
  },
  openGraph: {
    title: 'English Language Placement Test — Free CEFR Assessment | WriteWise',
    description:
      'Take our free AI-powered English placement test and discover your exact CEFR level (A1–C2) across grammar, vocabulary, reading and writing. Results in 20 minutes.',
    url: 'https://write-wise.com/placement-test/english',
    type: 'website',
  },
};

export default function PlacementTestEnglishPage() {
  return (
    <PlacementTestLanding
      language="English"
      flagEmoji="🇬🇧"
      flagCode="gb"
      externalTestUrl="https://app.write-wise.com/placement-test/english"
    />
  );
}
