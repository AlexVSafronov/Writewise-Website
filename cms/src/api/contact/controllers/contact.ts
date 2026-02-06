export default {
  async sendMessage(ctx) {
    try {
      const { name, email, subject, message } = ctx.request.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return ctx.badRequest('Missing required fields');
      }

      // Send email via Mailjet
      await strapi.service('api::contact.contact').sendContactEmail({
        name,
        email,
        subject,
        message,
      });

      return ctx.send({
        success: true,
        message: 'Message sent successfully',
      });
    } catch (error) {
      console.error('Error sending contact message:', error);
      return ctx.internalServerError('Failed to send message');
    }
  },
};
