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

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://writewise-cms-m2xkjyh6ta-oe.a.run.app';
const API_URL = `${STRAPI_URL}/api`;

class StrapiClient {
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
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
  async getBlogPosts(featured?: boolean): Promise<StrapiResponse<BlogPost[]>> {
    const filters = featured ? '?filters[featured][$eq]=true&populate=*' : '?populate=*';
    return this.fetch<StrapiResponse<BlogPost[]>>(`/blog-posts${filters}`);
  }

  async getBlogPost(slug: string): Promise<StrapiResponse<BlogPost[]>> {
    return this.fetch<StrapiResponse<BlogPost[]>>(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`);
  }

  // Features
  async getFeatures(): Promise<StrapiResponse<Feature[]>> {
    return this.fetch<StrapiResponse<Feature[]>>('/features?sort=order:asc');
  }

  // Testimonials
  async getTestimonials(featured?: boolean): Promise<StrapiResponse<Testimonial[]>> {
    const filters = featured ? '?filters[featured][$eq]=true&populate=*' : '?populate=*';
    return this.fetch<StrapiResponse<Testimonial[]>>(`/testimonials${filters}`);
  }

  // Resources
  async getResources(featured?: boolean): Promise<StrapiResponse<Resource[]>> {
    const filters = featured ? '?filters[featured][$eq]=true' : '';
    return this.fetch<StrapiResponse<Resource[]>>(`/resources${filters}`);
  }

  // Pricing Plans
  async getPricingPlans(): Promise<StrapiResponse<PricingPlan[]>> {
    return this.fetch<StrapiResponse<PricingPlan[]>>('/pricing-plans?sort=order:asc');
  }

  // Pricing Plans from Stripe
  async getStripePricing(): Promise<StrapiResponse<PricingPlan[]>> {
    return this.fetch<StrapiResponse<PricingPlan[]>>('/pricing-plans/stripe');
  }

  // Pages
  async getPage(slug: string): Promise<StrapiResponse<Page[]>> {
    return this.fetch<StrapiResponse<Page[]>>(`/pages?filters[slug][$eq]=${slug}`);
  }

  // FAQs
  async getFAQs(category?: string): Promise<StrapiResponse<FAQ[]>> {
    const filters = category ? `?filters[category][$eq]=${category}&sort=order:asc` : '?sort=order:asc';
    return this.fetch<StrapiResponse<FAQ[]>>(`/faqs${filters}`);
  }
}

export const strapiClient = new StrapiClient();
