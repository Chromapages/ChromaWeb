export type ProcessStepIndustryOverride = {
  industrySlug?: string | null;
  title?: string | null;
  description?: string | null;
  proofPoints?: Array<string | null> | null;
};

export type ProcessStepSource = {
  _key?: string | null;
  id?: string | null;
  order?: number | null;
  title?: string | null;
  description?: string | null;
  proofPoints?: Array<string | null> | null;
  industryOverrides?: ProcessStepIndustryOverride[] | null;
};

import type {OrderedContentItem} from "./orderedContent";

export type ProcessStep = OrderedContentItem & {
  proofPoints: string[];
};

const legacyProofPoints = [
  {pattern: /32-point technical gating|28-point pre-flight launch qa/i, label: "28-point pre-flight launch QA"},
  {pattern: /sub-0\.8s lcp|<0\.8s lcp target/i, label: "<0.8s LCP target"},
  {pattern: /zero layout shifts|cls\s*<\s*0\.05/i, label: "CLS < 0.05 target"},
  {pattern: /wcag 2\.2 aa/i, label: "WCAG 2.2 AA target"},
  {pattern: /dns cutover checks/i, label: "DNS cutover checks"},
];

function cleanString(value?: string | null) {
  return value?.trim() ?? "";
}

function cleanProofPoints(proofPoints?: Array<string | null> | null) {
  return [...new Set((proofPoints ?? []).map(cleanString).filter(Boolean))];
}

function legacyProofPointsFor(description: string) {
  return legacyProofPoints.filter((proofPoint) => proofPoint.pattern.test(description)).map((proofPoint) => proofPoint.label);
}

function findIndustryOverride(step: ProcessStepSource, industrySlug?: string | null) {
  const slug = cleanString(industrySlug).toLowerCase();
  if (!slug) return undefined;
  return step.industryOverrides?.find((override) => cleanString(override.industrySlug).toLowerCase() === slug);
}

/**
 * Produces complete, ordered Process records. Legacy CMS records keep rendering
 * while editors migrate them; new records always supply explicit proof points.
 */
export function normalizeProcessSteps(steps?: ProcessStepSource[] | null, industrySlug?: string | null): ProcessStep[] {
  return (steps ?? [])
    .map((source, index) => {
      const override = findIndustryOverride(source, industrySlug);
      const title = cleanString(override?.title || source.title);
      const description = cleanString(override?.description || source.description);
      const id = cleanString(source.id || source._key) || `process-step-${index + 1}`;
      const order = Number.isInteger(source.order) && (source.order ?? 0) > 0 ? source.order as number : index + 1;
      const explicitProofPoints = cleanProofPoints(override?.proofPoints ?? source.proofPoints);

      if (!title || !description) return null;

      return {
        id,
        order,
        title,
        description,
        proofPoints: explicitProofPoints.length ? explicitProofPoints : legacyProofPointsFor(description),
      };
    })
    .filter((step): step is ProcessStep => step !== null)
    .sort((first, second) => first.order - second.order || first.id.localeCompare(second.id));
}

export function getSequenceGridClassName(stepCount: number) {
  if (stepCount === 3 || stepCount >= 5) return "md:grid-cols-2 lg:grid-cols-3";
  return "md:grid-cols-2";
}
