import {isProofClassification, proofClassifications, type ProofClassification} from "@/lib/proofClassification";
import type {ValidationContext} from "sanity";
import {isProofSignalType} from "@/lib/proofHierarchy";
import {isCaseStudyMediaAnchor, isCaseStudyMediaRole} from "@/lib/caseStudyMedia";

export const publishingStatusOptions = [
  {title: "Draft", value: "draft"},
  {title: "In review", value: "inReview"},
  {title: "Approved", value: "approved"},
  {title: "Published ready", value: "publishedReady"},
];

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value as UnknownRecord : null;
}

function hasApprovedText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 && !value.trim().startsWith("[placeholder]");
}

function hasPortableText(value: unknown) {
  return Array.isArray(value) && value.length > 0;
}

function getPublishedDocumentId(value: unknown) {
  return typeof value === "string" ? value.replace(/^drafts\./, "") : null;
}

async function hasDuplicateWorkIndexValue(field: "workIndexFeatured" | "workIndexRank", value: boolean | number, context: ValidationContext) {
  const documentId = getPublishedDocumentId(context.document?._id);
  if (!documentId) return false;

  const duplicate = await context.getClient({apiVersion: "2025-02-19"})
    .withConfig({perspective: "raw"})
    .fetch<boolean>(
      `defined(*[_type == "caseStudy" && publishingStatus == "publishedReady" && ${field} == $value && !(_id in [$documentId, "drafts." + $documentId])][0]._id)`,
      {documentId, value},
      {tag: "validation.work-index-placement"},
    );

  return duplicate;
}

export async function validateWorkIndexFeatured(value: unknown, context: ValidationContext) {
  if (value !== true || context.document?.publishingStatus !== "publishedReady") return true;

  try {
    return await hasDuplicateWorkIndexValue("workIndexFeatured", true, context)
      ? "Only one published-ready case study can occupy the Selected Work featured placement."
      : true;
  } catch {
    return "The featured-placement check could not complete. Please retry before publishing.";
  }
}

export async function validateWorkIndexRank(value: unknown, context: ValidationContext) {
  if (context.document?.publishingStatus !== "publishedReady") return true;
  if (!Number.isInteger(value) || Number(value) < 1) return "Published-ready case studies require a positive Selected Work rank.";

  try {
    return await hasDuplicateWorkIndexValue("workIndexRank", Number(value), context)
      ? "Each published-ready case study needs a unique Selected Work rank."
      : true;
  } catch {
    return "The Selected Work rank check could not complete. Please retry before publishing.";
  }
}

function hasApprovedProofSignal(value: unknown) {
  if (!Array.isArray(value)) return false;

  return value.some((signal) => {
    const record = asRecord(signal);
    return Boolean(
      record
        && isProofSignalType(record.type)
        && record.verificationStatus === "approved"
        && hasApprovedText(record.publicStatement)
        && hasApprovedText(record.publicSourceContext)
        && hasApprovedText(record.timeframe)
        && hasApprovedText(record.measurementContext)
        && hasApprovedText(record.publicLimitations),
    );
  });
}

function hasApprovedImage(value: unknown) {
  const image = asRecord(value);
  return Boolean(
    image
      && image.asset
      && image.approvalStatus === "approved"
      && image.rightsConfirmed === true
      && hasApprovedText(image.alt),
  );
}

function hasApprovedCaseStudyMedia(value: unknown) {
  const image = asRecord(value);
  return Boolean(
    hasApprovedImage(value)
      && image
      && isCaseStudyMediaRole(image.mediaRole)
      && hasApprovedText(image.storytellingJob)
      && image.publicDisplayApproved === true
      && (isProofSignalType(image.proofSignalType) || isCaseStudyMediaAnchor(image.narrativeAnchor)),
  );
}

const permissionForClassification: Record<ProofClassification, string> = {
  "real-public-client": "public-client-permission",
  "confidential-client": "confidential-disclosure-approved",
  "white-label": "white-label-disclosure-approved",
  "concept-study": "classification-disclosure-approved",
  "internal-prototype": "classification-disclosure-approved",
  "owned-brand": "classification-disclosure-approved",
};

