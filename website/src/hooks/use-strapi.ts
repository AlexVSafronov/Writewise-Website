import { useQuery } from '@tanstack/react-query';
import { strapiClient } from '@/lib/strapi';
import type { StrapiResponse, Feature, Testimonial } from '@/types/strapi';

// Blog Posts
export function useBlogPosts(featured?: boolean) {
  return useQuery({
    queryKey: ['blog-posts', featured],
    queryFn: () => strapiClient.getBlogPosts(featured),
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => strapiClient.getBlogPost(slug),
    enabled: !!slug,
  });
}

// Features
export function useFeatures(opts?: { initialData?: StrapiResponse<Feature[]> }) {
  return useQuery({
    queryKey: ['features'],
    queryFn: () => strapiClient.getFeatures(),
    initialData: opts?.initialData,
    // Treat server-prefetched data as fresh so the client doesn't immediately refetch.
    initialDataUpdatedAt: opts?.initialData ? Date.now() : undefined,
  });
}

// Testimonials
export function useTestimonials(featured?: boolean, opts?: { initialData?: StrapiResponse<Testimonial[]> }) {
  return useQuery({
    queryKey: ['testimonials', featured],
    queryFn: () => strapiClient.getTestimonials(featured),
    initialData: opts?.initialData,
    initialDataUpdatedAt: opts?.initialData ? Date.now() : undefined,
  });
}

// Resources
export function useResources(featured?: boolean) {
  return useQuery({
    queryKey: ['resources', featured],
    queryFn: () => strapiClient.getResources(featured),
  });
}

export function useResource(slug: string) {
  return useQuery({
    queryKey: ['resource', slug],
    queryFn: () => strapiClient.getResource(slug),
    enabled: !!slug,
  });
}

// Pricing Plans
export function usePricingPlans() {
  return useQuery({
    queryKey: ['pricing-plans'],
    queryFn: () => strapiClient.getPricingPlans(),
  });
}

// Pricing Plans from Stripe
export function useStripePricing() {
  return useQuery({
    queryKey: ['stripe-pricing'],
    queryFn: () => strapiClient.getStripePricing(),
  });
}

// Pages
export function usePage(slug: string) {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: () => strapiClient.getPage(slug),
    enabled: !!slug,
  });
}

// FAQs — by category (Pricing page)
export function useFAQs(category?: string) {
  return useQuery({
    queryKey: ['faqs', category],
    queryFn: () => strapiClient.getFAQs(category),
  });
}

// FAQs — by page location (placement test landing pages, home, etc.)
export function useFAQsByPage(page: string) {
  return useQuery({
    queryKey: ['faqs-by-page', page],
    queryFn: () => strapiClient.getFAQsByPage(page),
  });
}
