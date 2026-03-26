// JSON-LD schema generator functions for structured data

export const generateOrganizationSchema = (name: string, url: string, logoUrl?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  url,
  description:
    'WriteWise is an AI-powered language learning platform helping intermediate learners (A2–C1) master writing, grammar and vocabulary through personalized exercises and real-time AI feedback.',
  ...(logoUrl && {
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
    },
  }),
  sameAs: ['https://twitter.com/WriteWise'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://write-wise.com/contact',
  },
});

export const generateWebsiteSchema = (name: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name,
  url,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${url}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const generateSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'WriteWise',
  applicationCategory: 'EducationApplication',
  operatingSystem: 'Web',
  url: 'https://write-wise.com',
  description:
    'AI-powered language learning for intermediate learners (A2–C1). Practice writing, grammar and vocabulary with personalized AI feedback and adaptive learning paths covering 6+ languages.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '19',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Premium',
      price: '49',
      priceCurrency: 'USD',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1000',
    bestRating: '5',
    worstRating: '1',
  },
});

// Pre-computed WriteWise schemas — avoids redundant object creation and JSON.stringify on every request.
export const WRITEWISE_ORG_SCHEMA_JSON = JSON.stringify(
  generateOrganizationSchema('WriteWise', 'https://write-wise.com', 'https://write-wise.com/og-image.png'),
);
export const WRITEWISE_WEBSITE_SCHEMA_JSON = JSON.stringify(
  generateWebsiteSchema('WriteWise', 'https://write-wise.com'),
);
export const WRITEWISE_APP_SCHEMA_JSON = JSON.stringify(generateSoftwareApplicationSchema());

export const generateArticleSchema = (
  title: string,
  description: string,
  datePublished: string,
  author: string,
  image?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  datePublished,
  author: {
    '@type': 'Person',
    name: author,
  },
  ...(image && { image }),
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
