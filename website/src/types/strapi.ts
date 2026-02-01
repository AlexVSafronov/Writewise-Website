export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi v5 returns data with id and documentId at the root level
export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogPost extends StrapiEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole?: string;
  publishedDate: string;
  readTime: string;
  category: 'Tips' | 'AI' | 'Success Stories' | 'Research';
  featuredImage?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  seoDescription?: string;
  featured?: boolean;
}

export interface Feature extends StrapiEntity {
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Testimonial extends StrapiEntity {
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  rating: number;
  featured?: boolean;
}

export interface Resource extends StrapiEntity {
  title: string;
  slug: string;
  description: string;
  category: 'Guides' | 'Tools' | 'Articles' | 'Videos';
  link: string;
  icon?: string;
  featured?: boolean;
  fullDescription?: string;
  thumbnail?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  duration?: string;
  videoUrl?: string;
  views?: string;
  likes?: string;
  chapters?: { time: string; title: string }[];
  pages?: number;
  format?: string;
  readTime?: string;
  lastUpdated?: string;
  tableOfContents?: { title: string; page: number }[];
}

export interface PricingPlan extends StrapiEntity {
  name: string;
  code: string;
  price: number;
  priceYearly?: number;
  currency: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  stripePriceId?: string;
  order: number;
  metadata?: {
    code?: string;
    cta?: string;
    ctaLink?: string;
    highlighted?: string;
    order?: string;
    [key: string]: any;
  };
}

export interface Page extends StrapiEntity {
  title: string;
  slug: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface FAQ extends StrapiEntity {
  question: string;
  answer: string;
  category: 'General' | 'Pricing' | 'Technical' | 'Account';
  order: number;
}
