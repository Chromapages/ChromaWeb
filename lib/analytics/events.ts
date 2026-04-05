export type AnalyticsEvent = {
  name: string;
  location?: string;
  label?: string;
  destination?: string;
  pagePath?: string;
  pageType?: string;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  schedulerName?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event.name,
    ...event,
  });
}

export function trackCTAClick({
  label,
  location,
  destination,
  pagePath,
  pageType,
}: Omit<AnalyticsEvent, "name">) {
  trackEvent({
    name: "click_cta",
    label,
    location,
    destination,
    pagePath,
    pageType,
  });
}
