import type { Metadata } from 'next';
import { strapiClient } from '@/lib/strapi';
import PageContent from '@/page-components/Page';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the WriteWise Privacy Policy to understand how we collect, use and protect your personal data.',
  alternates: {
    canonical: 'https://write-wise.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | WriteWise',
    description: 'Read the WriteWise Privacy Policy to understand how we collect, use and protect your personal data.',
    url: 'https://write-wise.com/privacy',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default async function PrivacyPage() {
  let pageData;
  try {
    const result = await strapiClient.getPage('privacy');
    pageData = result.data?.[0] ?? null;
  } catch {
    pageData = null;
  }

  return <PageContent slug="privacy" initialData={pageData} />;
}
