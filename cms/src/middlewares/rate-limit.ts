/**
 * Rate limiting middleware to protect admin login from brute force attacks
 *
 * Configuration:
 * - Login endpoint: Max 5 attempts per minute per IP
 * - Other admin routes: Max 200 requests per minute (allows normal admin panel usage)
 * - Public API: Max 100 requests per minute per IP
 */

import rateLimit from 'koa-ratelimit';

// In-memory store for rate limiting
// For production with multiple instances, consider using Redis
const db = new Map();

export default (config, { strapi }) => {
  return async (ctx, next) => {
    // Strict rate limiting for login endpoint only
    if (ctx.url === '/admin/login' && ctx.method === 'POST') {
      const loginRateLimit = rateLimit({
        driver: 'memory',
        db: db,
        duration: 60000, // 1 minute
        errorMessage: 'Too many login attempts. Please try again in a minute.',
        id: (ctx) => ctx.ip, // Rate limit by IP address
        headers: {
          remaining: 'Rate-Limit-Remaining',
          reset: 'Rate-Limit-Reset',
          total: 'Rate-Limit-Total',
        },
        max: 5, // Max 5 login attempts per minute
        disableHeader: false,
        whitelist: (ctx) => {
          // Optional: whitelist certain IPs (e.g., your office IP)
          // return ctx.ip === '1.2.3.4';
          return false;
        },
        blacklist: (ctx) => {
          // Optional: blacklist known malicious IPs
          return false;
        },
      });

      return loginRateLimit(ctx, next);
    }

    // More lenient rate limiting for admin panel usage (loads many files/APIs)
    if (ctx.url.startsWith('/admin') || ctx.url.startsWith('/api/admin')) {
      const adminRateLimit = rateLimit({
        driver: 'memory',
        db: db,
        duration: 60000, // 1 minute
        errorMessage: 'Too many requests. Please wait a moment.',
        id: (ctx) => ctx.ip,
        headers: {
          remaining: 'Rate-Limit-Remaining',
          reset: 'Rate-Limit-Reset',
          total: 'Rate-Limit-Total',
        },
        max: 200, // Max 200 requests per minute (admin panel loads many resources)
        disableHeader: false,
      });

      return adminRateLimit(ctx, next);
    }

    // Rate limiting for public API routes
    if (ctx.url.startsWith('/api')) {
      const apiRateLimit = rateLimit({
        driver: 'memory',
        db: db,
        duration: 60000, // 1 minute
        errorMessage: 'Too many requests. Please slow down.',
        id: (ctx) => ctx.ip,
        headers: {
          remaining: 'Rate-Limit-Remaining',
          reset: 'Rate-Limit-Reset',
          total: 'Rate-Limit-Total',
        },
        max: 100, // Max 100 requests per minute for public API
        disableHeader: false,
      });

      return apiRateLimit(ctx, next);
    }

    // No rate limiting for other routes
    await next();
  };
};
