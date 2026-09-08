"use client";

import Link from "next/link";

import {trackEvent} from "@/lib/analytics";

type IndustryExploreLinkProps = {href: string; title: string; verticalId: string; position: number};

export function IndustryExploreLink({href, title, verticalId, position}: IndustryExploreLinkProps) {
  const trackExplore = () => {
    const parameters = {vertical_id: verticalId, position};
    trackEvent("industry_vertical_card_click", parameters);
    trackEvent("industry_vertical_explore_click", parameters);
  };

  return <Link className="inline-flex items-center gap-2 font-display text-sm font-semibold text-teal hover:text-indigo focus-visible:outline-2 focus-visible:outline-teal" href={href} onClick={trackExplore}>Explore {title} Architecture →</Link>;
}
