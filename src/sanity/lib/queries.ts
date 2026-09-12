import {defineQuery} from "next-sanity";
import {proofClassificationValues} from "@/lib/proofClassification";

const publicProofClassificationFilter = proofClassificationValues.map((classification) => `"${classification}"`).join(", ");
const publicCaseStudyMediaFilter = `rightsConfirmed == true
  && approvalStatus == "approved"
  && publicDisplayApproved == true
  && mediaRole in ["interface-crop", "before-after-comparison", "responsive-composition", "system-screen", "design-system-artifact", "code-performance-evidence", "process-diagram", "content-structure"]
  && defined(storytellingJob)
  && (proofSignalType in ["business-outcome", "client-evidence", "technical-proof", "process-proof", "craft-proof"] || narrativeAnchor in ["scope", "challenge", "strategy", "build", "launch"])`;

const completeCaseStudyFilter = `_type == "caseStudy"
  && publishingStatus == "publishedReady"
  && defined(slug.current)
  && classification in [${publicProofClassificationFilter}]
  && defined(publicTitle)
  && defined(publicProjectIdentity)
  && defined(publicSummary)
  && defined(publicRole)
  && defined(workIndexRank)
  && workIndexRank > 0
  && publicIdentityApproved == true
  && publicArtifactApproved == true
  && count(scope) > 0
  && count(challenge) > 0
  && count(strategy) > 0
  && count(build) > 0
  && count(launch) > 0
  && count(proofSignals[verificationStatus == "approved" && defined(type) && defined(publicStatement) && defined(publicSourceContext) && defined(timeframe) && defined(measurementContext) && defined(publicLimitations)]) > 0
  && defined(attributionLimitations)
  && count(relatedServices) > 0`;

const publicInsightFilter = `_type == "insight"
  && publishingStatus == "publishedReady"
  && defined(slug.current)
  && slug.current != "placeholder"
  && defined(title)
  && count(content) > 0`;

export const staticPageQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    "title": pageTitles[$key]
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    title,
    seo,
    "image": image{"url": asset->url, alt},
    hero,
    heroCta,
    problem,
    solution,
    standard,
    standardSteps,
    proof,
    offers,
    process,
    processSteps,
    industries,
    closingCta,
    closingCtaAction,
    "offerCards": *[_type == "offer"] | order(coalesce(order, 9999) asc, title asc) {
      title,
      "slug": slug.current,
      summary,
      investmentRange
    },
    "caseStudies": *[${completeCaseStudyFilter}] | order(_createdAt desc)[0...3] {
      "title": publicTitle,
      "slug": slug.current,
      classification
    },
    "industryCards": *[_type == "industry" && publishingStatus == "publishedReady" && slug.current != "placeholder"] | order(name asc) {
      "title": name,
      "slug": slug.current
    }
  }
`);

export const offerPageQuery = defineQuery(`
  *[_type == "offer" && slug.current == $slug][0]{
    title,
    seo,
    "slug": slug.current,
    summary,
    positioningStatement,
    outcomePrompt,
    shortTransformation,
    primaryGoal,
    bestFor,
    fitReasons,
    "problem": pt::text(problem),
    "solution": pt::text(solution),
    deliverables,
    investmentRange,
    investmentTiers[]{
      label,
      amount,
      description,
      timeline
    },
    timeline,
    deliverySteps,
    cta,
    "relatedIndustries": relatedIndustries[]->{
      "title": name,
      "slug": slug.current
    }
  }
`);

export const offerDirectoryQuery = defineQuery(`
  *[_type == "offer" && defined(slug.current)] | order(coalesce(order, 9999) asc, title asc){
    title,
    order,
    "image": image{"url": asset->url, alt},
    "slug": slug.current,
    summary,
    positioningStatement,
    outcomePrompt,
    shortTransformation,
    primaryGoal,
    bestFor,
    fitReasons,
    deliverables,
    investmentRange,
    investmentTiers[]{
      label,
      amount,
      description,
      timeline
    },
    timeline,
    cta
  }
