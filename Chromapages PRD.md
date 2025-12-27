# **Product Requirements Document: Chromapages Marketing Site v2.0**

| Project Metadata | Details |
| :---- | :---- |
| **Project Name** | Chromapages Official Site Build |
| **Version** | 1.1 (Tech Stack Locked) |
| **Status** | **Ready for Design** |
| **Owner** | Chief Digital & Growth Officer (CDGO) |
| **Tech Stack** | Next.js, TypeScript, Tailwind CSS, Sanity CMS |
| **Primary KPI** | Qualified Leads (Form Submits \+ Bookings) |

## **1\. Executive Summary**

**The Problem:** The current market offers a binary choice: "Cheap & Chaotic" (freelancers/templates) or "Expensive & Slow" (traditional agencies). Most websites fail because they prioritize aesthetics over performance, or speed over brand trust.

**The Solution:** The new Chromapages site must be the ultimate case study of our proprietary system. It must demonstrate **"Digital Design Elevated"** by combining premium aesthetics with sub-second load times and aggressive conversion engineering.

**Strategic Goal:** Position Chromapages as the premium partner for high-growth businesses, targeting a "Quality Lead" over "High Volume".

## **2\. Target Audience & User Personas**

### **Primary Persona: "The Growth Founder"**

* **Role:** CEO / Founder of a company doing $1M \- $10M ARR.  
* **Pain Point:** "My current site is embarrassing. It doesn't reflect the quality of my product. We are running ads, but they aren't converting."  
* **Motivation:** Needs trust, speed, and a hands-off partner who "just gets it."  
* **Key Trigger:** "Fast on mobile" and "Conversion-first."

### **Secondary Persona: "The Marketing Director"**

* **Role:** Head of Marketing at a Series A/B tech company or established D2C brand.  
* **Pain Point:** "I can't update the landing pages without a developer. The site is slow, and Google Core Web Vitals are failing."  
* **Motivation:** Needs a reliable execution partner to handle the tech so they can focus on campaigns.

## **3\. Functional Requirements (The "What")**

### **3.1 Sitemap & Information Architecture**

The structure follows the **"Clarity of Use"** principle.

1. **Home:** The "Hero Formula" (Outcome \+ Proof \+ CTA). Aggressive social proof.  
2. **Services (The Offer Architecture):**  
   * **Marketing Websites:** Focus on Lead Gen, SEO, and Landing Page Sprints.  
   * **E-Commerce:** Focus on Shopify custom builds and AOV optimization.  
   * **Web Apps / MVPs:** Focus on dashboard/SaaS product design.  
3. **The System (Process):** A deep dive into the 4 Pillars (Premium, Convert, Fast, Support). This is the "Trust" page.  
4. **Work (Portfolio):** Case studies formatted as *Problem \-\> Solution \-\> Result*.  
5. **Pricing:** Transparent "Packages" vs. "Retainer" breakdown.  
6. **Contact:** Dynamic form routing (Sales vs. General Inquiry).

### **3.2 Key Features**

* **Component-Driven UI:** All pages built from a reusable library (Hero Cards, Feature Grids, Testimonial Sliders).  
* **The "Conversion Engine":**  
  * Sticky "Book A Call" button on mobile view.  
  * Exit-intent modal for a high-value lead magnet (e.g., "The Website Audit Checklist").  
* **Performance Mode:**  
  * Next.js Image Optimization for all assets.  
  * Script Manager to delay third-party pixels (Meta/GA4) until hydration to preserve Core Web Vitals.  
* **CMS Integration:** Marketing team must be able to create new Landing Pages and Case Studies without code via **Sanity Studio**.

## **4\. Design & Brand Requirements (The "Look")**

### **4.1 Visual Identity (Strict Adherence)**

