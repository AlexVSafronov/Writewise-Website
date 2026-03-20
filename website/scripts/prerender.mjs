/**
 * Pre-render script for WriteWise website.
 *
 * Strategy:
 *   1. Fetch ALL Strapi data upfront in Node.js (no CORS issues — server-to-server)
 *   2. Use Puppeteer only for DOM snapshots (no network dependency in browser)
 *   3. Build a TanStack Query dehydrated-state object in Node.js per route
 *   4. Inject it as <script>window.__REACT_QUERY_STATE__=…</script> into each page
 *
 * On page load, main.tsx reads window.__REACT_QUERY_STATE__ and calls hydrate()
 * before React mounts, so the first render sees a warm cache — zero Strapi fetches.
 */

import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const STRAPI_URL =
  process.env.VITE_STRAPI_URL || 'https://writewise-cms-m2xkjyh6ta-oe.a.run.app';

// ─── Static marketing routes (always pre-rendered) ────────────────────────────
const STATIC_ROUTES = [
  '/',
  '/about',
  '/pricing',
  '/blog',
  '/contact',
  '/for-freelancers',
  '/placement-test',
  '/resources',
  '/privacy',
  '/terms',
];

// ─── TanStack Query helpers ───────────────────────────────────────────────────

/**
 * Mirror of TanStack Query v5's hashKey() function.
 * Produces the same string that QueryClient uses internally so hydrate() matches.
 */
function hashQueryKey(queryKey) {
  return JSON.stringify(queryKey, (_, val) =>
    val !== null && typeof val === 'object' && !Array.isArray(val)
      ? Object.keys(val).sort().reduce((r, k) => { r[k] = val[k]; return r; }, {})
      : val,
  );
}

/**
 * Build a single dehydrated query entry from a query key + response data.
 */
function makeEntry(queryKey, data) {
  return {
    queryKey,
    queryHash: hashQueryKey(queryKey),
    state: {
      data,
      status: 'success',
      dataUpdatedAt: Date.now(),
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchMeta: null,
      isInvalidated: false,
      fetchStatus: 'idle',
    },
  };
}

// ─── Node.js Strapi fetcher ───────────────────────────────────────────────────

async function strapiGet(endpoint) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (err) {
    console.warn(`  ⚠️  strapi GET ${endpoint}: ${err.message}`);
    return null;
  }
}

// ─── Static file server ───────────────────────────────────────────────────────

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let urlPath = req.url.split('?')[0];
      try { urlPath = decodeURIComponent(urlPath); } catch (_) {}

      const candidates = [
        path.join(DIST_DIR, urlPath),
        path.join(DIST_DIR, urlPath, 'index.html'),
        path.join(DIST_DIR, 'index.html'),
      ];

      for (const filePath of candidates) {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const mime = {
            '.html': 'text/html', '.js': 'application/javascript',
            '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png',
            '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
            '.json': 'application/json',
          }[path.extname(filePath)] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': mime });
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }
      res.writeHead(404); res.end('Not found');
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({ port: server.address().port, close: () => server.close() });
    });
    server.on('error', reject);
  });
}

