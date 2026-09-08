import type {CaseStudyData} from "@/components/work/CaseStudyPage";
import type {WorkCard} from "@/components/work/WorkIndex";

import {fetchSanity} from "./fetchPage";
import {caseStudyBySlugQuery, caseStudySlugsQuery, workIndexQuery} from "./queries";

export function getWorkIndex() {
  return fetchSanity<WorkCard[]>(workIndexQuery);
}

export function getCaseStudy(slug: string) {
  return fetchSanity<CaseStudyData>(caseStudyBySlugQuery, {slug});
}

export function getCaseStudySlugs() {
  return fetchSanity<Array<{slug?: string | null}>>(caseStudySlugsQuery);
}
