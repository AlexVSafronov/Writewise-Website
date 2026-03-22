import type { Metadata } from 'next';
import About from '@/page-components/About';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'About WriteWise',
  description:
    'Learn about WriteWise\'s mission to make language learning personal. Discover how our AI-powered platform helps intermediate learners (A2–C1) develop real communication skills.',
  alternates: {
    canonical: 'https://write-wise.com/about',
  },
  openGraph: {
    title: 'About WriteWise - Our Mission & Story',
    description:
      'Learn about WriteWise\'s mission to make language learning personal. Discover how our AI-powered platform helps intermediate learners (A2–C1) develop real communication skills.',
    url: 'https://write-wise.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <About />;
}
