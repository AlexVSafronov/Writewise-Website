import type { Metadata } from 'next';
import { strapiClient } from '@/lib/strapi';
import PricingPage from '@/page-components/Pricing';
import { WRITEWISE_APP_SCHEMA_JSON } from '@/lib/seo';

export const revalidate = 900;

export const metadata: Metadata = {
  title: 'Pricing — Start Free | WriteWise',
  description:
    'Simple, transparent pricing for AI-powered language learning. Start free and upgrade anytime. Choose from Free, Pro, or Premium plans.',
  keywords: 'WriteWise pricing, language learning subscription, AI tutor cost',
  alternates: {
    canonical: 'https://write-wise.com/pricing',
  },
  openGraph: {
    title: 'Pricing — Start Free | WriteWise',
    description:
      'Simple, transparent pricing for AI-powered language learning. Start free and upgrade anytime.',
    url: 'https://write-wise.com/pricing',
    type: 'website',
  },
};

export default async function PricingRoute() {
  const [pricingResult, faqResult] = await Promise.allSettled([
    strapiClient.getStripePricing(900),
    strapiClient.getFAQs('Pricing', 900),
  ]);

  const initialPricingData =
    pricingResult.status === 'fulfilled' ? pricingResult.value : undefined;
  const initialFaqData =
    faqResult.status === 'fulfilled' ? faqResult.value : undefined;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WRITEWISE_APP_SCHEMA_JSON }} />
      <PricingPage
        initialPricingData={initialPricingData}
        initialFaqData={initialFaqData}
      />
    </>
  );
}
