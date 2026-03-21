import type { Metadata } from 'next';
import Freelancers from '@/page-components/Freelancers';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'WriteWise for Freelance Language Tutors — Save Time, Grow Your Business',
  description:
    'WriteWise helps freelance language tutors cut prep and review time by up to 70%, track student performance with real data, and take on more students without burning out.',
  keywords:
    'freelance language tutor, AI language teaching tool, student progress tracking, CEFR exercises, language tutor software',
  alternates: {
    canonical: 'https://write-wise.com/for-freelancers',
  },
  openGraph: {
    title: 'WriteWise for Freelance Language Tutors',
    description:
      'WriteWise helps freelance language tutors cut prep and review time by up to 70%, track student performance with real data, and take on more students without burning out.',
    url: 'https://write-wise.com/for-freelancers',
    type: 'website',
  },
};

export default function FreelancersPage() {
  return <Freelancers />;
}
