import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import type { ViteReactSSGOptions } from 'vite-react-ssg';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === 'development' && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ── vite-ssg options ────────────────────────────────────────────────────────
  // Used only by `vite-ssg build` (npm run build:ssg).
  // The dev server (vite / npm run dev) ignores this block entirely.
  ssgOptions: {
    // Inject the hydration script as `defer` so it doesn't block first paint.
    script: 'defer',
    formatting: 'minify',

    // Point vite-ssg at the SSG entry that exports `createApp`.
    entry: 'src/main.ssg.tsx',

    // ── Which routes to pre-render ──────────────────────────────────────────
    // vite-ssg calls this once in Node.js before the build.
    // `paths` contains the statically-known paths inferred from the routes
    // array (everything without a `:param` segment).
    // We extend it with dynamic slugs fetched from Strapi.
    includedRoutes: async (paths: string[]) => {
      const STRAPI =
        process.env.VITE_STRAPI_URL ||
        'https://writewise-cms-m2xkjyh6ta-oe.a.run.app';

      const fetchSlugs = async (endpoint: string): Promise<string[]> => {
        try {
          const r = await fetch(`${STRAPI}/api/${endpoint}`, {
            signal: AbortSignal.timeout(15_000),
          });
          if (!r.ok) return [];
          const json = await r.json();
          return (json.data as Array<{ slug?: string }> || [])
            .map((item) => item.slug ?? '')
            .filter(Boolean);
        } catch {
          return [];
        }
      };

      const [blogSlugs, videoSlugs] = await Promise.all([
        fetchSlugs('blog-posts?fields=slug&pagination[pageSize]=100'),
        fetchSlugs(
          'resources?filters[category][$eq]=Videos&fields=slug&pagination[pageSize]=100',
        ),
      ]);

      return [
        // Static routes inferred from routes.tsx (strip unfilled :param paths
        // and the /app sub-tree — those are client-only, never pre-rendered).
        ...paths.filter((p) => !p.includes(':') && !p.startsWith('/app')),
        // Dynamic routes from Strapi
        ...blogSlugs.map((s) => `/blog/${s}`),
        ...videoSlugs.map((s) => `/resources/videos/${s}`),
      ];
    },

    // ── Pre-fetch Strapi data per route ─────────────────────────────────────
    // Runs in Node.js for every route immediately before vite-ssg renders it.
    // We pre-fetch the same data that the page's React Query hooks would
    // otherwise fetch in the browser, dehydrate it, and store it in
    // `appCtx.initialState`.  vite-ssg serialises `initialState` into
    // window.__VITE_SSG_CONTEXT__ in the HTML; main.ssg.tsx's setup callback
    // reads it back and calls hydrate() so the first render sees real data
    // with no loading states.
    onBeforePageRender: async (
      route: string,
      _indexHTML: string,
      appCtx: { initialState: Record<string, unknown> },
    ) => {
      // Dynamic imports keep vite.config.ts free of top-level side effects.
      const { QueryClient, dehydrate } = await import('@tanstack/react-query');

      const STRAPI =
        process.env.VITE_STRAPI_URL ||
        'https://writewise-cms-m2xkjyh6ta-oe.a.run.app';

      const get = async (endpoint: string) => {
        try {
          const r = await fetch(`${STRAPI}/api/${endpoint}`, {
            signal: AbortSignal.timeout(15_000),
          });
          return r.ok ? r.json() : null;
        } catch {
          return null;
        }
      };

      const qc = new QueryClient();
      const prefetch = (key: unknown[], endpoint: string) =>
        qc.prefetchQuery({ queryKey: key, queryFn: () => get(endpoint) });

      // Mirror the query keys declared in src/hooks/use-strapi.ts exactly.
      if (route === '/') {
        await Promise.all([
          prefetch(['features'], 'features?sort=order:asc'),
          prefetch(
            ['testimonials', true],
            'testimonials?filters[featured][$eq]=true&populate=*',
          ),
        ]);
      } else if (route === '/blog') {
        await prefetch(
          ['blog-posts', undefined],
          'blog-posts?populate=*&pagination[pageSize]=100',
        );
      } else if (route.startsWith('/blog/')) {
        const slug = route.slice('/blog/'.length);
        await prefetch(
          ['blog-post', slug],
          `blog-posts?filters[slug][$eq]=${slug}&populate=*`,
        );
      } else if (route === '/pricing') {
        await Promise.all([
          prefetch(['pricing-plans'], 'pricing-plans?sort=order:asc'),
          prefetch(['stripe-pricing'], 'pricing-plans/stripe'),
          prefetch(
            ['faqs', 'Pricing'],
            'faqs?filters[category][$eq]=Pricing&sort=order:asc',
          ),
        ]);
      } else if (route === '/resources') {
        await Promise.all([
          prefetch(['resources', undefined], 'resources?populate=*&pagination[pageSize]=100'),
          prefetch(['faqs', undefined], 'faqs?sort=order:asc'),
        ]);
      } else if (route.startsWith('/resources/videos/')) {
        const slug = route.slice('/resources/videos/'.length);
        await prefetch(
          ['resource', slug],
          `resources?filters[slug][$eq]=${slug}&populate=*`,
        );
      } else if (route === '/privacy') {
        await prefetch(['page', 'privacy'], 'pages?filters[slug][$eq]=privacy');
      } else if (route === '/terms') {
        await prefetch(['page', 'terms'], 'pages?filters[slug][$eq]=terms');
      }
      // /about, /contact, /for-freelancers, /placement-test* have no Strapi queries

      appCtx.initialState.reactQueryState = dehydrate(qc);
      qc.clear();
    },
  } satisfies ViteReactSSGOptions,
}));