* **Primary Color:** Deep Indigo (\#2C3892) \- Used for Backgrounds, Text, Primary Brand Elements.  
* **Accent Color:** Teal Blue (\#23698C) \- Used for Hover states, Focus rings, Secondary Buttons.  
* **Base:** Off-White (\#EFEFED) \- The canvas color. **Never use pure white (\#FFFFFF)** for backgrounds.

### **4.2 Typography System**

* **Headlines:** **Montserrat**.  
  * *Hero H1:* Montserrat Black (800/900).  
  * *Section H2/H3:* Montserrat Bold (700).  
* **Body:** **Inter**.  
  * *Paragraphs:* Inter Regular (400) or Medium (500) for readability.  
  * *UI Labels:* Inter SemiBold (600) \+ Uppercase tracking.

### **4.3 The "Digital Design Elevated" Aesthetic**

* **High Contrast:** Dark text on off-white, or white text on Deep Indigo. No low-contrast grey-on-grey.  
* **Grid Systems:** 12-column grid on desktop, 4-column on mobile.  
* **Imagery:** No generic stock photos. Use abstract geometric forms, device mockups, or high-end architectural photography.

## **5\. Technical Stack & Standards (The "Engine")**

### **5.1 Architecture**

* **Framework:** **Next.js 14+** (App Router).  
* **Language:** **TypeScript** (Strict Mode).  
* **Styling:** **Tailwind CSS**.  
  * *Config:* Must map colors.brand.primary to \#2C3892, etc.  
* **Content:** **Sanity.io** (Headless CMS).  
  * *Schema:* Projects, Services, Authors, Legal Pages.  
* **Deployment:** **Hostinger** (VPS/Cloud Node.js Environment).  
  * *Build:* Standalone Output (output: 'standalone') or Docker container.

### **5.2 Performance Standards (Non-Negotiable)**

* **LCP (Largest Contentful Paint):** \< 1.2s.  
* **CLS (Cumulative Layout Shift):** 0\.  
* **INP (Interaction to Next Paint):** \< 200ms.  
* **Accessibility:** WCAG 2.1 AA Compliant (Contrast, Keyboard Nav, Aria Labels).

## **6\. Measurement & Analytics (The "ROI")**

### **6.1 Event Taxonomy (GA4 \+ Pixel)**

We track **Outcomes**, not just Pageviews.

| Event Name | Trigger | Priority |
| :---- | :---- | :---- |
| generate\_lead | Successful Form Submit (Contact) | **High** |
| begin\_checkout | Click "Select Plan" (Pricing) | **High** |
| click\_cta\_primary | Click "Book A Call" (Nav/Hero) | Med |
| view\_case\_study | Scroll depth \> 50% on Case Study | Low |

### **6.2 Conversion Optimization**

* **Honeypot Fields:** Invisible fields in forms to block spam bots without CAPTCHA friction.  
* **Feedback Loop:** All forms must redirect to a /thank-you page to trigger distinct analytics events.

## **7\. Development Phases**

### **Phase 1: Foundation (Weeks 1-2)**

* Setup Next.js repo with TypeScript & Tailwind.  
* Configure Design Tokens (Colors, Typography) in tailwind.config.ts.  
* Initialize **Sanity Studio** and define Schemas.

### **Phase 2: Core Components (Weeks 3-4)**

* Build the "UI Kit": Buttons, Cards, Inputs, Typography blocks.  
* Develop the Global Layout (Nav, Footer, Mobile Menu).

### **Phase 3: Page Assembly (Weeks 5-6)**

* Assemble Home, Services, and System pages.  
* Implement Sanity data fetching (GROQ queries).

### **Phase 4: Launch Prep (Week 7\)**

* **QA Sprint:** Cross-browser testing (Safari, Chrome, Firefox).  
* **Performance Sprint:** Image optimization, bundle analysis.  
* **Tracking Setup:** GA4/Pixel implementation.  
* **Hostinger Setup:** Configure VPS/Cloud environment, SSL, and domains.

### **Phase 5: Go Live (Week 8\)**

* DNS Propagation.  
* Post-Launch Health Check.

## **8\. Definition of Done (The Gate)**

The project is **NOT** complete until:

1. $$ $$  
   **Lighthouse Score:** 95+ across Performance, Accessibility, Best Practices, SEO.  
2. $$ $$  
   **Tracking Verified:** Test leads appear in GA4 and CRM.  
3. $$ $$  
   **Mobile Sign-off:** Approved by CDGO on physical iOS and Android devices.  
4. $$ $$  
   **Security:** Headers configured, no exposed API keys.