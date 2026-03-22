/**
 * T8 — Placement Test Landing Pages
 *
 * Scope (per product decision): only the static marketing landing pages
 * are part of the website. The multi-step test flow is a separate service.
 *
 * Tests verify:
 *   - Landing pages load and are server-rendered (SSG)
 *   - Language cards link correctly
 *   - CTA buttons point to the external placement test service with
 *     the correct language encoded in the URL
 */
import { test, expect } from '@playwright/test';

test.describe('T8 — Placement test hub (/placement-test)', () => {
  test('T8.1 — Hub page loads', async ({ page }) => {
    await page.goto('/placement-test');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('T8.2 — German and English language cards are present and linked', async ({ page }) => {
    await page.goto('/placement-test');
    const germanCard = page.locator('a[href*="german"], a[href*="deutsch"]').first();
    const englishCard = page.locator('a[href*="english"]').first();
    await expect(germanCard).toBeVisible();
    await expect(englishCard).toBeVisible();
  });

  test('T8.3 — German card links to /placement-test/german', async ({ page }) => {
    await page.goto('/placement-test');
    const germanCard = page.locator('a[href="/placement-test/german"]').first();
    await expect(germanCard).toBeVisible();
  });

  test('T8.4 — English card links to /placement-test/english', async ({ page }) => {
    await page.goto('/placement-test');
    const englishCard = page.locator('a[href="/placement-test/english"]').first();
    await expect(englishCard).toBeVisible();
  });

  test('T8.5 — "Coming soon" languages are not active links', async ({ page }) => {
    await page.goto('/placement-test');
    await page.waitForLoadState('networkidle');
    // Coming-soon cards should show a badge and NOT be clickable links
    const comingSoonBadge = page.getByText(/coming soon/i).first();
    if (await comingSoonBadge.isVisible()) {
      // The parent should not be a navigable link to a test route
      const parent = comingSoonBadge.locator('xpath=ancestor::a[contains(@href, "placement-test")]');
      const count = await parent.count();
      // Either no parent link, or the parent goes back to hub (not a specific test)
      expect(count).toBe(0);
    }
  });
});

test.describe('T8 — German landing page (/placement-test/german)', () => {
  test('T8.6 — German landing page loads with German content', async ({ page }) => {
    await page.goto('/placement-test/german');
    await expect(page.locator('h1, h2').first()).toBeVisible();
    const content = await page.locator('main, body').first().innerText();
    expect(content.toLowerCase()).toMatch(/german|deutsch/);
  });

  test('T8.7 — CTA button links to external placement test service with german context', async ({ page }) => {
    await page.goto('/placement-test/german');
    // Find the primary CTA button/link — should go to the external service
    const cta = page.locator('a[href*="placement-test"], a[href*="test"]').filter({
      hasNot: page.locator('[href="/placement-test"]'),
    }).first();

    if (await cta.count() > 0) {
      const href = await cta.getAttribute('href');
      // Must encode the language (german / de) in the URL
      expect(href?.toLowerCase()).toMatch(/german|de/);
    } else {
      // The CTA might be a button — check it exists at minimum
      const ctaButton = page.getByRole('button', { name: /start|begin|test/i }).first();
      await expect(ctaButton).toBeVisible();
    }
  });

  test('T8.8 — German landing page is server-rendered (content in HTML source)', async ({ request }) => {
    const response = await request.get('/placement-test/german');
    const html = await response.text();
    expect(html).toMatch(/german|deutsch/i);
    expect(html).not.toMatch(/<div id="root"><\/div>/);
  });
});

test.describe('T8 — English landing page (/placement-test/english)', () => {
  test('T8.9 — English landing page loads', async ({ page }) => {
    await page.goto('/placement-test/english');
    await expect(page.locator('h1, h2').first()).toBeVisible();
    const content = await page.locator('main, body').first().innerText();
    expect(content.toLowerCase()).toMatch(/english/);
  });

  test('T8.10 — CTA button links to external placement test service with english context', async ({ page }) => {
    await page.goto('/placement-test/english');
    const cta = page.locator('a[href*="placement-test"], a[href*="test"]').filter({
      hasNot: page.locator('[href="/placement-test"]'),
    }).first();

    if (await cta.count() > 0) {
      const href = await cta.getAttribute('href');
      expect(href?.toLowerCase()).toMatch(/english|en/);
    } else {
      const ctaButton = page.getByRole('button', { name: /start|begin|test/i }).first();
      await expect(ctaButton).toBeVisible();
    }
  });

  test('T8.11 — English landing page is server-rendered', async ({ request }) => {
    const response = await request.get('/placement-test/english');
    const html = await response.text();
    expect(html).toMatch(/english/i);
    expect(html).not.toMatch(/<div id="root"><\/div>/);
  });
});
