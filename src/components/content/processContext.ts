import {normalizeDifferentiators, type DifferentiatorItem, type DifferentiatorItemSource} from "./differentiators";

export type ProcessContextContent = {
  intro: string;
  standards: DifferentiatorItem[];
};

const standardPattern = /^\s*\d+[.)]\s*(.+?)\s*(?::|—|–)\s*(.+?)\s*$/;

/** Converts legacy approved Process prose into the reusable differentiator model. */
function parseLegacyProcessContext(detail?: string | null): ProcessContextContent {
  const lines = (detail ?? "").split(/\n+|(?=\s*\d+[.)]\s+[A-Z])/).map((line) => line.trim()).filter(Boolean);
  const firstStandardIndex = lines.findIndex((line) => standardPattern.test(line));

  if (firstStandardIndex === -1) return {intro: detail?.trim() ?? "", standards: []};

  const standards = lines.slice(firstStandardIndex).flatMap((line, index) => {
    const match = line.match(standardPattern);
    if (!match) return [];
    const title = match[1]?.trim();
    const description = match[2]?.trim();
    return title && description ? [{id: `legacy-operating-principle-${index + 1}`, order: index + 1, title, description}] : [];
  });

  return {
    intro: lines.slice(0, firstStandardIndex).join("\n"),
    standards,
  };
}

/** Prefer CMS-managed differentiators while preserving the approved legacy detail during migration. */
export function parseProcessContext({detail, intro, standards}: {detail?: string | null; intro?: string | null; standards?: DifferentiatorItemSource[] | null}): ProcessContextContent {
  const normalizedStandards = normalizeDifferentiators(standards);
  if (normalizedStandards.length) return {intro: intro?.trim() ?? "", standards: normalizedStandards};

  return parseLegacyProcessContext(detail);
}
