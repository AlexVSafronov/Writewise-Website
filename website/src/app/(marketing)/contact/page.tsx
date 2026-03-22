import type { Metadata } from 'next';
import Contact from '@/page-components/Contact';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with WriteWise. We\'d love to hear from you about your language learning journey.',
  alternates: {
    canonical: 'https://write-wise.com/contact',
  },
  openGraph: {
    title: 'Contact Us | WriteWise',
    description: 'Get in touch with WriteWise. We\'d love to hear from you about your language learning journey.',
    url: 'https://write-wise.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <Contact />;
}
