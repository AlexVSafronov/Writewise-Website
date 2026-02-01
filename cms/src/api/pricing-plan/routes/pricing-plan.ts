import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::pricing-plan.pricing-plan');

const customRoutes = [
  {
    method: 'GET',
    path: '/pricing-plans/stripe',
    handler: 'pricing-plan.stripe',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

export default {
  routes: [
    ...customRoutes,
    ...defaultRouter.routes,
  ],
};
