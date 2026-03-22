import type { Metadata } from 'next';
import Script from 'next/script';
import Providers from '@/components/Providers';
import './globals.css';

const GA4_ID = 'G-VSCF3D4V1F';

export const metadata: Metadata = {
  metadataBase: new URL('https://write-wise.com'),
  title: {
    default: 'WriteWise — Learn German Effectively',
    template: '%s | WriteWise',
  },
  description:
    'WriteWise is an AI-powered German language learning platform that helps you master writing, grammar and vocabulary at your own pace.',
  openGraph: {
    siteName: 'WriteWise',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WriteWise',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Google Analytics 4 — loaded after page is interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`}
        </Script>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
