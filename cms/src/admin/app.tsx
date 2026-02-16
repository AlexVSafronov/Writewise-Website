import type { StrapiApp } from '@strapi/strapi/admin';

const GCS_HOST = 'storage.googleapis.com';
const PROXY_BASE = '/api/image-proxy?url=';

function toProxyUrl(src: string): string {
  try {
    const url = new URL(src);
    if (url.hostname === GCS_HOST) {
      return PROXY_BASE + encodeURIComponent(src);
    }
  } catch {
    // not an absolute URL, leave as-is
  }
  return src;
}

export default {
  config: {
    locales: [],
  },
  bootstrap(_app: StrapiApp) {
    // Rewrite GCS image URLs to go through the same-origin proxy so the
    // canvas-based image editor can crop without triggering a tainted canvas error.
    const originalCreateElement = document.createElement.bind(document);
    (document as any).createElement = function (tag: string, ...args: any[]) {
      const el = originalCreateElement(tag, ...args);
      if (tag.toLowerCase() === 'img') {
        const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
        Object.defineProperty(el, 'src', {
          get() {
            return descriptor!.get!.call(this);
          },
          set(value: string) {
            descriptor!.set!.call(this, toProxyUrl(value));
          },
          configurable: true,
        });
      }
      return el;
    };
  },
};
