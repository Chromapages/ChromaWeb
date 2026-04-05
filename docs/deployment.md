# Deployment

## Purpose
This document defines the deployment approach for the Chromapages marketing website, including CI/CD workflow, environment variables, hosting setup, and domain/DNS requirements.

The goal is to make deployment repeatable, low-risk, and easy to maintain.

---

## 1. Deployment Philosophy

The deployment setup should support:
- predictable releases
- easy preview/review workflows
- low-friction rollback
- safe handling of secrets
- clean domain configuration
- simple production operations for a marketing site

This is not enterprise infrastructure. Keep it reliable and pragmatic.

---

## 2. Recommended Hosting

## Primary Recommendation
**Vercel**

### Why
Vercel is the best operational fit for a Next.js marketing website because it provides:
- seamless CI/CD with Git-based deployments
- preview deployments per branch or pull request
- easy environment variable management
- reliable production deployment flow
- CDN-backed delivery and strong performance defaults

## Alternative
**Hostinger** or equivalent provider may be used if there is a business reason to consolidate hosting, but Vercel remains the cleaner default for this stack.

---

## 3. Recommended CI/CD Flow

## Source Control
Use **GitHub** as the source of truth for the codebase.

## Branching Model
Recommended basic branch setup:
- `main` — production-ready branch
- `develop` or feature branches — active work branches

### Suggested Workflow
1. Create feature branch
2. Build and test changes locally
3. Push branch to remote repository
4. Preview deployment is generated automatically
5. Review content/functionality in preview
6. Merge into `main`
7. Production deployment is triggered automatically
8. Run post-deploy QA checks

---

## 4. CI/CD Steps

### Local Development
```bash
npm install
npm run dev
```

### Build Verification
```bash
npm run build
npm run lint
```

### Pull Request Flow
- open PR
- review code and content
- validate preview deployment
- confirm forms, navigation, and metadata on preview
- merge after approval

### Production Release Flow
- merge approved changes into `main`
- Vercel auto-builds and deploys production
- verify deployment success
- run post-launch smoke test

---

## 5. Suggested Pre-Deployment Checklist

Before merging to production:

- build passes
- lint passes
- environment variables are present
- metadata renders correctly
- forms submit correctly
- analytics tags are present
- internal links work
- canonical URLs are correct
- key pages are indexed/noindexed correctly
- preview content matches expectations

---

## 6. Environment Variables

## Core Environment Variables
Typical values may include:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
BOOKING_URL=
CMS_PROJECT_ID=
CMS_DATASET=
CMS_API_TOKEN=
CMS_PREVIEW_SECRET=
REVALIDATE_SECRET=
FORM_WEBHOOK_URL=
FORM_NOTIFICATION_EMAIL=
```

### Public vs Server Variables
- `NEXT_PUBLIC_*` variables are exposed to the client bundle
- secrets and tokens must remain server-side only

### Rules
- never commit secrets to the repository
- store secrets in the hosting platform’s environment configuration
- document which environments require which values

---

## 7. Environment Definitions

## Local
Used for development on a local machine.

### Characteristics
- local `.env.local`
- local dev server
- local testing only

## Preview
Used for review/testing deployments tied to branches or PRs.

### Characteristics
- preview deployment URLs
- same stack as production where practical
- safe for QA and stakeholder review

## Production
Live customer-facing environment.

### Characteristics
- main domain attached
- final environment variables configured
- analytics and forms point to live services

---

## 8. Domain Setup

## Recommended Domain Structure
- primary domain: `chromapages.com`
- canonical www decision: choose either `www` or apex and redirect consistently

### Recommendation
Pick one canonical version:
- `https://chromapages.com`
or
- `https://www.chromapages.com`

Then redirect all alternatives to the canonical host.

---

## 9. DNS Setup

## Common Records Needed

### Apex Domain
Use A record or platform-recommended apex configuration

### WWW Subdomain
Use CNAME to provider-recommended target

### Example Conceptual Setup
```txt
A      @      [hosting provider IP or alias target]
CNAME  www    [hosting provider cname target]
```

### Additional Possible Records
- TXT records for domain verification
- email-related records if using a domain email provider
- verification records for analytics/search tooling

### Rule
Always follow the current hosting provider’s exact DNS instructions rather than hardcoding assumptions.

---

## 10. Vercel Setup Notes

## Typical Steps
1. Connect GitHub repository to Vercel
2. Select project framework
3. Configure build settings if needed
4. Add environment variables
5. Attach production domain
6. Configure preview and production behavior
7. Validate redirects and canonical host behavior

### Default Build Expectations
- install dependencies
- run `next build`
- deploy output automatically

---

## 11. CMS Deployment Considerations

If a headless CMS is used:

### Requirements
- production dataset/project configured
- preview credentials separated from production public access
- webhook configured for revalidation if needed

### Recommendation
Do not couple the site to unpublished content behavior unless preview mode is intentionally configured and tested.

---

## 12. Form / Lead Capture Deployment Notes

### Requirements
- live endpoint configured
- spam prevention tested in production-like environment
- success/thank-you flow validated
- analytics tracking tested on successful submit

### If Using Webhooks
- verify webhook destination
- confirm request authentication if used
- test failure handling gracefully

---

## 13. Analytics Deployment Notes

Before going live:
- verify GA4 is receiving events
- verify GTM container is published
- verify conversions are marked correctly
- verify duplicate events are not firing
- verify thank-you page or booking completion tracking works as intended

---

## 14. Post-Deployment Smoke Test

Immediately after production deployment, verify:

- homepage loads correctly
- key pages render
- nav links work
- contact form works
- thank-you page works
- booking link works
- metadata and social preview tags are present
- sitemap and robots are accessible if configured
- analytics events fire correctly
- canonical URLs are correct
- no obvious console/runtime errors on key pages

---

## 15. Rollback Strategy

### Minimum Rollback Plan
- use hosting platform rollback/redeploy capability
- keep last known good deployment available
- revert broken merges quickly through source control if needed

### Rule
For a marketing site, fast rollback is more valuable than complex release choreography.

---

## 16. Recommended Launch Process

### Launch Sequence
1. final QA in preview
2. confirm environment variables
3. merge to production branch
4. deploy
5. validate live domain and redirects
6. test contact and booking paths
7. test analytics
8. monitor early traffic and submissions

---

## 17. Final Recommendation

Use a simple GitHub -> Vercel deployment flow with preview deployments, environment-based config, and a short post-release smoke test.

The build should be easy to ship, easy to validate, and easy to recover if a release goes wrong.
