import type { Core } from '@strapi/strapi';
import { URL } from 'url';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // Image proxy endpoint: GET /api/image-proxy?url=<encoded-gcs-url>
    // Allows the Strapi admin image editor to load GCS images as same-origin,
    // preventing canvas tainting when cropping.
    strapi.server.router.get('/api/image-proxy', async (ctx) => {
      const rawUrl = ctx.query.url as string;
      if (!rawUrl) {
        ctx.status = 400;
        ctx.body = 'Missing url parameter';
        return;
      }

      let parsed: URL;
      try {
        parsed = new URL(rawUrl);
      } catch {
        ctx.status = 400;
        ctx.body = 'Invalid url parameter';
        return;
      }

      // Only proxy from GCS
      if (parsed.hostname !== 'storage.googleapis.com') {
        ctx.status = 403;
        ctx.body = 'Only GCS URLs are allowed';
        return;
      }

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const res = await fetch(rawUrl, { signal: controller.signal });
        clearTimeout(timeout);
        ctx.status = res.status;
        ctx.set('Content-Type', res.headers.get('content-type') || 'application/octet-stream');
        ctx.set('Cache-Control', 'public, max-age=3600');
        ctx.body = res.body;
      } catch {
        ctx.status = 502;
        ctx.body = 'Failed to fetch image';
      }
    });
  },

  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
