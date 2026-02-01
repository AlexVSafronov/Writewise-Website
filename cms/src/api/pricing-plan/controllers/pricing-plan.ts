import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::pricing-plan.pricing-plan', ({ strapi }) => ({
  /**
   * Custom action to fetch pricing from Stripe
   * GET /api/pricing-plans/stripe
   */
  async stripe(ctx) {
    try {
      const pricingPlans = await strapi
        .service('api::pricing-plan.pricing-plan')
        .fetchFromStripe();

      ctx.body = {
        data: pricingPlans,
        meta: {
          source: 'stripe',
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      ctx.throw(500, `Failed to fetch pricing from Stripe: ${error.message}`);
    }
  },
}));
