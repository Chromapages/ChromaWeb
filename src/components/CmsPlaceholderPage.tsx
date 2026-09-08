import {PublicPageUnavailable} from "@/components/content/PagePrimitives";

type CmsPlaceholderPageProps = {
  fallbackTitle: string;
  route?: string;
  result?: unknown;
};

export function CmsPlaceholderPage({fallbackTitle}: CmsPlaceholderPageProps) {
  return <PublicPageUnavailable title={`${fallbackTitle} is unavailable right now.`} />;
}
