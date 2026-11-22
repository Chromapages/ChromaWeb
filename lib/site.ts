export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  _id?: string;
  slug: string;
  label: string;
  summary: string;
  body: string;
  audience: string[];
  outcomes: string[];
  includes: string[];
  faq: { _id?: string; question: string; answer: string }[];
};

export type ProcessStep = {
  _id?: string;
  title: string;
  summary: string;
};

export type Differentiator = {
  _id?: string;
  title: string;
  summary: string;
};

export type PricingOffer = {
  _id?: string;
  title: string;
  summary: string;
  fit: string;
  includes: string[];
  framing: string;
  ctaLabel: string;
};

export type FaqItem = {
  _id?: string;
  question: string;
  answer: string;
};

export function resolveSiteOrigin(raw?: string): string {
  if (raw?.trim()) {
    try {
      const url = new URL(raw.trim());
      if ((url.protocol === "http:" || url.protocol === "https:") &&
        !url.username && !url.password && !/[?#]/.test(url.href)) {
        return url.origin;
      }
    } catch {
      // Use the canonical public origin for invalid configuration.
    }
  }
  return "https://chromapages.com";
}

export const siteOrigin = resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export const site = {
  name: "Chromapages",
  tagline: "Digital Design Elevated.",
  description:
    "Chromapages designs and builds websites for service businesses ready for an online presence that reflects the quality of their work.",
  email: "hello@chromapages.com",
  bookingLabel: "Send an inquiry",
  bookingHref: "/contact",
  url: siteOrigin,
};

const socialTitle = "Websites for service businesses | Chromapages";
const socialImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Chromapages — Websites for service businesses",
};

export const siteSocialMetadata = {
  openGraph: {
    type: "website" as const,
    siteName: site.name,
    title: socialTitle,
    description: site.description,
    url: "/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: socialTitle,
    description: site.description,
    images: [{ url: socialImage.url, alt: socialImage.alt }],
  },
};

