export const proofClassifications = [
  {value: "real-public-client", studioTitle: "Real public work", publicLabel: "Real public work", identityRule: "approved-client-identity"},
  {value: "confidential-client", studioTitle: "Confidential work", publicLabel: "Confidential work", identityRule: "approved-generic-descriptor"},
  {value: "white-label", studioTitle: "White-label work", publicLabel: "White-label work", identityRule: "approved-generic-descriptor"},
  {value: "concept-study", studioTitle: "Concept work", publicLabel: "Concept work", identityRule: "non-client-disclosure"},
  {value: "internal-prototype", studioTitle: "Prototype work", publicLabel: "Prototype work", identityRule: "non-client-disclosure"},
  {value: "owned-brand", studioTitle: "Owned-brand work", publicLabel: "Owned-brand work", identityRule: "non-client-disclosure"},
] as const;

export type ProofClassification = (typeof proofClassifications)[number]["value"];

export const proofClassificationValues = proofClassifications.map(({value}) => value) as ProofClassification[];

export function isProofClassification(value: unknown): value is ProofClassification {
  return typeof value === "string" && proofClassificationValues.includes(value as ProofClassification);
}

export function getProofClassification(value?: string | null) {
  return proofClassifications.find((classification) => classification.value === value);
}

export function getProofClassificationLabel(value?: string | null) {
  return getProofClassification(value)?.publicLabel ?? "Work classification";
}

export function getCaseStudyMetadataTitle(title?: string | null, classification?: string | null) {
  const label = getProofClassificationLabel(classification);
  return title ? `${title} | ${label}` : label;
}
