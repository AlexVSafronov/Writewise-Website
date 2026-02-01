import Stripe from 'stripe';

/**
 * Stripe service for fetching products and prices
 */
class StripeService {
  private stripe: Stripe;

  constructor() {
    const apiKey = process.env.STRIPE_SECRET_KEY;

    if (!apiKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }

    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  /**
   * Fetch all active products with their prices
   */
  async getProducts() {
    try {
      // Fetch all active products
      const products = await this.stripe.products.list({
        active: true,
        expand: ['data.default_price'],
      });

      // Fetch all active prices
      const prices = await this.stripe.prices.list({
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
   * Extract features from product metadata or description
   */
  private extractFeatures(product: Stripe.Product): string[] {
    // Try to get features from metadata first
    if (product.metadata?.features) {
      try {
        return JSON.parse(product.metadata.features);
      } catch (e) {
        // If JSON parse fails, split by comma
        return product.metadata.features.split(',').map((f) => f.trim());
      }
    }

    // Fallback to empty array
    return [];
  }

  /**
   * Get a specific product by ID
   */
  async getProduct(productId: string) {
    try {
      const product = await this.stripe.products.retrieve(productId, {
        expand: ['default_price'],
      });

      const prices = await this.stripe.prices.list({
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

// Export singleton instance
export const stripeService = new StripeService();
