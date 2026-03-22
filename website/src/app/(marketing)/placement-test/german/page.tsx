import type { Metadata } from 'next';
import { PlacementTestLanding } from '@/components/pages/PlacementTestLanding';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'German Language Placement Test — Free CEFR Assessment',
  description:
    'Take our free AI-powered German placement test and discover your exact CEFR level (A1–C2) across grammar, vocabulary, reading and writing. Results in 20 minutes.',
  keywords:
    'German placement test, Deutsch Einstufungstest, CEFR level German, German language assessment, free German test',
  alternates: {
    canonical: 'https://write-wise.com/placement-test/german',
  },
  openGraph: {
    title: 'German Language Placement Test — Free CEFR Assessment | WriteWise',
    description:
      'Take our free AI-powered German placement test and discover your exact CEFR level (A1–C2) across grammar, vocabulary, reading and writing. Results in 20 minutes.',
    url: 'https://write-wise.com/placement-test/german',
    type: 'website',
  },
};

export default function PlacementTestGermanPage() {
  return (
    <PlacementTestLanding
      language="German"
      flagEmoji="🇩🇪"
      flagCode="de"
      externalTestUrl="https://app.write-wise.com/placement-test/german"
    />
  );
}
