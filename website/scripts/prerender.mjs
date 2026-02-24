/**
 * Pre-render script for WriteWise website.
 *
 * Runs after `vite build`. Serves the dist/ folder locally, uses Puppeteer
 * to render each marketing route to static HTML, and writes the result back
 * into dist/ so nginx can serve real HTML to crawlers.
 *
 * Dynamic routes (/blog/:slug, /resources/videos/:slug) are resolved by
 * fetching slugs from the Strapi CMS API at build time. If Strapi is
 * unreachable the static routes are still pre-rendered and the build succeeds.
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
  '/resources',
  '/privacy',
  '/terms',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Fetch all slugs for a Strapi collection.
 * Returns an empty array (with a warning) if the API is unreachable.
 */
async function fetchSlugs(apiPath) {
  try {
    const url = `${STRAPI_URL}/api/${apiPath}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const slugs = (json.data || []).map((item) => item.slug).filter(Boolean);
    return slugs;
  } catch (err) {
    console.warn(`  ⚠️  Could not fetch ${apiPath}: ${err.message}. Skipping dynamic routes.`);
    return [];
  }
}

/**
 * Start a minimal static file server for the dist/ folder.
 * Returns { port, close }.
 */
function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      // Strip query string and decode
      let urlPath = req.url.split('?')[0];
      try { urlPath = decodeURIComponent(urlPath); } catch (_) {}

      // Candidate file paths
      const candidates = [
        path.join(DIST_DIR, urlPath),
        path.join(DIST_DIR, urlPath, 'index.html'),
        path.join(DIST_DIR, 'index.html'), // SPA fallback
      ];

      for (const filePath of candidates) {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath);
          const mime = {
            '.html': 'text/html',
            '.js':   'application/javascript',
            '.css':  'text/css',
            '.svg':  'image/svg+xml',
            '.png':  'image/png',
            '.ico':  'image/x-icon',
            '.woff2':'font/woff2',
            '.woff': 'font/woff',
            '.json': 'application/json',
          }[ext] || 'application/octet-stream';

          res.writeHead(200, { 'Content-Type': mime });
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }

      // Should not happen but just in case
      res.writeHead(404);
      res.end('Not found');
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ port, close: () => server.close() });
    });
    server.on('error', reject);
  });
}

/**
 * Write HTML content to dist/<route>/index.html (or dist/index.html for /).
 */
function writeHtml(route, html) {
  const filePath =
    route === '/'
      ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, route, 'index.html');

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, 'utf8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🔍 Pre-rendering WriteWise marketing pages...\n');

  // 1. Resolve all routes
  console.log('📡 Fetching dynamic slugs from Strapi...');
  const [blogSlugs, videoSlugs] = await Promise.all([
    fetchSlugs('blog-posts?fields=slug&pagination[pageSize]=100'),
    fetchSlugs('resources?filters[category][$eq]=Videos&fields=slug&pagination[pageSize]=100'),
  ]);

  const blogRoutes = blogSlugs.map((s) => `/blog/${s}`);
  const videoRoutes = videoSlugs.map((s) => `/resources/videos/${s}`);

  const allRoutes = [...STATIC_ROUTES, ...blogRoutes, ...videoRoutes];
  console.log(`  Found ${blogSlugs.length} blog post(s), ${videoSlugs.length} video resource(s).`);
  console.log(`  Total routes to pre-render: ${allRoutes.length}\n`);

  // 2. Start local file server
  const { port, close: closeServer } = await startServer();
  const BASE_URL = `http://127.0.0.1:${port}`;

  // 3. Launch Puppeteer
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    headless: true,
  });

  let succeeded = 0;
  let failed = 0;

  try {
    for (const route of allRoutes) {
      const url = `${BASE_URL}${route}`;
      const page = await browser.newPage();

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 20_000 });

        // Give React Query an extra moment to settle CMS fetches
        await new Promise((r) => setTimeout(r, 500));

        const html = await page.evaluate(
          () => '<!DOCTYPE html>\n' + document.documentElement.outerHTML,
        );

        writeHtml(route, html);
        console.log(`  ✅ ${route}`);
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

  if (failed > 0 && succeeded === 0) {
    // Only hard-fail if nothing at all was pre-rendered
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Pre-render script error:', err);
  process.exit(1);
});
