import type { Metadata } from 'next';
import { strapiClient } from '@/lib/strapi';
import IndexPage from '@/page-components/Index';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'WriteWise - AI-Powered Language Learning Platform',
  description:
    'WriteWise helps you master German, English and other languages with AI-powered writing exercises, personalized feedback, and adaptive learning paths (A2–C1).',
  keywords:
    'German language learning, Deutsch lernen, English language learning, AI language tutor, CEFR placement test, writing practice, language learning app, multilingual AI tutor',
  alternates: {
    canonical: 'https://write-wise.com',
  },
  openGraph: {
    title: 'WriteWise - AI-Powered Language Learning Platform',
    description:
      'WriteWise helps you master German, English and other languages with AI-powered writing exercises, personalized feedback, and adaptive learning paths (A2–C1).',
    url: 'https://write-wise.com',
    type: 'website',
  },
};

export default async function HomePage() {
  const [featuresResult, testimonialsResult] = await Promise.allSettled([
    strapiClient.getFeatures(),
    strapiClient.getTestimonials(true),
  ]);

  const initialFeatures =
    featuresResult.status === 'fulfilled' ? featuresResult.value : undefined;
  const initialTestimonials =
    testimonialsResult.status === 'fulfilled' ? testimonialsResult.value : undefined;

  return (
    <IndexPage
      initialFeaturesData={initialFeatures}
      initialTestimonialsData={initialTestimonials}
    />
  );
}
