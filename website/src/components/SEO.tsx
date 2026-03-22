'use client';

/**
 * SEO component — thin JSON-LD injector for client components.
 *
 * In Next.js App Router, meta tags (title, description, OG, canonical, robots)
 * are handled server-side via generateMetadata() exports in each page file.
 * This component only injects JSON-LD structured data scripts, which need to
 * be rendered in the DOM.
 *
 * The legacy props (title, description, keywords, etc.) are accepted but
 * intentionally ignored — they are now handled by generateMetadata() on each
 * page. This preserves backward compatibility during migration.
 *
 * Schema generator helpers have been moved to src/lib/seo.ts.
 */

// Re-export schema generators for backward compatibility with existing page components
export {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateArticleSchema,
  generateFAQSchema,
} from '@/lib/seo';

interface SEOProps {
  // Legacy props — accepted but ignored in Next.js (handled by generateMetadata)
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  // Active prop — injects JSON-LD structured data
  structuredData?: object;
}

export const SEO = ({ structuredData }: SEOProps) => {
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
