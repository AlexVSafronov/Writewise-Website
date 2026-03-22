import {
  StrapiResponse,
  BlogPost,
  Feature,
  Testimonial,
  Resource,
  PricingPlan,
  Page,
  FAQ
} from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://writewise-cms-m2xkjyh6ta-oe.a.run.app';
const API_URL = `${STRAPI_URL}/api`;

// Options accepted by Next.js extended fetch — revalidate controls ISR cache TTL
type FetchOptions = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };

class StrapiClient {
  private async fetch<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Blog Posts
  async getBlogPosts(featured?: boolean, revalidate = 3600): Promise<StrapiResponse<BlogPost[]>> {
    const filters = featured ? '?filters[featured][$eq]=true&populate=*' : '?populate=*';
    return this.fetch<StrapiResponse<BlogPost[]>>(`/blog-posts${filters}`, { next: { revalidate } });
  }

  async getBlogPost(slug: string, revalidate = 3600): Promise<StrapiResponse<BlogPost[]>> {
    return this.fetch<StrapiResponse<BlogPost[]>>(
      `/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate } },
    );
  }

  // Features
  async getFeatures(revalidate = 3600): Promise<StrapiResponse<Feature[]>> {
    return this.fetch<StrapiResponse<Feature[]>>('/features?sort=order:asc', { next: { revalidate } });
  }

  // Testimonials
  async getTestimonials(featured?: boolean, revalidate = 3600): Promise<StrapiResponse<Testimonial[]>> {
    const filters = featured ? '?filters[featured][$eq]=true&populate=*' : '?populate=*';
    return this.fetch<StrapiResponse<Testimonial[]>>(`/testimonials${filters}`, { next: { revalidate } });
  }

  // Resources
  async getResources(featured?: boolean, revalidate = 3600): Promise<StrapiResponse<Resource[]>> {
    const filters = featured ? '?filters[featured][$eq]=true&populate=*' : '?populate=*';
    return this.fetch<StrapiResponse<Resource[]>>(`/resources${filters}`, { next: { revalidate } });
  }

  async getResource(slug: string, revalidate = 3600): Promise<StrapiResponse<Resource[]>> {
    return this.fetch<StrapiResponse<Resource[]>>(
      `/resources?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate } },
    );
  }

  // Pricing Plans
  async getPricingPlans(revalidate = 900): Promise<StrapiResponse<PricingPlan[]>> {
    return this.fetch<StrapiResponse<PricingPlan[]>>('/pricing-plans?sort=order:asc', { next: { revalidate } });
  }

  // Pricing Plans from Stripe
  async getStripePricing(revalidate = 900): Promise<StrapiResponse<PricingPlan[]>> {
    return this.fetch<StrapiResponse<PricingPlan[]>>('/pricing-plans/stripe', { next: { revalidate } });
  }

  // Pages (privacy, terms — rarely changes)
  async getPage(slug: string, revalidate = 86400): Promise<StrapiResponse<Page[]>> {
    return this.fetch<StrapiResponse<Page[]>>(`/pages?filters[slug][$eq]=${slug}`, { next: { revalidate } });
  }

  // FAQs — filter by category (used by Pricing page)
  async getFAQs(category?: string, revalidate = 3600): Promise<StrapiResponse<FAQ[]>> {
    const filters = category ? `?filters[category][$eq]=${category}&sort=order:asc` : '?sort=order:asc';
    return this.fetch<StrapiResponse<FAQ[]>>(`/faqs${filters}`, { next: { revalidate } });
  }

  // FAQs — filter by page location
  async getFAQsByPage(page: string, revalidate = 3600): Promise<StrapiResponse<FAQ[]>> {
    return this.fetch<StrapiResponse<FAQ[]>>(
      `/faqs?filters[page][$eq]=${encodeURIComponent(page)}&sort=order:asc`,
      { next: { revalidate } },
    );
  }
}

export const strapiClient = new StrapiClient();
