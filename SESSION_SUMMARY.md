# WriteWise - Current Session Summary
**Last Updated:** 2026-02-11 19:30 UTC

## 🎯 Current Project Status

### ✅ Successfully Completed Today

1. **Custom Domain Setup** (write-wise.com, www.write-wise.com, cms.write-wise.com)
   - Load balancer configured with SSL certificates
   - DNS records configured (A records pointing to 34.160.140.247)
   - SSL certificates: ACTIVE for all 3 domains
   - Fixed routing issue (wildcard rule was routing everything to CMS)

2. **Production Stripe Integration**
   - Switched from test keys to live production keys
   - Website now shows real production pricing
   - Keys stored in GitHub Secrets

3. **Security Hardening**
   - Google Cloud Armor WAF configured
   - Rate limiting middleware implemented (fixed after initial issue)
   - SQL injection, XSS, LFI protection active
   - Rate limits: 5 login attempts/min, 200 admin requests/min, 100 API requests/min

4. **UI/UX Improvements**
   - Pricing cards centered (fixed flexbox layout)
   - Homepage copy updated ("Join other learners worldwide")
   - Custom WriteWise favicon with brand colors

5. **CMS Rate Limiting Fix**
   - Fixed overly aggressive rate limiting that blocked admin panel
   - Admin panel now works perfectly

## 🌐 Live URLs

### Production Websites
- **Main Website:** https://write-wise.com
- **WWW Subdomain:** https://www.write-wise.com
- **CMS Admin:** https://cms.write-wise.com/admin
- **Application:** https://app.write-wise.com

### Cloud Run Services (Direct Access)
- **Website:** https://writewise-website-m2xkjyh6ta-oe.a.run.app
- **CMS:** https://writewise-cms-m2xkjyh6ta-oe.a.run.app

### GitHub Repository
- **Repo:** https://github.com/AlexVSafronov/Writewise-Website
- **Actions:** https://github.com/AlexVSafronov/Writewise-Website/actions

## 🔑 Important Configuration

### Google Cloud Infrastructure

**Project:** writewise-468912
**Region:** europe-west10

**Load Balancer:**
- Static IP: `34.160.140.247`
- SSL Certificate: `writewise-ssl-cert-v2` (ACTIVE)
  - Covers: write-wise.com, www.write-wise.com, cms.write-wise.com
- Backend Services:
  - `writewise-website-backend` → Website
  - `writewise-cms-backend` → CMS
- Security Policy: `writewise-security-policy` (applied to both backends)

**Network Endpoint Groups:**
- `writewise-website-neg` → Cloud Run: writewise-website
- `writewise-cms-neg` → Cloud Run: writewise-cms

**Cloud Armor Rules:**
- Rule 1000: Rate-based ban (100 req/min, 10min ban)
- Rule 2000: SQL injection protection
- Rule 3000: XSS protection
- Rule 4000: LFI protection

### DNS Configuration

All DNS records point to load balancer IP: `34.160.140.247`

```
Type: A
Name: @ (root)
Value: 34.160.140.247

Type: A
Name: www
Value: 34.160.140.247

Type: A
Name: cms
Value: 34.160.140.247
```

### Stripe Configuration

**Environment:** Production (LIVE mode)

**Keys (stored in GitHub Secrets):**
- `STRIPE_SECRET_KEY`: rk_live_51Sp3KbDS2PG1K2EV... (for CMS backend)
- `STRIPE_PUBLISHABLE_KEY`: pk_live_51Sp3KbDS2PG1K2EV... (for website frontend)

**API Endpoint:** https://cms.write-wise.com/api/pricing-plans/stripe

### Email Configuration (Mailjet)

**Keys (stored in GitHub Secrets):**
- `MAILJET_API_KEY`: 87ab2b68abdf27155752bdad078b8992
- `MAILJET_SECRET_KEY`: ebfdb4735c8d1f0faa3a40c7c5d691dc

**Support Email:** support@write-wise.com

**Endpoint:** https://cms.write-wise.com/api/contact

### Database

