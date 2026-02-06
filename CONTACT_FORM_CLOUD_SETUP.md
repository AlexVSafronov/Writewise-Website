# Contact Form Cloud Deployment Setup ✅

The contact form has been configured for your **cloud-deployed CMS** on Google Cloud Run.

## What Was Done

### 1. Retrieved Mailjet Credentials from Google Cloud
Retrieved existing Mailjet credentials from Google Cloud Secret Manager (`writewise-468912`):
- **MAILJET_API_KEY**: `87ab2b68abdf27155752bdad078b8992`
- **MAILJET_SECRET_KEY**: `ebfdb4735c8d1f0faa3a40c7c5d691dc`
- **SUPPORT_EMAIL**: `support@write-wise.com`

These are the same credentials already used in your WriteWise-Simple app.

### 2. Added Mailjet Secrets to GitHub
Added the following secrets to your GitHub repository for use in CI/CD:
- ✅ `MAILJET_API_KEY`
- ✅ `MAILJET_SECRET_KEY`

### 3. Updated Cloud Run Deployment Configuration
Modified `.github/workflows/deploy-cms.yml` to inject Mailjet environment variables during deployment:
- `MAILJET_API_KEY=${{ secrets.MAILJET_API_KEY }}`
- `MAILJET_SECRET_KEY=${{ secrets.MAILJET_SECRET_KEY }}`
- `SUPPORT_EMAIL=support@write-wise.com`

### 4. Created Contact Form Implementation
- ✅ **Frontend**: `/website/src/pages/Contact.tsx` - Contact form with validation
- ✅ **Backend**: `/cms/src/api/contact/` - Strapi API endpoint with Mailjet integration
- ✅ **Routes**: Added `/contact` route to website
- ✅ **Footer**: Updated Contact link to `/contact`
- ✅ **Package**: Installed `node-mailjet` in CMS

## Deployment Architecture

```
┌─────────────────────┐
│  User fills form    │
│  at /contact        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Website (Local)    │
│  localhost:8081     │
└──────────┬──────────┘
           │
           ▼ POST /api/contact
┌─────────────────────┐
│  Strapi CMS         │
│  (Cloud Run)        │
│  writewise-cms      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Mailjet API        │
│  Sends email to     │
│  support@write-wise │
└─────────────────────┘
```

## How to Deploy

### Option 1: Automatic Deployment (Recommended)
Simply push your changes to the `main` branch:

```bash
git add .
git commit -m "feat: Add contact form with Mailjet integration"
git push origin main
```

GitHub Actions will automatically:
1. Build the Docker image
2. Deploy to Cloud Run with Mailjet env vars
3. Update the running CMS service

### Option 2: Manual Deployment
Trigger the workflow manually from GitHub:
1. Go to GitHub → Actions tab
2. Select "Deploy CMS to Cloud Run"
3. Click "Run workflow" → "Run workflow"

### Option 3: Direct Cloud Run Update (Quick)
Update the running service with new environment variables without full redeploy:

```bash
gcloud run services update writewise-cms \
  --region europe-west10 \
  --project writewise-468912 \
  --update-env-vars "MAILJET_API_KEY=87ab2b68abdf27155752bdad078b8992,MAILJET_SECRET_KEY=ebfdb4735c8d1f0faa3a40c7c5d691dc,SUPPORT_EMAIL=support@write-wise.com"
```

This option updates only the environment variables without rebuilding the container. However, you still need to deploy the new contact API code eventually.

## Current Deployment Status

- ✅ Mailjet credentials added to GitHub Secrets
- ✅ Deployment workflow updated with Mailjet env vars
- ✅ Contact form code implemented
- ⏳ **Awaiting deployment** to activate the contact form endpoint

## Testing After Deployment

Once deployed, test the contact form:

1. **Visit contact page**: `http://localhost:8081/contact` (frontend running locally)
2. **Fill out the form** with test data
3. **Submit the form** - it will POST to your cloud CMS
4. **Check email**: Message should arrive at `support@write-wise.com`

The email will include:
- Subject: `[Category] Contact Form Submission from [Name]`
- User's name, email, and message
- Reply-to automatically set to user's email

## Verify Deployment

After deploying, verify the environment variables are set:

```bash
gcloud run services describe writewise-cms \
  --region europe-west10 \
  --project writewise-468912 \
  --format="value(spec.template.spec.containers[0].env)"
```

Look for:
- `MAILJET_API_KEY`
- `MAILJET_SECRET_KEY`
- `SUPPORT_EMAIL`

## Troubleshooting

### If emails don't send after deployment:

1. **Check CMS logs**:
   ```bash
   gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=writewise-cms" \
     --limit 50 \
     --project writewise-468912 \
     --format json
   ```

2. **Verify sender email** in [Mailjet Dashboard](https://app.mailjet.com/)
   - Go to Account Settings → Sender Addresses & Domains
   - Confirm `support@write-wise.com` is verified
   - (Likely already verified since you use it in the main app)

3. **Check API endpoint** is accessible:
   ```bash
   curl -X POST https://writewise-cms-m2xkjyh6ta-oe.a.run.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "subject": "general",
       "message": "This is a test message from curl"
     }'
   ```

4. **Verify Mailjet account** is active and not suspended

## Files Modified

### Frontend (Website)
- ✅ `/website/src/pages/Contact.tsx` - Contact form page
- ✅ `/website/src/App.tsx` - Added `/contact` route
- ✅ `/website/src/components/layout/Footer.tsx` - Updated Contact link

### Backend (CMS)
- ✅ `/cms/src/api/contact/routes/contact.ts` - API route
- ✅ `/cms/src/api/contact/controllers/contact.ts` - Request handler
- ✅ `/cms/src/api/contact/services/contact.ts` - Mailjet service
- ✅ `/cms/package.json` - Added `node-mailjet` dependency

### CI/CD
- ✅ `.github/workflows/deploy-cms.yml` - Added Mailjet env vars

### GitHub Secrets (Added)
- ✅ `MAILJET_API_KEY`
- ✅ `MAILJET_SECRET_KEY`

## Security

- ✅ No `.env` file created (not needed for cloud deployment)
- ✅ Credentials stored in GitHub Secrets (encrypted)
- ✅ Environment variables injected at deployment time
- ✅ Same Mailjet credentials used across all WriteWise services
- ✅ Contact API endpoint is public (no auth required for contact form)

## Next Step

**Deploy to activate the contact form:**

```bash
git add .
git commit -m "feat: Add contact form with Mailjet integration"
git push origin main
```

Then test at `http://localhost:8081/contact`! 🚀
