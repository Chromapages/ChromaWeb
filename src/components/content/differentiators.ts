import type {OrderedContentItem} from "./orderedContent";

export type DifferentiatorItem = OrderedContentItem & {
  proofLink?: string;
};

export type DifferentiatorItemSource = {
  _key?: string | null;
  id?: string | null;
  order?: number | null;
  title?: string | null;
  description?: string | null;
  proofLink?: string | null;
};

function cleanString(value?: string | null) {
  return value?.trim() ?? "";
}

/**
 * Produces complete, ordered differentiator records. The generated legacy id
 * is only used until an editor supplies the CMS-required stable id.
 */
export function normalizeDifferentiators(items?: DifferentiatorItemSource[] | null): DifferentiatorItem[] {
  const normalizedItems: Array<DifferentiatorItem | null> = (items ?? [])
    .map((source, index) => {
      const title = cleanString(source.title);
      const description = cleanString(source.description);

      if (!title || !description) return null;

      return {
        id: cleanString(source.id || source._key) || `differentiator-${index + 1}`,
        order: Number.isInteger(source.order) && (source.order ?? 0) > 0 ? source.order as number : index + 1,
        title,
        description,
        proofLink: cleanString(source.proofLink) || undefined,
      };
    })
  return normalizedItems
    .filter((item): item is DifferentiatorItem => item !== null)
    .sort((first, second) => first.order - second.order || first.id.localeCompare(second.id));
}