**Type:** PostgreSQL (Cloud SQL)
**Instance:** writewise-468912:europe-west10:writewise-db
**Schema:** cms
**Password:** Stored in Secret Manager as `db-password:latest`

### CORS Configuration

**File:** `/cms/config/middlewares.ts`

**Whitelisted Origins:**
```typescript
origin: [
  'http://localhost:8081',
  'http://localhost:5173',
  'https://write-wise.com',
  'https://www.write-wise.com',
  'https://writewise-website-m2xkjyh6ta-oe.a.run.app',
  'https://writewise-website-918249600328.europe-west10.run.app',
  'https://*.vercel.app'
]
```

## 📋 Recent Changes (Last 6 Hours)

### Commits Made Today

1. **3ce4f7a** - fix: Adjust rate limiting to allow normal admin panel usage
   - Fixed CMS admin panel blocked by aggressive rate limiting
   - Login: 5 attempts/min, Admin: 200 req/min, API: 100 req/min

2. **94f6287** - feat: Add custom WriteWise favicon with brand colors
   - Custom SVG favicon with brand gradient
   - Book icon matching logo aesthetic

3. **014ed18** - fix: Update homepage CTA copy to be more accurate
   - Changed "Join 50,000+ learners" to "Join other learners worldwide"

4. **f1b9e12** - fix: Center pricing cards and add security documentation
   - Changed grid to flexbox with justify-center
   - Cards now center properly with any count

5. **77d4446** - feat: Add comprehensive security to CMS with rate limiting and Cloud Armor
   - Implemented koa-ratelimit middleware
   - Configured Google Cloud Armor WAF
   - SQL injection, XSS, LFI protection

6. Earlier commits: Domain setup, SSL certificates, load balancer configuration

### Current Deployments

**Status as of 19:26 UTC:**
- ✅ CMS: Deployed with fixed rate limiting
- 🔄 Website: Deploying with new favicon (in progress)

## 🛠️ GitHub Actions Workflows

### deploy-cms.yml
**Triggers:** Push to main (cms/), manual dispatch
**Service:** writewise-cms
**Environment Variables:**
- NODE_ENV=production
- DATABASE_* (PostgreSQL connection)
- STRIPE_SECRET_KEY (from secrets)
- MAILJET_* (from secrets)
- SUPPORT_EMAIL=support@write-wise.com

**Build Args:** None (runtime env vars only)

### deploy-website.yml
**Triggers:** Push to main (website/), manual dispatch
**Service:** writewise-website
**Build Args (build-time):**
- VITE_STRAPI_URL=https://writewise-cms-m2xkjyh6ta-oe.a.run.app
- VITE_APP_URL=https://write-wise.com
- VITE_API_URL=https://app.write-wise.com
- VITE_STRIPE_PUBLIC_KEY (from secrets)

**Runtime Env Vars:** None (static site, all baked in at build)

## 🔒 Security Summary

### Active Protection Layers

1. **Application Rate Limiting (Strapi Middleware)**
   - Login: 5 attempts/minute per IP
   - Admin routes: 200 requests/minute per IP
   - Public API: 100 requests/minute per IP

2. **Infrastructure WAF (Cloud Armor)**
   - Rate-based ban: 100 req/min → 10min ban
   - SQL injection blocking
   - XSS blocking
   - LFI blocking

3. **HTTPS/SSL**
   - Managed SSL certificates (auto-renewal)
   - TLS 1.2+ only
   - Perfect Forward Secrecy

4. **Authentication**
   - Strapi built-in (bcrypt password hashing)
   - JWT token authentication
   - Session management

5. **CORS**
   - Whitelist-only origin policy
   - Properly configured for all domains

### Security Cost

**Google Cloud Armor:** ~$7-10/month
- Security policy: $6/month flat fee
- Rule evaluations: ~$1/month (within free tier)

## 📁 Important Files

