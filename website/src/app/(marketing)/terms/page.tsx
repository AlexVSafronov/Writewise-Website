import type { Metadata } from 'next';
import { strapiClient } from '@/lib/strapi';
import PageContent from '@/page-components/Page';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the WriteWise Terms of Service to understand the terms and conditions for using our platform.',
  alternates: {
    canonical: 'https://write-wise.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | WriteWise',
    description: 'Read the WriteWise Terms of Service to understand the terms and conditions for using our platform.',
    url: 'https://write-wise.com/terms',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default async function TermsPage() {
  let pageData;
  try {
    const result = await strapiClient.getPage('terms');
    pageData = result.data?.[0] ?? null;
  } catch {
    pageData = null;
  }

  return <PageContent slug="terms" initialData={pageData} />;
}