`);

export const industryPageQuery = defineQuery(`
  *[_type == "industry" && publishingStatus == "publishedReady" && slug.current == $slug][0]{
    "title": name,
    "slug": slug.current
  }
`);

export const insightPageQuery = defineQuery(`
  *[_type == "insight" && publishingStatus == "publishedReady" && slug.current == $slug][0]{
    title,
    "slug": slug.current
  }
`);

export const processPageQuery = defineQuery(`
  *[_type == "processPage"][0]{
    title,
    seo,
    "introduction": pt::text(introduction),
    hero{
      eyebrow,
      headline,
      introduction,
      secondaryCtaLabel,
      secondaryCtaHref,
      "image": image{
        "url": asset->url,
        alt,
        caption
      }
    },
    steps,
    "detail": pt::text(detail),
    "operatingPrinciplesIntro": pt::text(operatingPrinciplesIntro),
    operatingPrinciples,
    whyItMatters{
      eyebrow,
      headline,
      introduction,
      ctaLabel,
      ctaHref,
      items[]{
        title,
        description,
        "icon": icon{
          "url": asset->url,
          alt
        }
      }
    },
    workingTogether{
      eyebrow,
      headline,
      introduction,
      ctaLabel,
      ctaHref,
      sharedGoalLabel,
      sharedGoalText,
      roles[]{
        label,
        detail,
        "icon": icon{
          "url": asset->url,
          alt
        }
      },
      responsibilities[]{
        title,
        detail,
        studio,
        team,
        together
      },
      summaryTitle,
      summaryText,
      highlights,
      summaryCtaLabel,
      summaryCtaHref
    },
    launchConfidence,
    afterLaunch,
    cta
  }
`);

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    title,
    seo,
    "introduction": pt::text(introduction),
    principles,
    "detail": pt::text(detail),
    cta
  }
`);

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0]{
    title,
    seo,
    "introduction": pt::text(introduction),
    formNotice,
    cta
  }
`);

export const industryDetailQuery = defineQuery(`
  *[_type == "industry" && publishingStatus == "publishedReady" && slug.current == $slug][0]{
    "title": name,
    seo,
    "slug": slug.current,
    "buyerProblems": pt::text(buyerProblems),
    "positioning": pt::text(positioning),
    "content": pt::text(content),
    cta,
    "services": services[]->{
      title,
      "slug": slug.current,
      summary
    },
    "relatedCaseStudies": *[${completeCaseStudyFilter} && _id in ^.relatedCaseStudies[]._ref] | order(_createdAt desc) {
      "title": publicTitle,
      "slug": slug.current,
      classification,
      "projectIdentity": publicProjectIdentity,
      "description": publicSummary
    }
  }
`);

export const industrySlugsQuery = defineQuery(`
  *[_type == "industry" && publishingStatus == "publishedReady" && slug.current != "placeholder"]{
    "slug": slug.current
  }
`);

export const industryDirectoryQuery = defineQuery(`
  *[_type == "industry" && directoryStatus in ["featured", "listed", "comingSoon"]]
    | order(select(directoryStatus == "featured" => 0, 1) asc, priorityRank asc, name asc){
      "id": _id,
      "title": name,
      "slug": select(publishingStatus == "publishedReady" => slug.current, null),
      directoryStatus,
      priorityRank,
      listEyebrow,
      hook,
      listDescription,
      conversionGoals
    }
`);

export const insightsPageQuery = defineQuery(`
  *[_type == "insightsPage"][0]{
    title,
    introduction,
    "heroImage": select(
      heroImage.approvalStatus == "approved" && heroImage.rightsConfirmed == true => heroImage{
        "url": asset->url,
        alt
      }
    ),
    featuredHeading,
    "featuredInsightId": featuredInsight._ref,
    latestHeading,
    emptyStateHeading,
    emptyStateBody,
    ctaHeading,
    cta,
    seo
  }
