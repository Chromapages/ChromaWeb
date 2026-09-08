"use client";

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

import {privacySettingsEvent, trackEvent, type AnalyticsEventName} from "@/lib/analytics";

const consentKey = "chromapages-analytics-consent-v1";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type ConsentChoice = "accepted" | "rejected";

function removeGoogleAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || (name !== "_ga" && !name.startsWith("_ga_"))) continue;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.chromapages.com; SameSite=Lax`;
  }
}

function initializeGoogleAnalytics(id: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", id, {send_page_view: false});

  if (document.querySelector(`script[data-ga-measurement-id="${id}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.dataset.gaMeasurementId = id;
  document.head.appendChild(script);
}

function disableGoogleAnalytics(id?: string) {
  if (id) Object.assign(window, {[`ga-disable-${id}`]: true});
  window.gtag = undefined;
  removeGoogleAnalyticsCookies();
}

function routeEvent(pathname: string): {name: AnalyticsEventName; params: Record<string, string>} | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "services" && parts[1]) return {name: "offer_view", params: {offer_slug: parts[1]}};
  if (parts[0] === "work" && parts[1]) {
    const proofClassification = document.querySelector<HTMLElement>("[data-proof-classification]")?.dataset.proofClassification;
    return {name: "case_study_view", params: {case_study_slug: parts[1], ...(proofClassification ? {proof_classification: proofClassification} : {})}};
  }
  if (parts[0] === "industries" && parts[1]) return {name: "industry_view", params: {industry_slug: parts[1]}};
  if (parts[0] === "insights" && parts[1]) return {name: "insight_view", params: {insight_slug: parts[1]}};
  if (pathname === "/contact") return {name: "project_fit_view", params: {page_path: pathname}};
  return null;
}

function AnalyticsConsentInner() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(consentKey);
    const savedConsent = savedChoice === "accepted" || savedChoice === "rejected" ? savedChoice : null;
    const update = window.setTimeout(() => setChoice(savedConsent), 0);
    return () => window.clearTimeout(update);
  }, []);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(privacySettingsEvent, openSettings);
    return () => window.removeEventListener(privacySettingsEvent, openSettings);
  }, []);

  useEffect(() => {
    if (choice !== "accepted" || !measurementId) return;
    Object.assign(window, {[`ga-disable-${measurementId}`]: false});
    initializeGoogleAnalytics(measurementId);
  }, [choice]);

  useEffect(() => {
    if (choice !== "accepted" || !measurementId) return;
    const pageLocation = `${window.location.origin}${pathname}`;
    trackEvent("page_view", {page_location: pageLocation, page_path: pathname});
    const contextualEvent = routeEvent(pathname);
    if (contextualEvent) trackEvent(contextualEvent.name, contextualEvent.params);
  }, [choice, pathname]);

  useEffect(() => {
    if (choice !== "accepted") return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      if (!target) return;
      if (target.dataset.analyticsEvent === "case_study_open") {
        trackEvent("case_study_open", {
          case_study_slug: target.dataset.analyticsCaseStudySlug ?? "unknown",
          ...(target.dataset.proofClassification ? {proof_classification: target.dataset.proofClassification} : {}),
        });
        return;
      }
      if (target.dataset.analyticsEvent !== "cta_click") return;
      trackEvent("cta_click", {
        cta_location: target.dataset.analyticsLocation ?? pathname,
        destination: target.dataset.analyticsDestination ?? pathname,
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [choice, pathname]);

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(consentKey, nextChoice);
    setChoice(nextChoice);
    setSettingsOpen(false);
    if (nextChoice === "rejected") disableGoogleAnalytics(measurementId);
  };

  const showPanel = choice === null || settingsOpen;

  return (
    <>
      {showPanel ? (
        <section aria-labelledby="analytics-consent-title" className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-2xl border border-ink bg-canvas p-5 shadow-2xl sm:p-6" role="region">
          <h2 id="analytics-consent-title" className="font-display text-xl font-semibold">Analytics privacy</h2>
          <p className="mt-3 text-sm leading-6 text-ink/75">Chromapages can use Google Analytics to understand anonymous site engagement. Analytics loads only if you accept, and form values are never sent.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo" onClick={() => saveChoice("accepted")} type="button">Accept analytics</button>
            <button className="rounded-lg border border-ink px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink hover:text-canvas" onClick={() => saveChoice("rejected")} type="button">Reject analytics</button>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function AnalyticsConsent() {
  const pathname = usePathname();

  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return null;
  }

  return <AnalyticsConsentInner />;
}