function writeHtml(route, html) {
  const filePath = route === '/'
    ? path.join(DIST_DIR, 'index.html')
    : path.join(DIST_DIR, route, 'index.html');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, 'utf8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🔍 Pre-rendering WriteWise marketing pages...\n');

  // ── Phase 1: fetch all Strapi data in Node.js ──────────────────────────────
  console.log('📡 Fetching all Strapi data in Node.js...');

  const [
    blogPosts,
    featuredTestimonials,
    features,
    resources,
    allFaqs,
    pricingFaqs,
    pricingPlans,
    stripePricing,
    privacyPage,
    termsPage,
    blogSlugData,
    videoSlugData,
  ] = await Promise.all([
    strapiGet('blog-posts?populate=*&pagination[pageSize]=100'),
    strapiGet('testimonials?filters[featured][$eq]=true&populate=*'),
    strapiGet('features?sort=order:asc'),
    strapiGet('resources?populate=*&pagination[pageSize]=100'),
    strapiGet('faqs?sort=order:asc'),
    strapiGet('faqs?filters[category][$eq]=Pricing&sort=order:asc'),
    strapiGet('pricing-plans?sort=order:asc'),
    strapiGet('pricing-plans/stripe'),
    strapiGet('pages?filters[slug][$eq]=privacy'),
    strapiGet('pages?filters[slug][$eq]=terms'),
    strapiGet('blog-posts?fields=slug&pagination[pageSize]=100'),
    strapiGet('resources?filters[category][$eq]=Videos&fields=slug&pagination[pageSize]=100'),
  ]);

  // Slugs for dynamic routes
  const blogSlugs = (blogSlugData?.data || []).map(i => i.slug).filter(Boolean);
  const videoSlugs = (videoSlugData?.data || []).map(i => i.slug).filter(Boolean);

  // Fetch individual blog post + video resource data
  const blogPostBySlug = {};
  const videoResourceBySlug = {};
  await Promise.all([
    ...blogSlugs.map(slug =>
      strapiGet(`blog-posts?filters[slug][$eq]=${slug}&populate=*`)
        .then(d => { if (d) blogPostBySlug[slug] = d; }),
    ),
    ...videoSlugs.map(slug =>
      strapiGet(`resources?filters[slug][$eq]=${slug}&populate=*`)
        .then(d => { if (d) videoResourceBySlug[slug] = d; }),
    ),
  ]);

  const blogRoutes = blogSlugs.map(s => `/blog/${s}`);
  const videoRoutes = videoSlugs.map(s => `/resources/videos/${s}`);
  const allRoutes = [...STATIC_ROUTES, ...blogRoutes, ...videoRoutes];

  const fetchedCount = [blogPosts, featuredTestimonials, features, resources,
    allFaqs, pricingFaqs, pricingPlans, stripePricing, privacyPage, termsPage]
    .filter(Boolean).length;
  console.log(`  Fetched ${fetchedCount}/10 collections, ${blogSlugs.length} blog post(s), ${videoSlugs.length} video(s).`);
  console.log(`  Total routes to pre-render: ${allRoutes.length}\n`);

  // ── Phase 2: build per-route dehydrated state ──────────────────────────────
  function buildState(route) {
    const entries = [];
    const add = (key, data) => { if (data) entries.push(makeEntry(key, data)); };

    if (route === '/') {
      add(['features'], features);
      add(['testimonials', true], featuredTestimonials);
    } else if (route === '/blog') {
      add(['blog-posts', undefined], blogPosts);
    } else if (route.startsWith('/blog/')) {
      const slug = route.slice('/blog/'.length);
      add(['blog-post', slug], blogPostBySlug[slug]);
    } else if (route === '/pricing') {
      add(['pricing-plans'], pricingPlans);
      add(['stripe-pricing'], stripePricing);
      add(['faqs', 'Pricing'], pricingFaqs);
    } else if (route === '/resources') {
      add(['resources', undefined], resources);
      add(['faqs', undefined], allFaqs);
    } else if (route === '/privacy') {
      add(['page', 'privacy'], privacyPage);
    } else if (route === '/terms') {
      add(['page', 'terms'], termsPage);
    } else if (route.startsWith('/resources/videos/')) {
      const slug = route.slice('/resources/videos/'.length);
      add(['resource', slug], videoResourceBySlug[slug]);
    }
    // /about, /contact, /for-freelancers have no Strapi queries

    return entries.length > 0 ? { queries: entries, mutations: [] } : null;
  }

  // ── Phase 3: Puppeteer renders HTML + we inject the state ──────────────────
  const { port, close: closeServer } = await startServer();
  const BASE_URL = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-zygote'],
    headless: true,
  });

  let succeeded = 0;
  let failed = 0;

  try {
    for (const route of allRoutes) {
      const page = await browser.newPage();
      try {
        const state = buildState(route);

        // Signal to main.tsx that we're in a prerender context.
        // main.tsx uses this to skip GrowthBookProvider (which blocks rendering
        // when features haven't been loaded) and any other SDK initialisation
        // that requires live network access.
        await page.evaluateOnNewDocument(() => {
          window.__PRERENDER__ = true;
        });

        // Inject the dehydrated state BEFORE the page loads so that main.tsx
        // hydrates TanStack Query before React's first render. This means the
        // first render already has actual data (no loading skeleton), so the
        // Puppeteer DOM snapshot contains real content that bots/crawlers can read.
        if (state) {
          try {
            await page.evaluateOnNewDocument((stateData) => {
              window.__REACT_QUERY_STATE__ = stateData;
            }, state);
          } catch (_) { /* non-serialisable — skip pre-injection */ }
        }

        // Log browser-side JS errors so failures are visible in build logs.
        page.on('pageerror', (err) => console.warn(`  ⚠️  [browser error] ${route}: ${err.message}`));
        page.on('console', (msg) => {
          if (msg.type() === 'error') console.warn(`  ⚠️  [console.error] ${route}: ${msg.text()}`);
        });

        // Navigate and wait for DOM to be parsed. We intentionally avoid
        // networkidle0/2 because analytics (GA4) and A/B testing (GrowthBook)
        // SDKs keep persistent connections alive and continuously retry them,
        // so networkidle never fires.
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 20_000 });

        // Wait for React to finish rendering. The Suspense fallback is a bare
        // <div class="min-h-screen"></div> (~35 chars). Once the route component
        // mounts and renders, #root will contain substantially more HTML.
        await page.waitForFunction(
          () => (document.querySelector('#root')?.innerHTML?.length ?? 0) > 200,
          { timeout: 15_000 },
        );

        let html = await page.evaluate(
          () => '<!DOCTYPE html>\n' + document.documentElement.outerHTML,
        );

        // Also persist the state as a script tag in the saved HTML so that
        // real browsers loading the pre-rendered file still get a warm cache
        // (the evaluateOnNewDocument injection only affects the Puppeteer session,
        // not the file written to disk).
        if (state) {
          try {
            html = html.replace(
              '</body>',
              `<script>window.__REACT_QUERY_STATE__=${JSON.stringify(state)};</script></body>`,
            );
          } catch (_) { /* non-serialisable data — skip */ }
        }

        writeHtml(route, html);
        console.log(`  ✅ ${route} (${state ? state.queries.length : 0} queries injected)`);
        succeeded++;
      } catch (err) {
        console.warn(`  ❌ ${route}: ${err.message}`);
        failed++;
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    closeServer();
  }

  console.log(`\n🎉 Pre-rendering complete: ${succeeded} succeeded, ${failed} failed.\n`);
  if (failed > 0 && succeeded === 0) process.exit(1);
}

main().catch(err => {
  console.error('Pre-render script error:', err);
  process.exit(1);
});
