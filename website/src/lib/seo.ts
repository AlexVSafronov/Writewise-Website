// JSON-LD schema generator functions for structured data

export const generateOrganizationSchema = (name: string, url: string, logo?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  url,
  ...(logo && { logo }),
});

export const generateWebsiteSchema = (name: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name,
  url,
});

export const generateArticleSchema = (params: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: params.title,
  description: params.description,
  url: params.url,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': params.url,
  },
  datePublished: params.datePublished,
  dateModified: params.dateModified,
  author: {
    '@type': 'Person',
    name: params.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'WriteWise',
    url: 'https://write-wise.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://write-wise.com/favicon.svg',
    },
  },
  ...(params.image && { image: [params.image] }),
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
