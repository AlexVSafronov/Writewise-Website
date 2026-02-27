export default {
  routes: [
    {
      method: 'POST',
      path: '/placement-test/register',
      handler: 'placement-test.register',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/placement-test/generate',
      handler: 'placement-test.generate',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/placement-test/evaluate',
      handler: 'placement-test.evaluate',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
