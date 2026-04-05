# QA Checklist

## Purpose
This document is the pre-launch and post-update QA checklist for the Chromapages marketing website.

The goal is to catch functional, content, SEO, analytics, and accessibility issues before they go live.

---

## 1. Global Functional Checks

- [ ] site loads without major console/runtime errors
- [ ] primary navigation works
- [ ] footer links work
- [ ] internal links resolve correctly
- [ ] external links open correctly
- [ ] no obvious broken components or layout failures
- [ ] 404 page works if implemented
- [ ] thank-you flow works

---

## 2. Responsive Checks

- [ ] homepage works on mobile
- [ ] homepage works on tablet
- [ ] homepage works on desktop
- [ ] navigation works across breakpoints
- [ ] forms are usable on mobile
- [ ] no important content is clipped or overlapping
- [ ] no unexpected horizontal scrolling

---

## 3. Page-Level Content Checks

For each core page:
- [ ] H1 is correct
- [ ] page purpose is clear
- [ ] CTA is present and logical
- [ ] copy is final or approved placeholder
- [ ] no obvious typos
- [ ] no placeholder lorem text remains
- [ ] no broken asset references
- [ ] metadata exists

### Core Pages
- [ ] Home
- [ ] Services
- [ ] Work
- [ ] Process
- [ ] Pricing
- [ ] About
- [ ] Contact
- [ ] Thank You
- [ ] Privacy Policy

---

## 4. Form Checks

- [ ] required fields validate
- [ ] invalid email is caught
- [ ] success state works
- [ ] error state works
- [ ] spam protection is active
- [ ] form_submit fires only on success
- [ ] form_start fires as intended
- [ ] notification delivery works
- [ ] webhook/CRM routing works if configured

---

## 5. Booking Flow Checks

- [ ] booking CTA links to correct destination
- [ ] booking link works from all key pages
- [ ] booking_click tracking fires
- [ ] booking_complete tracking works if supported
- [ ] success path is understandable to user

---

## 6. SEO Checks

- [ ] title tag exists on each important page
- [ ] meta description exists on each important page
- [ ] canonical URL is correct
- [ ] heading hierarchy is logical
- [ ] schema markup is present where intended
- [ ] sitemap is accessible if implemented
- [ ] robots rules are correct
- [ ] thank-you page noindex status checked if intended
- [ ] no accidental duplicate titles/descriptions across core pages

---

## 7. Analytics Checks

- [ ] GA4 installed
- [ ] GTM installed
- [ ] page views tracked
- [ ] CTA clicks tracked
- [ ] form_start tracked
- [ ] form_submit tracked
- [ ] booking_click tracked
- [ ] booking_complete tracked if possible
- [ ] no obvious duplicate event firing
- [ ] conversions marked correctly in GA4

---

## 8. Accessibility Checks

- [ ] skip link works
- [ ] navigation is keyboard accessible
- [ ] mobile menu is keyboard accessible
- [ ] focus states are visible
- [ ] heading order is logical
- [ ] form labels are programmatically associated
- [ ] FAQ accordion is accessible
- [ ] alt text is appropriate
- [ ] page is usable at zoom
- [ ] no obvious keyboard traps

---

## 9. Browser / Device Checks

Test at minimum in:
- [ ] Chrome
- [ ] Safari
- [ ] Firefox

If available, also verify:
- [ ] iPhone Safari
- [ ] Android Chrome

---

## 10. Performance Checks

- [ ] homepage performance reviewed
- [ ] service page performance reviewed
- [ ] heavy assets optimized
- [ ] unnecessary scripts removed
- [ ] images load properly
- [ ] no obvious performance regressions from preview to production

---

## 11. Launch Blockers

Any of the following should block launch until resolved:
- broken contact form
- broken booking CTA
- missing primary page content
- obvious mobile breakage
- analytics not firing on primary conversions
- incorrect canonical/domain behavior
- legal/privacy page missing if required for public launch

---

## 12. Final Sign-Off

### Ready For Launch When:
- [ ] functional checks pass
- [ ] content checks pass
- [ ] SEO checks pass
- [ ] analytics checks pass
- [ ] accessibility baseline checks pass
- [ ] critical flows verified on production domain

---

## Recommendation

Use this checklist for:
- initial launch
- major updates
- offer/pricing changes
- new landing page releases

Do not rely on memory for QA. Use the checklist every time.
