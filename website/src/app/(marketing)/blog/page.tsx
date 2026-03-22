import type { Metadata } from 'next';
import { strapiClient } from '@/lib/strapi';
import BlogPage from '@/page-components/Blog';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'WriteWise Blog — Language Learning Tips & Insights',
  description:
    'Expert articles on language learning, AI technology, and effective communication. Tips, research, and success stories for intermediate learners (A2–C1).',
  keywords: 'language learning blog, AI language learning, writing tips, CEFR, WriteWise',
  alternates: {
    canonical: 'https://write-wise.com/blog',
  },
  openGraph: {
    title: 'WriteWise Blog — Language Learning Tips & Insights',
    description:
      'Expert articles on language learning, AI technology, and effective communication.',
    url: 'https://write-wise.com/blog',
    type: 'website',
  },
};

export default async function BlogListingPage() {
  const initialData = await strapiClient.getBlogPosts().catch(() => undefined);
  return <BlogPage initialData={initialData} />;
}
