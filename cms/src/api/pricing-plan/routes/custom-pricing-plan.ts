export default {
  routes: [
    {
      method: 'GET',
      path: '/pricing-plans/stripe',
      handler: 'pricing-plan.stripe',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
