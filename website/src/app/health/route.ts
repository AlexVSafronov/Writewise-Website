/**
 * GET /health — Cloud Run health check endpoint.
 * Replaces the nginx `location /health { return 200 "healthy\n"; }` block.
 */
export function GET() {
  return new Response('healthy\n', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