export const navigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services: ServiceItem[] = [
  {
    slug: "marketing-websites",
    label: "Marketing Websites",
    summary: "New websites and redesigns that explain your services and give visitors a clear way to get in touch.",
    body: "New websites and redesigns that explain your services and give visitors a clear way to get in touch.",
    audience: [
      "Businesses that need a stronger first impression",
      "Teams that want more qualified discovery calls",
      "Founders who need a site that feels credible on day one",
    ],
    outcomes: [
      "Sharper positioning and cleaner messaging",
      "Better mobile performance and faster load times",
      "A structure that supports SEO, referrals, and paid traffic",
    ],
    includes: [],
    faq: [
      {
        question: "How long does a marketing website project take?",
        answer:
          "Most projects move in clearly defined phases so the timeline stays predictable. The exact schedule depends on scope, content readiness, and feedback speed.",
      },
      {
        question: "Can you help with the copy?",
        answer:
          "Yes. We can write or refine the copy so the site communicates clearly without sounding generic or overloaded.",
      },
    ],
  },
  {
    slug: "landing-pages",
    label: "Landing Pages",
    summary: "Focused pages for a campaign, promotion, or launch, built around one main action.",
    body: "Focused pages for a campaign, promotion, or launch, built around one main action.",
    audience: [
      "Paid traffic campaigns",
      "Offer launches and lead magnets",
      "Teams that need a fast, high-conviction page",
    ],
    outcomes: [
      "One message and one action",
      "Cleaner qualification for ad traffic",
      "A page that can stand on its own or slot into a broader funnel",
    ],
    includes: [],
    faq: [
      {
        question: "Do landing pages need to match the main site?",
        answer:
          "They should feel connected to the brand, but the structure can be much tighter and more direct than the core website.",
      },
      {
        question: "Can you make multiple variants?",
        answer:
          "Yes. Landing pages can be adapted into a repeatable system for future campaigns.",
      },
    ],
  },
  {
    slug: "ecommerce",
    label: "E-Commerce",
    summary: "Storefronts, product pages, and checkout experiences for businesses selling online.",
    body: "Storefronts, product pages, and checkout experiences for businesses selling online.",
    audience: [
      "Boutique product brands",
      "Small catalogs with a focused product line",
      "Stores that need a cleaner path from browse to purchase",
    ],
    outcomes: [
      "Less friction in the buying flow",
      "More confidence at the product page level",
      "A store that can grow without feeling messy",
    ],
    includes: [],
    faq: [
      {
        question: "Do you rebuild the full store?",
        answer:
          "We can, but the scope depends on where the current experience is breaking down and how much needs to change.",
      },
    ],
  },
  {
    slug: "web-apps",
    label: "Web Apps",
    summary: "Portals, dashboards, and tools for a specific business or customer task.",
    body: "Portals, dashboards, and tools for a specific business or customer task.",
    audience: [
      "Founders building MVPs",
      "Teams replacing manual workflows",
      "Product experiences that need a clear front end",
    ],
    outcomes: [
      "A build that stays understandable as it grows",
      "Better handling of key workflows",
      "Cleaner handoff between design and development",
    ],
    includes: [],
    faq: [
      {
        question: "Do you handle product strategy too?",
        answer:
          "We can help shape the user-facing structure and feature priorities, especially when the goal is a focused MVP.",
      },
    ],
  },
  {
    slug: "ongoing-support",
    label: "Ongoing Support",
    summary: "Website updates, fixes, and improvements after launch.",
    body: "Website updates, fixes, and improvements after launch.",
    audience: [
      "Teams that need a dependable web partner",
      "Businesses planning frequent updates",
      "Marketing leads who want less vendor churn",
    ],
    outcomes: [
      "A steadier release cadence",
      "More confidence in future updates",
      "Ongoing conversion and UX improvements",
    ],
    includes: [],
    faq: [
      {
        question: "Is support on retainer?",
        answer:
          "It can be. We can structure ongoing support around a monthly commitment or a lighter request-based arrangement.",
      },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  { title: "Purpose", summary: "What should your website help visitors understand or do?" },
  { title: "Scope", summary: "Which pages, features, or problems need attention?" },
  { title: "Content", summary: "What copy, images, and other materials are ready to use?" },
  { title: "Feedback", summary: "Who will provide feedback and make decisions for your business?" },
  { title: "Review", summary: "How will the work be reviewed before it goes live?" },
  { title: "Launch", summary: "What needs to be ready for the website to go live?" },
  { title: "After launch", summary: "What updates or support will you need after launch?" },
];

export const differentiators: Differentiator[] = [
  { title: "Look Premium", summary: "Represent the quality of the business." },
  { title: "Convert Clearly", summary: "Make the offer and the next step clear." },
  { title: "Load Fast", summary: "Treat loading speed as part of the experience." },
  { title: "Launch Clean", summary: "Treat quality checks and launch readiness as part of the work." },
  { title: "Keep Improving", summary: "Consider what the website needs as the business changes." },
];

export const pricingOffers: PricingOffer[] = [
  {
    title: "Launch Website",
    summary:
      "A full marketing site for businesses that need a strong first impression and a better path to inquiry.",
    fit: "Best for companies replacing an outdated homepage or launching a new brand presence.",
    includes: [
      "Homepage and core page structure",
      "Responsive implementation",
      "QA and launch support",
      "Analytics setup guidance",
    ],
    framing: "Fixed scope with a discovery-led proposal.",
    ctaLabel: "Discuss a website",
  },
  {
    title: "Landing Page Sprint",
    summary:
      "A focused page for campaigns, launches, or one-off offers that need to convert quickly.",
    fit: "Best for paid traffic, event promotion, or a single high-priority offer.",
    includes: [
      "Offer framing and CTA system",
      "FAQ and proof sections",
      "Mobile-first build",
      "Fast turnaround",
    ],
    framing: "Ideal when speed and clarity matter more than broad site depth.",
    ctaLabel: "Plan a landing page",
  },
  {
    title: "Ongoing Support",
    summary:
      "Retainer-style support for teams that want a reliable partner after launch.",
    fit: "Best for businesses that need updates, new pages, or iterative improvements over time.",
    includes: [
      "Content updates",
      "New sections or landing pages",
      "Performance and UX improvements",
      "Priority support",
    ],
    framing: "Flexible monthly or request-based support, depending on need.",
    ctaLabel: "Ask about support",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes. The site is especially aimed at growth-minded SMBs that need a stronger web presence and a clearer conversion path.",
  },
  {
    question: "Can you help if we do not have final copy yet?",
    answer:
      "Yes. We can help organize the message and write the page copy so the project does not stall on content.",
  },
  {
    question: "What if we need the site to support ads or SEO later?",
    answer:
      "That is part of the plan. The structure is meant to support landing pages, service pages, and future content without a rebuild.",
  },
  {
    question: "How do we get started?",
    answer:
      "Use the contact form or book a call. We will review the project, confirm fit, and outline the next step.",
  },
  {
    question: "Do you offer post-launch updates?",
    answer:
      "Yes. Ongoing support is available for teams that want help after launch instead of starting from scratch every time.",
  },
];

export const projectTypes = [
  "Marketing Website",
  "Landing Page",
  "E-Commerce",
  "Web App / MVP",
  "Ongoing Support",
  "Not Sure Yet",
] as const;

export const budgetRanges = [
  "Under $2,500",
  "$2,500-$5,000",
  "$5,000-$10,000",
  "$10,000+",
  "Not Sure Yet",
] as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