`);

export const insightsIndexQuery = defineQuery(`
  *[${publicInsightFilter}] | order(publishedAt desc, _createdAt desc){
    "id": _id,
    title,
    "slug": slug.current,
    category,
    author,
    summary,
    publishedAt,
    "body": pt::text(content),
    "featuredImage": select(
      featuredImage.approvalStatus == "approved" && featuredImage.rightsConfirmed == true => featuredImage{
        "url": asset->url,
        alt,
        approvalStatus,
        rightsConfirmed,
        crop,
        hotspot,
        "dimensions": asset->metadata.dimensions
      }
    )
  }
`);

export const insightDetailQuery = defineQuery(`
  *[${publicInsightFilter} && slug.current == $slug][0]{
    "id": _id,
    title,
    "slug": slug.current,
    category,
    author,
    summary,
    publishedAt,
    content,
    seo,
    "featuredImage": featuredImage{
      "url": asset->url,
      alt,
      caption
    },
    "relatedOffers": relatedOffers[]->{
      title,
      "slug": slug.current
    }
  }
`);

export const insightSlugsQuery = defineQuery(`
  *[${publicInsightFilter}]{
    "slug": slug.current
  }
`);

export const workIndexQuery = defineQuery(`
  *[${completeCaseStudyFilter}] | order(workIndexFeatured desc, workIndexRank asc, _createdAt desc) {
    "title": publicTitle,
    "slug": slug.current,
    classification,
    workIndexFeatured,
    workIndexRank,
    "projectIdentity": publicProjectIdentity,
    "role": publicRole,
    "challenge": pt::text(challenge),
    "strategy": pt::text(strategy),
    "proofSignals": proofSignals[verificationStatus == "approved"]{
      type,
      "statement": publicStatement,
      "sourceContext": publicSourceContext,
      timeframe,
      measurementContext,
      "limitations": publicLimitations
    },
    "relatedServices": relatedServices[]->{
      title,
      "slug": slug.current
    },
    "image": images[${publicCaseStudyMediaFilter}][0]{
      "url": asset->url,
      alt,
      mediaRole,
      storytellingJob,
      proofSignalType,
      narrativeAnchor
    }
  }
`);

export const caseStudyBySlugQuery = defineQuery(`
  *[${completeCaseStudyFilter} && slug.current == $slug][0] {
    "title": publicTitle,
    seo,
    "slug": slug.current,
    classification,
    "projectIdentity": publicProjectIdentity,
    "role": publicRole,
    "description": publicSummary,
    "scope": pt::text(scope),
    "challenge": pt::text(challenge),
    "strategy": pt::text(strategy),
    "build": pt::text(build),
    "launch": pt::text(launch),
    nextStage,
    "proofSignals": proofSignals[verificationStatus == "approved"]{
      type,
      "statement": publicStatement,
      "sourceContext": publicSourceContext,
      timeframe,
      measurementContext,
      "limitations": publicLimitations
    },
    attributionLimitations,
    "images": images[${publicCaseStudyMediaFilter}]{
      "url": asset->url,
      alt,
      caption,
      mediaRole,
      storytellingJob,
      proofSignalType,
      narrativeAnchor
    },
    "relatedServices": relatedServices[]->{
      title,
      "slug": slug.current
    }
  }
`);

export const siteSeoQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    title,
    pageTitles,
    defaultSeo,
    "logo": logo.asset->url,
    "favicon": favicon.asset->url
  }
`);

export const sitemapContentQuery = defineQuery(`{
  "industries": *[_type == "industry" && publishingStatus == "publishedReady" && slug.current != "placeholder"]{"slug": slug.current, _updatedAt},
  "insights": *[${publicInsightFilter}]{"slug": slug.current, _updatedAt},
  "caseStudies": *[${completeCaseStudyFilter}]{"slug": slug.current, _updatedAt}
}`);

export const caseStudySlugsQuery = defineQuery(`
  *[${completeCaseStudyFilter}] {
    "slug": slug.current
  }
`);
