import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::pricing-plan.pricing-plan', ({ strapi }) => ({
  /**
   * Fetch pricing plans from Stripe
   */
  async fetchFromStripe() {
    try {
      // Import Stripe service lazily to avoid initialization at startup
      const { getStripeService } = await import('../../../services/stripe');
      const stripeService = getStripeService();
      const products = await stripeService.getProducts();
      return products;
    } catch (error) {
      strapi.log.error('Failed to fetch pricing from Stripe:', error);
      throw error;
    }
  },
}));
