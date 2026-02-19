export default {
  async subscribe(ctx) {
    try {
      const { email } = ctx.request.body;

      if (!email) {
        return ctx.badRequest('Email is required');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ctx.badRequest('Invalid email address');
      }

      await strapi.service('api::newsletter.newsletter').addSubscriber(email);

      return ctx.send({
        success: true,
        message: 'Successfully subscribed to the newsletter',
      });
    } catch (error) {
      if (error.message === 'ALREADY_SUBSCRIBED') {
        return ctx.send({
          success: true,
          message: 'You are already subscribed',
        });
      }
      console.error('Newsletter subscription error:', error);
      return ctx.internalServerError('Failed to subscribe');
    }
  },
};
