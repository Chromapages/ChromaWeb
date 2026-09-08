import {CmsPlaceholderPage} from "@/components/CmsPlaceholderPage";
import {fetchCmsPage} from "@/sanity/lib/fetchPage";
import {staticPageQuery} from "@/sanity/lib/queries";

type FixedCmsPageProps = {
  fallbackTitle: string;
  pageKey: "home" | "work" | "process" | "about" | "insights" | "contact";
  route: string;
};

export async function FixedCmsPage({fallbackTitle, pageKey, route}: FixedCmsPageProps) {
  const result = await fetchCmsPage(staticPageQuery, {key: pageKey});

  return <CmsPlaceholderPage fallbackTitle={fallbackTitle} route={route} result={result} />;
}
