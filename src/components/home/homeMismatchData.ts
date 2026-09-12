export type HomeMismatchData = {
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
};

export const consequencePillars = [
  {
    number: "01",
    label: "Perception Friction",
    headline: "Authority & Credibility Gap",
    description:
      "When the visual and technical experience underrepresents real-world capabilities, the firm can appear less established, generic, or interchangeable with lower-tier competitors.",
    evidence: "First impressions fail to reflect true market standing and partner depth.",
  },
  {
    number: "02",
    label: "Clarity Friction",
    headline: "Evolved Offer Confusion",
    description:
      "As offerings mature toward advisory, specialized solutions, and higher-value packages, legacy site copy and cluttered structure obscure what actually makes you valuable.",
    evidence: "Qualified buyers default to comparing on price rather than specialized capability.",
  },
  {
    number: "03",
    label: "Action Friction",
    headline: "Obstacles in the Path to Action",
    description:
      "Unclear consultation pathways, cluttered intake forms, and mobile friction introduce doubt precisely when high-intent prospects are ready to take the next step.",
    evidence: "Valuable customer intent is lost between initial interest and commercial engagement.",
  },
];

export const recognitionTriggers = [
  "Advisory repositioning",
  "Higher pricing tiers",
  "New service rollouts",
  "Multi-location expansion",
  "Paid traffic & campaigns",
  "Leadership frustration",
];

export function resolveHomeMismatchContent(section?: HomeMismatchData | null) {
  return {
    headline:
      section?.title ?? "The website may still be introducing the company you used to be.",
    bodyText:
      section?.body ??
      "Service businesses evolve rapidly—refining their positioning, raising rates, expanding client value, and building hard-earned reputations. When the digital presence fails to keep pace, it creates friction before the first conversation even begins.",
  };
}
