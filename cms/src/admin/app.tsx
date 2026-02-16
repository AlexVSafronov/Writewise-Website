import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    // Patch all images to load with crossOrigin="anonymous" so the canvas-based
    // image editor can export cropped images without a SecurityError (tainted canvas).
    const originalCreateElement = document.createElement.bind(document);
    (document as any).createElement = function (tag: string, ...args: any[]) {
      const el = originalCreateElement(tag, ...args);
      if (tag.toLowerCase() === 'img') {
        el.setAttribute('crossorigin', 'anonymous');
      }
      return el;
    };
  },
};
