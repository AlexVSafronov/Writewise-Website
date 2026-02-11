/**
 * Rate limiting middleware to protect admin routes from brute force attacks
 *
 * Configuration:
 * - Admin routes: Max 10 requests per minute per IP
 * - General API: Max 100 requests per minute per IP
 */

import rateLimit from 'koa-ratelimit';

// In-memory store for rate limiting
// For production with multiple instances, consider using Redis
const db = new Map();

export default (config, { strapi }) => {
  return async (ctx, next) => {
    // Apply strict rate limiting to admin routes
    if (ctx.url.startsWith('/admin') || ctx.url.startsWith('/api/admin')) {
      const adminRateLimit = rateLimit({
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
        max: 10, // Max 10 requests per minute
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

      return adminRateLimit(ctx, next);
    }

    // Apply more lenient rate limiting to API routes
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
        max: 100, // Max 100 requests per minute for API
        disableHeader: false,
      });

      return apiRateLimit(ctx, next);
    }

    // No rate limiting for other routes
    await next();
  };
};
