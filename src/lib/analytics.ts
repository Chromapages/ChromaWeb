export const analyticsEvents = [
  "page_view",
  "cta_click",
  "offer_view",
  "case_study_view",
  "case_study_open",
  "industry_view",
  "industry_vertical_card_click",
  "industry_vertical_explore_click",
  "insight_view",
  "project_fit_view",
  "process_sequence_section_view",
  "process_sequence_cta_click",
] as const;

export const privacySettingsEvent = "chromapages:open-privacy-settings";

export type AnalyticsEventName = (typeof analyticsEvents)[number];

type AnalyticsParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const safeValue = /^[a-z0-9/_:.\-]+$/i;

function sanitizeParameters(parameters: AnalyticsParameters) {
  return Object.entries(parameters).reduce<AnalyticsParameters>((safeParameters, [key, value]) => {
    if (!safeValue.test(key)) return safeParameters;
    if (typeof value === "string") {
      const cleanValue = value.split("?")[0].slice(0, 120);
      if (safeValue.test(cleanValue)) safeParameters[key] = cleanValue;
      return safeParameters;
    }
    safeParameters[key] = value;
    return safeParameters;
  }, {});
}

export function trackEvent(name: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, sanitizeParameters(parameters));
}
