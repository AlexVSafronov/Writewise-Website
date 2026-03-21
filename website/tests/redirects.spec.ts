/**
 * T3 — Redirects & URL Behaviour
 *
 * Verifies all redirect rules that were previously in nginx.conf
 * are still honoured after the migration (moved to next.config.ts).
 *
 * Uses fetch() with redirect:'manual' so Playwright doesn't follow the
 * redirect — we inspect the Location header directly.
 */
import { test, expect } from '@playwright/test';
import { REDIRECT_RULES } from './helpers/routes';

test.use({ browserName: 'chromium' });

for (const { from, to, status } of REDIRECT_RULES) {
  test(`T3 — GET ${from} redirects → ${to} (${status})`, async ({ request }) => {
    // fetch with maxRedirects:0 so we see the raw redirect response
    const response = await request.get(from, { maxRedirects: 0 });

    // Accept both 301 and 308 as permanent redirects (Next.js may use either)
    expect(
      [301, 308],
      `${from} should return a permanent redirect, got ${response.status()}`,
    ).toContain(response.status());

    const location = response.headers()['location'] ?? '';
    expect(location, `${from} Location header should contain "${to}"`).toContain(to);
  });
}

test('T3 — trailing slash on /pricing redirects to /pricing', async ({ request }) => {
  const response = await request.get('/pricing/', { maxRedirects: 0 });
  expect([301, 308]).toContain(response.status());
  expect(response.headers()['location']).toContain('/pricing');
  expect(response.headers()['location']).not.toMatch(/\/pricing\/$/);
});

test('T3 — trailing slash on /blog redirects to /blog', async ({ request }) => {
  const response = await request.get('/blog/', { maxRedirects: 0 });
  expect([301, 308]).toContain(response.status());
  expect(response.headers()['location']).toContain('/blog');
  expect(response.headers()['location']).not.toMatch(/\/blog\/$/);
});