### Configuration Files
- `/cms/config/middlewares.ts` - CORS, rate limiting
- `/cms/src/middlewares/rate-limit.ts` - Rate limiting logic
- `/cms/config/database.ts` - Database configuration
- `/website/index.html` - Favicon, meta tags
- `/website/src/pages/Pricing.tsx` - Pricing page with centered cards
- `/website/src/pages/Contact.tsx` - Contact form with Mailjet

### Deployment Files
- `/.github/workflows/deploy-cms.yml` - CMS deployment
- `/.github/workflows/deploy-website.yml` - Website deployment
- `/cms/Dockerfile` - CMS container
- `/website/Dockerfile` - Website container with build args

### Documentation Files
- `/CUSTOM_DOMAIN_SETUP.md` - Complete domain setup guide
- `/SECURITY_SETUP.md` - Security configuration details
- `/PRICING_FIX.md` - Vite build-time env vars explanation
- `/SESSION_SUMMARY.md` - This file

## ⚠️ Known Issues & Solutions

### Issue 1: CMS Admin Panel Rate Limiting (FIXED ✅)
**Problem:** Admin panel showed "too many requests" after login
**Cause:** Rate limit was 10 req/min for all /admin routes
**Fix:** Changed to 200 req/min for admin routes, 5 req/min for login only
**Status:** Fixed in commit 3ce4f7a, deployed at 19:26 UTC

### Issue 2: Pricing Cards Left-Aligned (FIXED ✅)
**Problem:** 2-3 pricing cards appeared shifted left instead of centered
**Cause:** CSS Grid with fixed columns
**Fix:** Changed to Flexbox with justify-center
**Status:** Fixed in commit f1b9e12, deployed

### Issue 3: All Domains Showing CMS (FIXED ✅)
**Problem:** write-wise.com and www showed Strapi login instead of website
**Cause:** Wildcard host rule '*' routing all traffic to CMS
**Fix:** Removed wildcard rule, kept only cms.write-wise.com rule
**Status:** Fixed, load balancer updated

### Issue 4: Sandbox Pricing Displayed (FIXED ✅)
**Problem:** Website showed test/sandbox Stripe pricing
**Cause:** Using test keys (rk_test_*, pk_test_*)
**Fix:** Updated to production keys (rk_live_*, pk_live_*)
**Status:** Fixed, production pricing now live

## 📊 Monitoring & Debugging

### Check Deployment Status
```bash
gh run list --limit 5
```

### Check CMS Logs
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=writewise-cms" \
  --project=writewise-468912 \
  --limit=50 \
  --freshness=1h
```

### Check Website Logs
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=writewise-website" \
  --project=writewise-468912 \
  --limit=50 \
  --freshness=1h
```

### Check Cloud Armor Blocked Requests
```bash
gcloud logging read "resource.type=http_load_balancer AND jsonPayload.enforcedSecurityPolicy.name=writewise-security-policy" \
  --project=writewise-468912 \
  --limit=20
```

### Check SSL Certificate Status
```bash
gcloud compute ssl-certificates describe writewise-ssl-cert-v2 \
  --global \
  --project=writewise-468912 \
  --format="get(managed.status,managed.domainStatus)"
```

### Test Pricing API
```bash
curl https://cms.write-wise.com/api/pricing-plans/stripe
```

### Test Contact API
```bash
curl -X POST https://cms.write-wise.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Test message"}'
```

### Check DNS Propagation
```bash
dig +short write-wise.com A
dig +short www.write-wise.com A
dig +short cms.write-wise.com A
```

Should all return: `34.160.140.247`

### Test Load Balancer Routing
```bash
# Test website routing
curl -I -H "Host: write-wise.com" https://34.160.140.247 --insecure

# Test CMS routing
curl -I -H "Host: cms.write-wise.com" https://34.160.140.247 --insecure
```

## 🚀 Next Session - Where to Continue

### Immediate Items (If Needed)

1. **Verify Favicon Deployment**
   - Check https://write-wise.com for new favicon
   - May need hard refresh (Ctrl+Shift+R)

2. **Test CMS Admin Panel**
   - Login at https://cms.write-wise.com/admin
   - Navigate through different pages
   - Ensure no rate limiting issues

