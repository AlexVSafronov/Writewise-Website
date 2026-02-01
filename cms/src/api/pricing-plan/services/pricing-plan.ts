import { factories } from '@strapi/strapi';
import { stripeService } from '../../../services/stripe';

export default factories.createCoreService('api::pricing-plan.pricing-plan', ({ strapi }) => ({
  /**
   * Fetch pricing plans from Stripe
   */
  async fetchFromStripe() {
    try {
      const products = await stripeService.getProducts();
      return products;
    } catch (error) {
      strapi.log.error('Failed to fetch pricing from Stripe:', error);
      throw error;
    }
  },
}));
