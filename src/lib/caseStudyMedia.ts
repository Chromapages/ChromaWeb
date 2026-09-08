import {getProofSignalType, isProofSignalType} from "./proofHierarchy";

export const caseStudyMediaRoles = [
  {value: "interface-crop", label: "Interface crop"},
  {value: "before-after-comparison", label: "Before/after comparison"},
  {value: "responsive-composition", label: "Responsive composition"},
  {value: "system-screen", label: "System screen"},
  {value: "design-system-artifact", label: "Design-system artifact"},
  {value: "code-performance-evidence", label: "Code/performance evidence"},
  {value: "process-diagram", label: "Process diagram"},
  {value: "content-structure", label: "Content structure"},
] as const;

export const caseStudyMediaAnchors = [
  {value: "scope", label: "Scope"},
  {value: "challenge", label: "Challenge"},
  {value: "strategy", label: "Strategy"},
  {value: "build", label: "Build"},
  {value: "launch", label: "Launch"},
] as const;

export type CaseStudyMediaRole = (typeof caseStudyMediaRoles)[number]["value"];
export type CaseStudyMediaAnchor = (typeof caseStudyMediaAnchors)[number]["value"];

export type CaseStudyMedia = {
  url?: string | null;
  alt?: string | null;
  caption?: string | null;
  mediaRole?: string | null;
  storytellingJob?: string | null;
  proofSignalType?: string | null;
  narrativeAnchor?: string | null;
};

export type PublicCaseStudyMedia = CaseStudyMedia & {
  url: string;
  mediaRole: CaseStudyMediaRole;
  storytellingJob: string;
};

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

export function isCaseStudyMediaRole(value: unknown): value is CaseStudyMediaRole {
  return typeof value === "string" && caseStudyMediaRoles.some((role) => role.value === value);
}

export function isCaseStudyMediaAnchor(value: unknown): value is CaseStudyMediaAnchor {
  return typeof value === "string" && caseStudyMediaAnchors.some((anchor) => anchor.value === value);
}

export function getCaseStudyMediaRole(value: string | null | undefined) {
  return caseStudyMediaRoles.find((role) => role.value === value);
}

export function isPublicCaseStudyMedia(media: CaseStudyMedia): media is PublicCaseStudyMedia {
  return Boolean(
    hasText(media.url)
      && isCaseStudyMediaRole(media.mediaRole)
      && hasText(media.storytellingJob)
      && (isProofSignalType(media.proofSignalType) || isCaseStudyMediaAnchor(media.narrativeAnchor)),
  );
}

export function sortCaseStudyMedia<T extends CaseStudyMedia>(media: T[]) {
  return [...media].sort((left, right) => {
    const leftProofRank = getProofSignalType(left.proofSignalType)?.rank ?? Number.MAX_SAFE_INTEGER;
    const rightProofRank = getProofSignalType(right.proofSignalType)?.rank ?? Number.MAX_SAFE_INTEGER;
    if (leftProofRank !== rightProofRank) return leftProofRank - rightProofRank;

    const leftAnchor = caseStudyMediaAnchors.findIndex((anchor) => anchor.value === left.narrativeAnchor);
    const rightAnchor = caseStudyMediaAnchors.findIndex((anchor) => anchor.value === right.narrativeAnchor);
    return leftAnchor - rightAnchor;
  });
}