export function validateCaseStudyReadiness(value: unknown) {
  const document = asRecord(value);
  if (!document || document.publishingStatus !== "publishedReady") return true;

  if (!isProofClassification(document.classification)) return `Published-ready case studies require one of the approved classifications: ${proofClassifications.map(({studioTitle}) => studioTitle).join(", ")}.`;
  if (!hasApprovedText(document.publicTitle)) return "Published-ready case studies require an approved public title.";
  if (!hasApprovedText(document.publicProjectIdentity)) return "Published-ready case studies require an approved public project identity or descriptor.";
  if (!hasApprovedText(document.publicSummary)) return "Published-ready case studies require an approved public summary.";
  if (!hasApprovedText(document.publicRole)) return "Published-ready case studies require an approved public Chromapages role statement.";
  if (!Number.isInteger(document.workIndexRank) || Number(document.workIndexRank) < 1) return "Published-ready case studies require a positive Selected Work rank.";
  if (document.publicIdentityApproved !== true) return "Published-ready case studies require confirmation that the public title and identity are safe to disclose.";
  if (document.publicArtifactApproved !== true) return "Published-ready case studies require confirmation that every public artifact is approved for this classification.";
  if (document.proofReviewStatus !== "approved") return "Published-ready case studies require approved proof review.";
  if (!hasApprovedText(document.attributionLimitations)) return "Published-ready case studies require attribution limitations.";
  const expectedPermission = permissionForClassification[document.classification];
  if (!expectedPermission || document.permissionStatus !== expectedPermission) {
    return "Published-ready case studies require the permission or disclosure status that matches their classification.";
  }

  const requiredNarratives = ["scope", "challenge", "strategy", "build", "launch"];
  if (requiredNarratives.some((field) => !hasPortableText(document[field]))) {
    return "Published-ready case studies require Context, Challenge, Strategy, Build, and Launch narratives.";
  }
  if (!hasApprovedProofSignal(document.proofSignals)) {
    return "Published-ready case studies require at least one approved public proof signal with source, timeframe, measurement context, and limitations.";
  }
  if (!Array.isArray(document.relatedServices) || document.relatedServices.length === 0) return "Published-ready case studies require at least one related service.";
  if (Array.isArray(document.images) && document.images.some((image) => !hasApprovedCaseStudyMedia(image))) {
    return "Every public case-study asset needs approved rights, descriptive alternative text, a media role, storytelling job, approved display confirmation, and a proof or narrative anchor.";
  }

  return true;
}

export function validateEditorialReadiness(value: unknown) {
  const document = asRecord(value);
  if (!document || document.publishingStatus !== "publishedReady") return true;

  const title = document.title ?? document.name;
  if (!hasApprovedText(title)) return "Published-ready content requires an approved, non-placeholder title.";
  const slug = asRecord(document.slug);
  if (!hasApprovedText(slug?.current)) return "Published-ready content requires a slug.";
  if (!hasPortableText(document.content)) return "Published-ready content requires approved editorial content.";
  if (document.featuredImage && !hasApprovedImage(document.featuredImage)) {
    return "A featured image must have confirmed rights, approved editorial review, and non-placeholder alternative text.";
  }

  return true;
}

export function validateInsightReadiness(value: unknown) {
  const document = asRecord(value);
  if (!document || document.publishingStatus !== "publishedReady") return true;

  const editorialReadiness = validateEditorialReadiness(value);
  if (editorialReadiness !== true) return editorialReadiness;
  if (!hasApprovedText(document.summary)) return "Published-ready insights require an approved guide summary.";
  if (!hasApprovedText(document.publishedAt) || Number.isNaN(Date.parse(String(document.publishedAt)))) {
    return "Published-ready insights require a valid public publication date.";
  }

  return true;
}

export function validateIndustryDirectoryReadiness(value: unknown) {
  const document = asRecord(value);
  if (!document || !document.directoryStatus) return true;

  const directoryStatus = String(document.directoryStatus);
  if (!["featured", "listed", "comingSoon"].includes(directoryStatus)) return "Choose a valid directory status.";
  if (directoryStatus !== "comingSoon" && ["listEyebrow", "hook", "listDescription"].some((field) => !hasApprovedText(document[field]))) {
    return "Featured and listed industries require approved directory card copy.";
  }
  if (directoryStatus === "featured" && (!Number.isInteger(document.priorityRank) || Number(document.priorityRank) < 1)) {
    return "Featured industries require a positive priority rank.";
  }
  if (directoryStatus !== "comingSoon" && document.publishingStatus !== "publishedReady") {
    return "Featured and listed industries must be published ready before appearing in the directory.";
  }

  return true;
}

export function validateSeoReadiness(value: unknown) {
  const seo = asRecord(value);
  if (!seo || !hasApprovedText(seo.metaTitle) || !hasApprovedText(seo.metaDescription)) {
    return "Add an approved SEO title and description before publication.";
  }
  return true;
}
