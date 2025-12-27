# **Technical Architecture: Chromapages Marketing Site v2.0**

| System Metadata | Details |
| :---- | :---- |
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Content Engine** | Sanity.io |
| **Deployment** | Hostinger (Node.js/Docker) |

## **1\. Project Structure (App Router)**

We adhere to a strict feature-based colocation strategy to keep the codebase maintainable.

chromapages-web/  
├── app/  
│   ├── (site)/                 \# Public marketing routes  
│   │   ├── page.tsx            \# Homepage  
│   │   ├── services/           \# Service landing pages  
│   │   ├── work/               \# Case studies  
│   │   └── pricing/            \# Pricing & Packages  
│   ├── (studio)/               \# Sanity Studio route  
│   │   └── studio/\[\[...tool\]\]/ \# CMS Admin Panel  
│   ├── layout.tsx              \# Root Layout (Fonts, Metadata)  
│   ├── globals.css             \# Tailwind Directives  
│   └── not-found.tsx           \# Custom 404  
├── components/  
│   ├── global/                 \# Nav, Footer, Layout Wrappers  
│   ├── ui/                     \# Primitive UI Kit (Buttons, Inputs)  
│   ├── sections/               \# Page Sections (Hero, Features, CTA)  
│   └── studio/                 \# Custom Sanity Components  
├── lib/  
│   ├── sanity/                 \# Sanity Client & Queries  
│   ├── utils/                  \# Helper functions (cn, formatters)  
│   └── tracking/               \# GA4 / Pixel Logic  
├── public/                     \# Static assets (favicons, robots.txt)  
├── sanity/                     \# Sanity Configuration  
│   ├── schemas/                \# Content Types  
│   └── structure.ts            \# Desk Structure  
├── tailwind.config.ts          \# Design System Token Map  
└── next.config.mjs             \# Build Config

## **2\. Design System Implementation (Tailwind)**

We map the **Chromapages Brand System** directly into tailwind.config.ts. This prevents "magic numbers" and ensures brand consistency.

### **Token Mapping**

* **Primary (Deep Indigo):** \#2C3892  
* **Accent (Teal Blue):** \#23698C  
* **Base (Off-White):** \#EFEFED  
* **Text (Ink):** \#0F172A

### **Font Configuration**

* **Headlines:** Montserrat (via next/font/google)  
* **Body:** Inter (via next/font/google)

### **Tailwind Config Snippet**

// tailwind.config.ts  
import type { Config } from "tailwindcss";

const config: Config \= {  
  theme: {  
    extend: {  
      colors: {  
        brand: {  
          primary: "\#2C3892", // Deep Indigo  
          accent: "\#23698C",  // Teal Blue  
          base: "\#EFEFED",    // Off-White  
          ink: "\#0F172A",     // Primary Text  
        },  
      },  
      fontFamily: {  
        sans: \["var(--font-inter)", "sans-serif"\],  
        heading: \["var(--font-montserrat)", "sans-serif"\],  
      },  
      container: {  
        center: true,  
        padding: "1rem",  
        screens: {  
          "2xl": "1280px", // Max width constraint for readability  
        },  
      },  
    },  
  },  
  plugins: \[require("@tailwindcss/typography")\], // For CMS rich text  
};  
export default config;

## **3\. Data Strategy (Sanity CMS)**

We separate content into logical "Documents" to allow Marketing to move fast.

### **Core Schemas**

1. **page**: Dynamic landing pages builder (Hero \-\> Features \-\> CTA).  
2. **caseStudy**: Portfolio items with structured results data.  
3. **service**: Service detail pages.  
4. **settings**: Global site settings (Nav links, Footer, SEO defaults).

### **Fetching Strategy**

* **Production:** Use ISR (Incremental Static Regeneration) with revalidate: 60 (seconds).  
* **Preview:** Real-time preview mode inside Sanity Studio.

## **4\. Deployment Strategy (Hostinger)**

Since we are deploying to Hostinger (VPS/Cloud), we cannot rely on Vercel's proprietary edge functions.

### **Build Output**

We configure Next.js for a standalone Node.js build to optimize the container size.

// next.config.mjs  
const nextConfig \= {  
  output: "standalone",  
  images: {  
    remotePatterns: \[  
      { protocol: "https", hostname: "cdn.sanity.io" },  
    \],  
  },  
};  
export default nextConfig;

### **Process Management**

* **PM2:** Use PM2 to manage the Node.js process on the VPS for uptime assurance.  
* **CI/CD:** GitHub Actions to build the Docker image or trigger the deployment script on push to main.

## **5\. Performance & Tracking (The ROI Layer)**

### **Core Web Vitals**

* **Fonts:** display: swap is enforced via next/font.  
* **Scripts:** Third-party scripts (GA4, Meta Pixel) are loaded via next/script with strategy="afterInteractive" or strategy="lazyOnload" to prevent blocking the main thread.

### **Event Tracking Helper**

A unified utility to dispatch events to all connected analytics providers simultaneously.

// lib/tracking/events.ts  
export const trackEvent \= (name: string, value?: number) \=\> {  
  if (typeof window \!== "undefined" && window.gtag) {  
    window.gtag("event", name, { value });  
  }  
  // Add Meta Pixel or other trackers here  
};  
