import type { Metadata } from 'next';
import { strapiClient } from '@/lib/strapi';
import ResourcesPage from '@/page-components/Resources';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Learning Resources — Videos, Guides & Tools | WriteWise',
  description:
    'Free German learning resources: video tutorials, guides, tools, and FAQs to accelerate your language learning journey with WriteWise.',
  keywords: 'German learning resources, WriteWise tutorials, language learning guides, writing practice tips, WriteWise FAQ',
  alternates: {
    canonical: 'https://write-wise.com/resources',
  },
  openGraph: {
    title: 'Learning Resources — Videos, Guides & Tools | WriteWise',
    description:
      'Free German learning resources: video tutorials, guides, tools, and FAQs.',
    url: 'https://write-wise.com/resources',
    type: 'website',
  },
};

export default async function ResourcesRoute() {
  const [resourcesResult, faqResult] = await Promise.allSettled([
    strapiClient.getResources(),
    strapiClient.getFAQs(),
  ]);

  const initialResourcesData =
    resourcesResult.status === 'fulfilled' ? resourcesResult.value : undefined;
  const initialFaqData =
    faqResult.status === 'fulfilled' ? faqResult.value : undefined;

  return (
    <ResourcesPage
      initialResourcesData={initialResourcesData}
      initialFaqData={initialFaqData}
    />
  );
}
