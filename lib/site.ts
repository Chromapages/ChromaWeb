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

export type ProjectItem = {
  _id?: string;
  slug: string;
  label: string;
  category: string;
  summary: string;
  result: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  imageAlt: string;
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

export type FooterGroup = {
  title: string;
  links: NavItem[];
};

export const site = {
  name: "Chromapages",
  tagline: "Digital design elevated.",
  description:
    "Chromapages builds modern websites and web apps that help businesses get more customers.",
  email: "hello@chromapages.com",
  bookingLabel: "Book A Call",
  bookingHref: "/contact",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chromapages.com",
};

export const navigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Marketing Websites", href: "/services/marketing-websites" },
      { label: "Landing Pages", href: "/services/landing-pages" },
      { label: "E-Commerce", href: "/services/ecommerce" },
      { label: "Web Apps", href: "/services/web-apps" },
      { label: "Ongoing Support", href: "/services/ongoing-support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Form", href: "/contact" },
      { label: "hello@chromapages.com", href: "mailto:hello@chromapages.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Thank You", href: "/thank-you" },
    ],
  },
];

export const services: ServiceItem[] = [
  {
    slug: "marketing-websites",
    label: "Marketing Websites",
    summary:
      "A primary website built to clarify the offer, build trust fast, and move qualified visitors toward a call.",
    body:
      "We design and build premium marketing sites that do the sales work your current site is probably skipping. The focus is clarity, proof, mobile performance, and a clean path to contact.",
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
    includes: [
      "Homepage strategy and copy direction",
      "Service and proof page structure",
      "Conversion-focused CTA paths",
      "Launch QA and measurement setup",
    ],
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
    summary:
      "Focused pages for a single campaign, offer, or audience segment, built to reduce distractions and increase action.",
    body:
      "Landing pages are the fastest way to give a campaign a better chance at conversion. We keep the page narrow, persuasive, and easy to scan so the visitor knows exactly what to do next.",
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
    includes: [
      "Offer framing and page hierarchy",
      "CTA design and form routing",
      "Optional FAQ and proof sections",
      "Analytics-ready conversion paths",
    ],
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
    summary:
      "Small-batch ecommerce experiences that make buying simple and keep the brand feel polished.",
    body:
      "For products that need a clear buying experience, we build storefronts that feel trustworthy, organized, and easy to use on mobile.",
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
    includes: [
      "Catalog and product page structure",
      "Mobile-first purchase flow",
      "Brand-led merchandising support",
      "Launch QA and conversion review",
    ],
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
    summary:
      "Lightweight product experiences, MVPs, and internal tools that need clear UX and clean execution.",
    body:
      "When a project needs to feel more like a product than a brochure, we focus on interface clarity, system thinking, and a launch path that keeps the scope manageable.",
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
    includes: [
      "Information architecture and UX flow",
      "Responsive component implementation",
      "Testing and launch support",
      "Future-ready structure for iteration",
    ],
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
    summary:
      "Post-launch design, content, and development support for teams that want a reliable partner after launch.",
    body:
      "A site should not go stale right after launch. We support ongoing improvements, landing pages, performance tweaks, and content updates so the site keeps earning its place.",
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
    includes: [
      "Content updates and refinements",
      "New landing pages or campaign assets",
      "Quality assurance and maintenance",
      "Support for new priorities as they come up",
    ],
    faq: [
      {
        question: "Is support on retainer?",
        answer:
          "It can be. We can structure ongoing support around a monthly commitment or a lighter request-based arrangement.",
      },
    ],
  },
];

export const featuredProjects: ProjectItem[] = [
  {
    slug: "service-site-refresh",
    label: "Service Site Refresh",
    category: "Marketing Website",
    summary:
      "A cleaner homepage structure and stronger conversion path for a business that needed to feel more credible fast.",
    result:
      "The site was reorganized around the offer, trust signals were surfaced earlier, and the path to inquiry became much clearer.",
    challenge:
      "The original experience was hard to scan and did not give visitors a confident next step.",
    approach:
      "We reworked the hero, simplified the hierarchy, and tightened the proof and CTA placement across the page.",
    deliverables: [
      "Homepage strategy",
      "Service page architecture",
      "Mobile-first responsive build",
      "Launch QA and tracking setup",
    ],
    imageAlt: "Abstract preview for a service website redesign",
  },
  {
    slug: "campaign-landing-page",
    label: "Campaign Landing Page",
    category: "Landing Page",
    summary:
      "A focused campaign page built to reduce distractions and keep the visitor moving toward one action.",
    result:
      "The page turned a broad message into a direct conversion path with a tighter narrative and fewer exits.",
    challenge:
      "The audience needed a fast answer and a clear reason to act without digging through the full website.",
    approach:
      "We designed the offer around a single goal, then used proof, FAQ, and CTA repetition to remove hesitation.",
    deliverables: [
      "Offer framing",
      "CTA system",
      "FAQ handling",
      "Analytics-ready build",
    ],
    imageAlt: "Abstract preview for a focused landing page build",
  },
  {
    slug: "startup-mvp",
    label: "Startup MVP",
    category: "Web App",
    summary:
      "A lightweight product presence with a structure that could grow without needing to be rebuilt from scratch.",
    result:
      "The interface was organized around the first critical tasks so the team could launch, learn, and iterate with less friction.",
    challenge:
      "The team needed something credible enough to launch but flexible enough to keep evolving.",
    approach:
      "We kept the experience compact, used reusable patterns, and made sure the structure supported future expansion.",
    deliverables: [
      "UX planning",
      "Reusable components",
      "Responsive build",
      "Handoff documentation",
    ],
    imageAlt: "Abstract preview for a startup MVP interface",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    summary:
      "We align on goals, audience, offer, and what the site actually needs to do.",
  },
  {
    title: "Define",
    summary:
      "We shape the page structure, key messages, and the conversion path before anything is designed.",
  },
  {
    title: "Design",
    summary:
      "We create a premium visual direction that feels deliberate, clear, and easy to trust.",
  },
  {
    title: "Build",
    summary:
      "We implement the site with mobile performance, accessibility, and maintainability in mind.",
  },
  {
    title: "QA",
    summary:
      "We review content, interactions, responsive behavior, and launch readiness before the site goes live.",
  },
  {
    title: "Launch",
    summary:
      "We deploy, verify the live experience, and make sure the conversion path works end to end.",
  },
  {
    title: "Support",
    summary:
      "We stay available for updates, refinements, and future pages once the site is live.",
  },
];

export const differentiators: Differentiator[] = [
  {
    title: "Built to convert",
    summary:
      "Every page is structured around action, not just aesthetics.",
  },
  {
    title: "Fast on mobile",
    summary:
      "The experience is designed to feel sharp and easy to use on smaller screens first.",
  },
  {
    title: "Clear process",
    summary:
      "Clients know what happens next, what we need, and what good looks like.",
  },
  {
    title: "Launch-ready QA",
    summary:
      "We pay attention to the details that keep a launch from feeling rushed.",
  },
  {
    title: "Tracking and measurement",
    summary:
      "The site is built to support analytics and future optimization from the start.",
  },
  {
    title: "Support after launch",
    summary:
      "The relationship does not have to stop once the site goes live.",
  },
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

export const timelineOptions = [
  "ASAP",
  "Within 30 Days",
  "1-3 Months",
  "3+ Months",
  "Just Exploring",
] as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}
