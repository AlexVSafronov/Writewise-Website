export default [
  'strapi::logger',
  'strapi::errors',
  // Rate limiting to protect against brute force attacks
  {
    name: 'global::rate-limit',
    config: {},
  },
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:8081',
        'http://localhost:5173',
        'https://write-wise.com',
        'https://www.write-wise.com',
        'https://writewise-website-m2xkjyh6ta-oe.a.run.app',
        'https://writewise-website-918249600328.europe-west10.run.app',
        'https://*.vercel.app'
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