3. **Verify Production Pricing**
   - Check https://write-wise.com/pricing
   - Ensure production Stripe pricing displays
   - Verify cards are centered

### Potential Future Enhancements

1. **SEO Optimization**
   - Verify Google Search Console integration
   - Submit sitemap
   - Monitor indexing

2. **Performance Optimization**
   - Enable Cloud CDN on load balancer
   - Optimize images
   - Review Core Web Vitals

3. **Monitoring Setup**
   - Cloud Monitoring dashboards
   - Uptime checks
   - Error alerting

4. **Backup Strategy**
   - Database backup schedule
   - CMS content backup
   - Disaster recovery plan

5. **Additional Security**
   - Consider IP whitelist for CMS admin
   - Set up 2FA for Strapi admins
   - Regular security audits

## 🔗 Quick Reference Links

### Google Cloud Console
- **Project Dashboard:** https://console.cloud.google.com/home/dashboard?project=writewise-468912
- **Cloud Run Services:** https://console.cloud.google.com/run?project=writewise-468912
- **Load Balancers:** https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers?project=writewise-468912
- **Cloud Armor:** https://console.cloud.google.com/net-security/securitypolicies/list?project=writewise-468912
- **SSL Certificates:** https://console.cloud.google.com/net-services/loadbalancing/advanced/sslCertificates/list?project=writewise-468912
- **Cloud SQL:** https://console.cloud.google.com/sql/instances?project=writewise-468912
- **Secret Manager:** https://console.cloud.google.com/security/secret-manager?project=writewise-468912

### External Services
- **Stripe Dashboard:** https://dashboard.stripe.com (use LIVE mode)
- **Mailjet Dashboard:** https://app.mailjet.com
- **Domain Registrar:** (Wherever write-wise.com is registered)

### Development
- **GitHub Repo:** https://github.com/AlexVSafronov/Writewise-Website
- **GitHub Actions:** https://github.com/AlexVSafronov/Writewise-Website/actions
- **GitHub Secrets:** https://github.com/AlexVSafronov/Writewise-Website/settings/secrets/actions

## 💡 Tips for Next Session

1. **Check Recent Commits**
   ```bash
   git log --oneline -10
   ```

2. **Check Current Deployment Status**
   ```bash
   gh run list --limit 5
   ```

3. **Verify All Services are Up**
   - Visit https://write-wise.com (should show marketing site)
   - Visit https://www.write-wise.com (should show same site)
   - Visit https://cms.write-wise.com/admin (should show Strapi login)
   - Visit https://write-wise.com/pricing (should show production pricing)

4. **If Something Doesn't Work**
   - Check logs (commands above)
   - Verify DNS still points to 34.160.140.247
   - Check SSL certificate status
   - Review recent commits

## 📝 Session Notes

### Today's Achievements Summary

Started with setting up custom domain, ended with a fully secure, production-ready website with:
- Custom domain with SSL
- Production Stripe integration
- Enterprise-grade security (WAF + rate limiting)
- Centered pricing layout
- Custom favicon
- Fixed CMS admin panel issues

### Key Learnings

1. **Cloud Run Domain Mapping:** europe-west10 doesn't support old domain mapping API, had to use load balancer
2. **Vite Build-Time Env Vars:** Static sites need environment variables at BUILD time, not runtime
3. **CORS with Multiple URLs:** Cloud Run services have two URL formats, must whitelist both
4. **Rate Limiting Balance:** Too strict breaks legitimate usage, need to differentiate login from normal usage
5. **Favicon Caching:** Browsers aggressively cache favicons, hard refresh needed

### Commands Used Often

```bash
# Deploy manually
gh workflow run deploy-cms.yml
gh workflow run deploy-website.yml

# Check logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=writewise-cms" --limit=50

# Update secrets
echo "value" | gh secret set SECRET_NAME

# Check DNS
dig +short write-wise.com

# Test endpoints
curl -I https://write-wise.com
```

---

**Ready to resume!** All important information is captured. Next session can continue from here.
