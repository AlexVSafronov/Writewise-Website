# Pricing Page Fix - Environment Variables at Build Time

## Issue Identified
The pricing page was not displaying Stripe pricing information because environment variables were not being properly injected into the Vite build.

## Root Cause
**Vite requires environment variables at BUILD time, not RUNTIME.**

- Vite is a static site builder that bundles JavaScript at build time
- It replaces `import.meta.env.VITE_*` variables with their actual values during build
- Cloud Run environment variables are set at runtime, which is too late for static sites
- The built JavaScript bundle had `undefined` for `VITE_STRAPI_URL`

## The Fix

### 1. Updated Dockerfile
Added build arguments and environment variables:

```dockerfile
# Build arguments for environment variables
ARG VITE_STRAPI_URL
ARG VITE_APP_URL
ARG VITE_API_URL
ARG VITE_STRIPE_PUBLIC_KEY

# Set environment variables for build
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL
ENV VITE_APP_URL=$VITE_APP_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY

# Build with env vars baked in
RUN npm run build
```

### 2. Updated GitHub Actions Workflow
Pass build arguments during docker build:

```yaml
docker build \
  --build-arg VITE_STRAPI_URL=https://writewise-cms-m2xkjyh6ta-oe.a.run.app \
  --build-arg VITE_APP_URL=https://write-wise.com \
  --build-arg VITE_API_URL=https://app.write-wise.com \
  --build-arg VITE_STRIPE_PUBLIC_KEY=${{ secrets.STRIPE_PUBLISHABLE_KEY }} \
  -t [image] .
```

### 3. Removed Runtime Environment Variables
Runtime env vars are not needed for static nginx deployments. Removed the `--set-env-vars` flag from Cloud Run deployment.

## Verification

### Test the Pricing Page
Visit: https://writewise-website-918249600328.europe-west10.run.app/pricing

You should now see:

**Free Plan**
- Price: €0
- Features: 1 Writing Exercise per Week, Essay Topics, Evaluation & Feedback, etc.
- CTA: "Start Free"

**Basic Plan** (Most Popular)
- Price: €9.86/month
- Features: Everything in Free plus Unlimited Exercises, Tailored Learning Path, etc.
- CTA: "Choose Basic"
- Highlighted with "Most Popular" badge

**Premium Plan**
- Price: €17.28/month
- Features: Everything in Basic plus Handwriting support, Early access, etc.
- CTA: "Get Premium"

**Business Plan** (Static)
- Price: Custom
- Features: Customized learning programs, Scalable team access, etc.
- CTA: "Contact Sales"

### Verify Data Source
The pricing data comes from:
- **API Endpoint**: https://writewise-cms-m2xkjyh6ta-oe.a.run.app/api/pricing-plans/stripe
- **Source**: Live Stripe API
- **Stripe Products**: 3 products (Free, Basic, Premium) fetched dynamically

### Test API Directly
```bash
curl https://writewise-cms-m2xkjyh6ta-oe.a.run.app/api/pricing-plans/stripe
```

Should return JSON with pricing data from Stripe.

## How It Works Now

```
┌─────────────────────────────────┐
│   GitHub Actions Build          │
│                                 │
│  1. Checkout code               │
│  2. Docker build with           │
│     --build-arg flags           │
│  3. Vite replaces env vars      │
│     in JavaScript bundle        │
│  4. Build static files          │
│  5. Push to Artifact Registry   │
│  6. Deploy to Cloud Run         │
└─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│   Static Website (Nginx)        │
│                                 │
│  JavaScript bundle contains:    │
│  - VITE_STRAPI_URL baked in    │
│  - Calls CMS API on page load  │
│  - Fetches Stripe pricing      │
└─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│   Strapi CMS                    │
│                                 │
│  /api/pricing-plans/stripe      │
│  - Fetches from Stripe API     │
│  - Returns formatted data      │
└─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│   Stripe API                    │
│                                 │
│  - Products and Prices         │
│  - Live data                   │
└─────────────────────────────────┘
```

## Key Learnings

### Vite Environment Variables
- Must be prefixed with `VITE_`
- Must be set at BUILD time (not runtime)
- Get replaced with literal values during build
- Cannot be changed without rebuilding

### Docker Multi-Stage Builds
- Use `ARG` to accept build-time arguments
- Use `ENV` to set environment variables in build stage
- Build arguments must be passed via `--build-arg` flag

### Static vs Dynamic Deployments
- **Static sites (Vite/React)**: Env vars at build time
- **Dynamic apps (Node/Python)**: Env vars at runtime
- Nginx serves pre-built files, cannot inject runtime vars

## Future Improvements

### 1. Use .env Files for Local Development
Create `/website/.env.development`:
```bash
VITE_STRAPI_URL=http://localhost:1337
VITE_APP_URL=http://localhost:8081
VITE_API_URL=http://localhost:8080
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### 2. Consider Cloud Build Substitutions
For more complex deployments, use Cloud Build:
```yaml
substitutions:
  _VITE_STRAPI_URL: https://writewise-cms-m2xkjyh6ta-oe.a.run.app
```

### 3. Add Build-Time Validation
Validate all required env vars are set:
```dockerfile
RUN test -n "$VITE_STRAPI_URL" || (echo "VITE_STRAPI_URL not set" && exit 1)
```

## Deployment Timeline
- **Issue Reported**: 2026-02-11 06:47
- **Fix Committed**: 2026-02-11 06:47:52
- **Deployment Complete**: 2026-02-11 06:49:41
- **Status**: ✅ Fixed

## Related Files
- `website/Dockerfile` - Added build args
- `.github/workflows/deploy-website.yml` - Pass build args during build
- `website/src/lib/strapi.ts` - Uses `import.meta.env.VITE_STRAPI_URL`
- `website/src/pages/Pricing.tsx` - Fetches from `/pricing-plans/stripe`

## Verification Checklist
- [x] Dockerfile updated with ARG and ENV
- [x] GitHub Actions passes build args
- [x] Runtime env vars removed
- [x] Website deployed successfully
- [x] Health check passing
- [ ] **Pricing page displays Stripe data** (Please verify)
- [ ] **All 3 plans visible** (Free, Basic, Premium)
- [ ] **Prices in EUR** (€0, €9.86, €17.28)
- [ ] **Business plan shown** (Custom pricing)

## Testing
Please test the pricing page now:
https://writewise-website-918249600328.europe-west10.run.app/pricing

The pricing should load correctly with data from Stripe!
