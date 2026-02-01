import Stripe from 'stripe';

/**
 * Stripe service for fetching products and prices
 */
class StripeService {
  private stripe: Stripe | null = null;

  constructor() {
    const apiKey = process.env.STRIPE_SECRET_KEY;

    if (!apiKey) {
      console.warn('⚠️  STRIPE_SECRET_KEY environment variable is not set. Stripe integration will not work.');
      return;
    }

    try {
      this.stripe = new Stripe(apiKey, {
        apiVersion: '2025-02-24.acacia',
      });
      console.log('✅ Stripe service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Stripe:', error);
    }
  }

  private ensureStripe(): Stripe {
    if (!this.stripe) {
      throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
    }
    return this.stripe;
  }

  /**
   * Fetch all active products with their prices
   */
  async getProducts() {
    const stripe = this.ensureStripe();

    try {
      // Fetch all active products with features expanded
      const products = await stripe.products.list({
        active: true,
        expand: ['data.default_price', 'data.features'],
      });

      // Fetch all active prices
      const prices = await stripe.prices.list({
        active: true,
        expand: ['data.product'],
      });

      // Group prices by product
      const pricesMap = new Map<string, Stripe.Price[]>();
      prices.data.forEach((price) => {
        const productId = typeof price.product === 'string'
          ? price.product
          : price.product.id;

        if (!pricesMap.has(productId)) {
          pricesMap.set(productId, []);
        }
        pricesMap.get(productId)!.push(price);
      });

      // Transform to format matching the pricing-plan content type
      const transformedProducts = products.data.map((product, index) => {
        const productPrices = pricesMap.get(product.id) || [];

        // Find monthly and yearly prices
        const monthlyPrice = productPrices.find(
          (p) => p.recurring?.interval === 'month'
        );
        const yearlyPrice = productPrices.find(
          (p) => p.recurring?.interval === 'year'
        );

        // Determine plan code from metadata or product name
        const code = product.metadata?.code || product.name.toLowerCase();

        return {
          id: product.id,
          name: product.name,
          code: code,
          description: product.description || '',
          price: monthlyPrice ? (monthlyPrice.unit_amount || 0) / 100 : 0,
          priceYearly: yearlyPrice ? (yearlyPrice.unit_amount || 0) / 100 : null,
          stripePriceId: monthlyPrice?.id || null,
          stripePriceIdYearly: yearlyPrice?.id || null,
          currency: (monthlyPrice?.currency || yearlyPrice?.currency || 'usd').toUpperCase(),
          features: this.extractFeatures(product),
          highlighted: product.metadata?.highlighted === 'true',
          order: product.metadata?.order ? parseInt(product.metadata.order) : index + 1,
          metadata: product.metadata,
          active: product.active,
        };
      });

      return transformedProducts;
    } catch (error) {
      console.error('Error fetching products from Stripe:', error);
      throw new Error(`Failed to fetch products from Stripe: ${error.message}`);
    }
  }

  /**
   * Extract features from native Stripe features or metadata fallback
   */
  private extractFeatures(product: Stripe.Product): string[] {
    // First, try to use native Stripe Product Features
    // Note: features property exists but may not be in all type definitions
    const productWithFeatures = product as any;

    if (productWithFeatures.features && Array.isArray(productWithFeatures.features)) {
      const featureNames = productWithFeatures.features
        .map((feature: any) => {
          // Handle both expanded and non-expanded feature objects
          if (typeof feature === 'object' && feature.name) {
            return feature.name;
          }
          return null;
        })
        .filter((name: any): name is string => name !== null);

      if (featureNames.length > 0) {
        return featureNames;
      }
    }

    // Fallback to metadata for backwards compatibility
    if (product.metadata?.features) {
      try {
        return JSON.parse(product.metadata.features);
      } catch (e) {
        // If JSON parse fails, split by comma
        return product.metadata.features.split(',').map((f) => f.trim());
      }
    }

    // Last resort: empty array
    return [];
  }

  /**
   * Get a specific product by ID
   */
  async getProduct(productId: string) {
    const stripe = this.ensureStripe();

    try {
      const product = await stripe.products.retrieve(productId, {
        expand: ['default_price', 'features'],
      });

      const prices = await stripe.prices.list({
        product: productId,
        active: true,
      });

      const monthlyPrice = prices.data.find(
        (p) => p.recurring?.interval === 'month'
      );
      const yearlyPrice = prices.data.find(
        (p) => p.recurring?.interval === 'year'
      );

      const code = product.metadata?.code || product.name.toLowerCase();

      return {
        id: product.id,
        name: product.name,
        code: code,
        description: product.description || '',
        price: monthlyPrice ? (monthlyPrice.unit_amount || 0) / 100 : 0,
        priceYearly: yearlyPrice ? (yearlyPrice.unit_amount || 0) / 100 : null,
        stripePriceId: monthlyPrice?.id || null,
        stripePriceIdYearly: yearlyPrice?.id || null,
        currency: (monthlyPrice?.currency || yearlyPrice?.currency || 'usd').toUpperCase(),
        features: this.extractFeatures(product),
        highlighted: product.metadata?.highlighted === 'true',
        order: product.metadata?.order ? parseInt(product.metadata.order) : 1,
        metadata: product.metadata,
        active: product.active,
      };
    } catch (error) {
      console.error(`Error fetching product ${productId} from Stripe:`, error);
      throw new Error(`Failed to fetch product from Stripe: ${error.message}`);
    }
  }
}

// Lazy singleton instance
let stripeServiceInstance: StripeService | null = null;

export function getStripeService(): StripeService {
  if (!stripeServiceInstance) {
    stripeServiceInstance = new StripeService();
  }
  return stripeServiceInstance;
}

// Legacy export for backwards compatibility
export const stripeService = {
  getProducts: () => getStripeService().getProducts(),
  getProduct: (productId: string) => getStripeService().getProduct(productId),
};
