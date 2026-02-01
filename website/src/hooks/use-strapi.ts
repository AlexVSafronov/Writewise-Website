import { useQuery } from '@tanstack/react-query';
import { strapiClient } from '@/lib/strapi';

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
export function useFeatures() {
  return useQuery({
    queryKey: ['features'],
    queryFn: () => strapiClient.getFeatures(),
  });
}

// Testimonials
export function useTestimonials(featured?: boolean) {
  return useQuery({
    queryKey: ['testimonials', featured],
    queryFn: () => strapiClient.getTestimonials(featured),
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

// FAQs
export function useFAQs(category?: string) {
  return useQuery({
    queryKey: ['faqs', category],
    queryFn: () => strapiClient.getFAQs(category),
  });
}
