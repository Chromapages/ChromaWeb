import type {QueryParams} from "next-sanity";

import {sanityClient} from "./client";

export type CmsPageData = {
  title: string | null;
  slug?: string | null;
};

export type CmsPageResult = {
  data: CmsPageData | null;
  status: "connected" | "empty" | "unconfigured" | "unavailable";
};

export type CmsFetchResult<T> = {
  data: T | null;
  status: CmsPageResult["status"];
};

export async function fetchSanity<T>(
  query: string,
  params: QueryParams = {},
): Promise<CmsFetchResult<T>> {
  if (!sanityClient) {
    return {data: null, status: "unconfigured"};
  }

  try {
    const data = await sanityClient.fetch<T | null>(query, params, {
      next: {revalidate: 60},
    });

    return {data, status: data ? "connected" : "empty"};
  } catch (error) {
    console.error("Sanity page query failed", error);
    return {data: null, status: "unavailable"};
  }
}

export function fetchCmsPage(query: string, params: QueryParams = {}): Promise<CmsPageResult> {
  return fetchSanity<CmsPageData>(query, params);
}
