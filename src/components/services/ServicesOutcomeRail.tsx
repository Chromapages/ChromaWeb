"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ChromaEdge } from "@/components/ui/ChromaEdge";
import { ProjectMediaFrame } from "@/components/work/CaseStudyMedia";
import { getClassificationLabel } from "@/components/work/classification";
import type { WorkCard } from "@/components/work/WorkIndex";
import { isPublicCaseStudyMedia } from "@/lib/caseStudyMedia";
import { selectPrimaryProofSignal } from "@/lib/proofHierarchy";

import type { ServicesEngagement } from "./servicesData";

/** Gap between cards in px — must match gap-3 (12px) in the scroll container. */
const CARD_GAP_PX = 12;

/** Card occupies 84% of container width — must match w-[84%] on card divs. */
const CARD_WIDTH_RATIO = 0.84;

/** Distance threshold (px) — drag beyond this advances a card. */
const DISTANCE_THRESHOLD = 40;

/** IntersectionObserver threshold — card must be this visible to become active. */
const VISIBILITY_THRESHOLD = 0.6;

type ServicesOutcomeRailProps = {
  engagements: ServicesEngagement[];
  caseStudies?: WorkCard[] | null;
};

export const ServicesOutcomeRail = ({ engagements, caseStudies }: ServicesOutcomeRailProps) => {
  const [selectedSlug, setSelectedSlug] = useState(engagements[0]?.slug ?? "");
  const [proofIndex, setProofIndex] = useState(0);
  const selected = engagements.find((e) => e.slug === selectedSlug) ?? engagements[0];
  const relatedProofs = (caseStudies ?? []).filter((caseStudy) =>
    caseStudy.slug && caseStudy.relatedServices?.some((service) => service?.slug === selected?.slug),
  );
  const activeProof = relatedProofs[proofIndex] ?? relatedProofs[0];

  const carouselRef = useRef<HTMLDivElement>(null);

  const pointerDownXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const isPointerDraggingRef = useRef<boolean>(false);

  // ── IntersectionObserver: reliable active-card sync on mobile scroll/snap ─
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Desktop grid displays all cards simultaneously; only sync active card when scrollable
        if (container.scrollWidth <= container.clientWidth) return;
        const visible = entries.find(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_THRESHOLD,
        );
        if (!visible) return;
        const index = Array.from(container.children).indexOf(visible.target as HTMLElement);
        if (index >= 0 && engagements[index]) {
          setSelectedSlug(engagements[index].slug);
        }
      },
      { root: container, threshold: VISIBILITY_THRESHOLD },
    );

    Array.from(container.children).forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [engagements]);

  const [prevSelectedSlug, setPrevSelectedSlug] = useState(selectedSlug);
  if (selectedSlug !== prevSelectedSlug) {
    setPrevSelectedSlug(selectedSlug);
    setProofIndex(0);
  }

  if (!selected) return null;

  /** Card width including trailing gap — matches w-[84%] + gap-3. */
  const getCardWidth = (): number => {
    if (!carouselRef.current) return 0;
    return carouselRef.current.offsetWidth * CARD_WIDTH_RATIO + CARD_GAP_PX;
  };

  /** Scroll so card at `index` aligns to the left snap point on mobile. */
  const scrollToCard = (index: number) => {
    const container = carouselRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;
    container.scrollTo({ left: index * getCardWidth(), behavior: "smooth" });
  };

  // ── Dot-tap / radio-select ──────────────────────────────────────────────────
  const handleSelect = (slug: string, index: number) => {
    setSelectedSlug(slug);
    scrollToCard(index);
  };

  // ── Unified pointer handlers (touch + mouse via Pointer Events API) ─────────

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = carouselRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;
    pointerDownXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    isPointerDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = carouselRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;

    if (!isPointerDraggingRef.current) {
      if (Math.abs(pointerDownXRef.current - e.clientX) > 6) {
        isPointerDraggingRef.current = true;
        container.setPointerCapture(e.pointerId);
      } else {
        return;
      }
    }

    const dx = lastXRef.current - e.clientX;
    container.scrollLeft += dx;
    lastXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = carouselRef.current;
    if (!container) return;

    if (container.hasPointerCapture(e.pointerId)) {
      container.releasePointerCapture(e.pointerId);
    }

    if (!isPointerDraggingRef.current) {
      return;
    }
    isPointerDraggingRef.current = false;

    const totalDx = pointerDownXRef.current - e.clientX;
    const cardWidth = getCardWidth();
    if (cardWidth === 0) return;

    const currentIndex = Math.round(container.scrollLeft / cardWidth);

    if (Math.abs(totalDx) > DISTANCE_THRESHOLD) {
      // Drag past threshold → advance one card in swipe direction
      const next =
        totalDx > 0
          ? Math.min(currentIndex + 1, engagements.length - 1)
          : Math.max(currentIndex - 1, 0);
      scrollToCard(next);
    } else {
      // Short drag → snap back to nearest card
      scrollToCard(currentIndex);
    }
  };

  return (
    <section aria-labelledby="outcome-pathways-title" className="bg-canvas pt-12 pb-6 lg:pt-16 lg:pb-8 w-full overflow-x-clip">
      <div className="mx-auto w-full max-w-[112rem] px-5 sm:px-8 lg:px-12 2xl:px-20">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">Outcome Pathways</p>
              <span aria-hidden="true" className="h-px w-10 bg-teal/40" />
            </div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-[-0.04em] text-ink sm:text-4xl lg:text-5xl" id="outcome-pathways-title">
              Start with what needs to change.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-ink/70 lg:justify-self-end">
            Choose the situation closest to yours. See the engagement designed around it.
          </p>
        </div>

        <fieldset className="mt-8 w-full min-w-0 max-w-full overflow-hidden border-0 p-0 xl:hidden">
          <legend className="sr-only">Choose the business outcome closest to your situation</legend>
          <div
            className="flex w-full min-w-0 max-w-full gap-3 overflow-x-auto overscroll-x-contain pb-3 pt-1 sm:grid sm:grid-cols-2 xl:grid-cols-4 sm:overflow-visible sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory select-none sm:select-auto cursor-grab active:cursor-grabbing sm:cursor-default [touch-action:pan-y]"
            onPointerCancel={handlePointerUp}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            ref={carouselRef}
          >
            {engagements.map((engagement, index) => {
              const inputId = "mobile-outcome-" + engagement.slug;
              const isSelected = engagement.slug === selected.slug;
              return (
                <div className="relative w-[84%] min-w-[84%] max-w-[84%] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink" key={engagement.slug}>
                  <input
                    checked={isSelected}
                    className="peer sr-only"
                    id={inputId}
                    name="service-outcome-mobile"
                    onChange={() => handleSelect(engagement.slug, index)}
                    type="radio"
                    value={engagement.slug}
                  />
                  <label
                    className={"relative flex h-full min-h-36 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border p-5 transition-[background-color,border-color,color] duration-200 motion-reduce:transition-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal " + (
                      isSelected
                        ? "border-ink bg-ink text-canvas"
                        : "border-ink/15 bg-paper text-ink hover:border-teal"
                    )}
                    htmlFor={inputId}
                    onClick={() => handleSelect(engagement.slug, index)}
                  >
                    {isSelected ? <ChromaEdge dark /> : null}
                    <div className="flex items-center justify-between">
                      <span className={"font-display text-xl font-semibold " + (isSelected ? "text-indigo-400" : "text-indigo/65")}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={"text-[10px] font-semibold tracking-wider uppercase sm:hidden " + (isSelected ? "text-teal-300" : "text-ink/50")}>
                        {isSelected ? "Active Choice" : "Tap to select"}
                      </span>
                    </div>
                    <span className="mt-4 max-w-[17rem] font-display text-base font-bold leading-snug">{engagement.outcomePrompt}</span>
                    <span aria-hidden="true" className={"mt-4 text-xl " + (isSelected ? "text-teal-400" : "text-teal")}>→</span>
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div aria-label="Outcome pathways pagination" className="mt-2 flex items-center justify-center gap-1 sm:hidden" role="tablist">
          {engagements.map((engagement, index) => {
            const isSelected = engagement.slug === selected.slug;
            return (
              <button
                aria-label={`Select option ${index + 1}: ${engagement.name}`}
                aria-selected={isSelected}
                className="inline-flex min-h-11 min-w-11 items-center justify-center p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                key={engagement.slug}
                onClick={() => handleSelect(engagement.slug, index)}
                role="tab"
                type="button"
              >
                <span
                  className={"block h-2 rounded-full transition-all duration-300 " + (
                    isSelected ? "w-7 bg-teal" : "w-2 bg-ink/25 hover:bg-ink/40"
                  )}
                />
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">Recommended engagement: {selected.name}.</p>

        <div className="mt-8 hidden grid-cols-[20rem_minmax(0,1fr)] overflow-hidden rounded-2xl border border-ink/15 bg-paper shadow-xs xl:grid">
          <fieldset className="flex min-w-0 flex-col border-0 border-r border-ink/15 p-0">
            <legend className="sr-only">Choose the business outcome closest to your situation</legend>
            {engagements.map((engagement, index) => {
              const inputId = "desktop-outcome-" + engagement.slug;
              const isSelected = engagement.slug === selected.slug;

              return (
                <div className="relative flex flex-1 border-b border-ink/15 last:border-b-0" key={engagement.slug}>
                  <input
                    checked={isSelected}
                    className="peer sr-only"
                    id={inputId}
                    name="service-outcome-desktop"
                    onChange={() => handleSelect(engagement.slug, index)}
                    type="radio"
                    value={engagement.slug}
                  />
                  <label
                    className={"relative flex h-full w-full min-h-[7.5rem] cursor-pointer flex-col justify-center px-7 py-5 transition-colors duration-200 motion-reduce:transition-none peer-focus-visible:outline-2 peer-focus-visible:outline-inset peer-focus-visible:outline-teal " + (
                      isSelected
                        ? "bg-ink text-canvas"
                        : "bg-paper text-ink hover:bg-canvas"
                    )}
                    htmlFor={inputId}
                  >
                    {isSelected ? <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-teal" /> : null}
                    <span className={"text-xs font-semibold tracking-[0.12em] " + (isSelected ? "text-teal-300" : "text-indigo")}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-3 flex items-center justify-between gap-4">
                      <span className="font-display text-xl font-bold tracking-[-0.035em]">{engagement.name}</span>
                      <span aria-hidden="true" className={"text-2xl leading-none " + (isSelected ? "text-canvas" : "text-teal")}>›</span>
                    </span>
                    <span className={"mt-2 line-clamp-2 text-sm leading-5 " + (isSelected ? "text-canvas/65" : "text-ink/60")}>{engagement.outcomePrompt}</span>
                  </label>
                </div>
              );
            })}
          </fieldset>

          <div className="flex min-w-0 flex-col">
            <article aria-labelledby="desktop-recommended-engagement-title" className="relative min-w-0 overflow-hidden">
              <ChromaEdge />
              <div className={selected.optionalMedia ? "grid min-h-full grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]" : "min-h-full"}>
                <div className="px-10 pt-8 pb-0 2xl:px-12 2xl:pt-10">
                  <div className="flex items-center justify-between gap-6">
                    <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">{String(engagements.findIndex((engagement) => engagement.slug === selected.slug) + 1).padStart(2, "0")} / {String(engagements.length).padStart(2, "0")}</p>
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-indigo uppercase">Recommended engagement</p>
                  </div>

                  <h3 className="mt-5 font-display text-5xl font-extrabold leading-none tracking-[-0.055em] text-ink 2xl:text-6xl" id="desktop-recommended-engagement-title">{selected.name}</h3>
                  {selected.shortTransformation ? <p className="mt-4 max-w-4xl text-sm font-semibold leading-6 tracking-[0.12em] text-teal uppercase">{selected.shortTransformation}</p> : null}
                  {selected.shortDescription ? <p className="mt-6 max-w-4xl text-base leading-7 text-ink/70 2xl:text-lg 2xl:leading-8">{selected.shortDescription}</p> : null}

                  <dl className="mt-8 grid grid-cols-3 divide-x divide-ink/15 border-y border-ink/15 py-5">
                    {selected.bestFor ? <div className="pr-6"><dt className="text-[10px] font-semibold tracking-[0.16em] text-teal uppercase">Best when</dt><dd className="mt-2 line-clamp-3 text-sm leading-6 text-ink/70">{selected.bestFor}</dd></div> : <div />}
                    {selected.timeline ? <div className="px-6"><dt className="text-[10px] font-semibold tracking-[0.16em] text-teal uppercase">Timeline</dt><dd className="mt-2 font-display text-base font-bold text-ink">{selected.timeline}</dd></div> : <div />}
                    {selected.investment || (selected.investmentTiers && selected.investmentTiers.length > 0) ? (
                      <div className="pl-6">
                        <dt className="text-[10px] font-semibold tracking-[0.16em] text-teal uppercase">Investment</dt>
                        {selected.investment ? (
                          <dd className="mt-2 font-display text-base font-bold text-ink">{selected.investment}</dd>
                        ) : null}
                        {selected.investmentTiers && selected.investmentTiers.length > 0 ? (
                          <div className={`space-y-2 ${selected.investment ? "mt-3 border-t border-ink/10 pt-2.5" : "mt-2"}`}>
                            {selected.investmentTiers.map((tier) => (
                              <div className="border-l-2 border-teal/40 pl-2.5" key={tier.label}>
                                <div className="flex items-baseline justify-between gap-2">
                                  <span className="text-xs font-semibold text-ink/75 uppercase tracking-wider">{tier.label}</span>
                                  <span className="font-display text-sm font-bold text-ink">{tier.amount}</span>
                                </div>
                                {tier.description ? (
                                  <p className="mt-0.5 text-[11px] leading-tight text-ink/55">{tier.description}</p>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : <div />}
                  </dl>
                </div>
                {selected.optionalMedia ? (
                  <div className="relative min-h-[36rem] border-l border-ink/15 bg-ink">
                    <Image
                      alt={selected.optionalMedia.alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1536px) 36vw, 32vw"
                      src={selected.optionalMedia.url}
                    />
                    <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-ink/85 px-7 py-5 text-[10px] font-semibold tracking-[0.2em] text-canvas uppercase backdrop-blur-sm">A stronger digital presence. A clearer path forward.</div>
                  </div>
                ) : null}
              </div>
            </article>

            <section aria-labelledby="engagements-in-practice-title" {...(activeProof ? {"aria-roledescription": "carousel"} : {})} className="min-w-0 bg-paper">

              {activeProof ? <article aria-label={`${activeProof.title ?? "Verified project"}, project ${proofIndex + 1} of ${relatedProofs.length}`} className="grid min-h-[18rem] grid-cols-[minmax(20rem,1.05fr)_minmax(0,0.95fr)]" role="group">
                {activeProof.image && isPublicCaseStudyMedia(activeProof.image) ? (
                  <div className="border-r border-ink/15">
                    <ProjectMediaFrame featured media={activeProof.image} />
                  </div>
                ) : null}
                <div className={"flex min-w-0 flex-col justify-center px-9 py-8 " + (activeProof.image && isPublicCaseStudyMedia(activeProof.image) ? "" : "col-span-2")}>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-indigo uppercase">{getClassificationLabel(activeProof.classification)}</p>
                  {activeProof.projectIdentity ? <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-ink/55 uppercase">{activeProof.projectIdentity}</p> : null}
                  <h5 className="mt-2 font-display text-3xl font-bold tracking-[-0.04em] text-ink">{activeProof.title}</h5>
                  {(activeProof.strategy || activeProof.challenge) ? <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-ink/70">{activeProof.strategy ?? activeProof.challenge}</p> : null}
                  {selectPrimaryProofSignal(activeProof.proofSignals) ? <p className="mt-4 border-l-2 border-teal pl-4 text-sm font-medium leading-6 text-ink">{selectPrimaryProofSignal(activeProof.proofSignals)?.statement}</p> : null}
                  <div className="mt-6 flex flex-wrap items-center gap-3.5">
                    <Link className="inline-flex min-h-12 items-center justify-center rounded-lg bg-teal px-6 text-sm font-semibold text-canvas transition-colors hover:bg-indigo active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={selected.detailHref}>Explore {selected.name} →</Link>
                    <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-teal/40 px-5 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-canvas active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" data-proof-classification={activeProof.classification ?? undefined} href={`/work/${activeProof.slug}`}>View case study →</Link>
                  </div>
                </div>
              </article> : (
                <div className="flex min-h-[14rem] flex-col justify-between gap-8 px-10 py-8 lg:flex-row lg:items-center">
                  <div className="max-w-xl">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-indigo uppercase">Evidence Index</p>
                    <h5 className="mt-2.5 font-display text-2xl font-bold tracking-[-0.035em] text-ink 2xl:text-3xl">Published evidence for {selected.name} is being prepared.</h5>
                    <p className="mt-2.5 text-sm leading-6 text-ink/65">Only reviewed case studies with approved project context, imagery, and evidence appear here.</p>
                    <Link className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-teal underline decoration-teal/35 underline-offset-4 hover:text-indigo focus-visible:outline-2 focus-visible:outline-teal" href="/work">
                      Browse all verified work in Evidence Index →
                    </Link>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
                    <Link
                      className="inline-flex min-h-12 items-center justify-center rounded-lg bg-teal px-6 text-sm font-semibold text-canvas transition-colors hover:bg-indigo active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                      href={selected.detailHref}
                    >
                      Explore {selected.name} →
                    </Link>
                    <Link
                      className="inline-flex min-h-12 items-center justify-center rounded-lg border border-teal/40 px-5 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-canvas active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                      href={"/contact?service=" + selected.slug}
                    >
                      Discuss Your Project →
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-ink/15 bg-paper shadow-xs xl:hidden">
          <ChromaEdge />
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-teal uppercase">Recommended Engagement</p>
                <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal sm:hidden">Best Fit</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-ink sm:text-3xl lg:text-4xl" id="recommended-engagement-title">{selected.name}</h3>
              {selected.shortTransformation ? <p className="mt-3 font-display text-base font-semibold text-indigo sm:text-lg">{selected.shortTransformation}</p> : null}
              {selected.shortDescription ? <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70 sm:text-base sm:leading-7">{selected.shortDescription}</p> : null}

              <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-lg bg-teal px-6 text-sm font-semibold text-canvas transition-colors hover:bg-indigo active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={selected.detailHref}>
                  Explore {selected.name} →
                </Link>
                <Link className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-lg border border-teal px-6 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-canvas active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={"/contact?service=" + selected.slug}>
                  Discuss Your Project →
                </Link>
              </div>
            </div>

            <div className="border-t border-ink/15 p-5 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
              {selected.fitReasons.length ? (
                <div>
                  <h4 className="text-[11px] font-semibold tracking-[0.18em] text-teal uppercase">Why This Fits</h4>
                  <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                    {selected.fitReasons.map((reason) => (
                      <li className="flex gap-2.5 text-sm leading-6 text-ink/75" key={reason}>
                        <span aria-hidden="true" className="text-teal font-bold shrink-0">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {selected.timeline || selected.investment || (selected.investmentTiers && selected.investmentTiers.length > 0) ? (
                <dl className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 border-t border-ink/15 pt-5 sm:pt-6">
                  {selected.timeline ? <div><dt className="text-[10px] font-semibold tracking-[0.18em] text-teal uppercase">Typical Timeline</dt><dd className="mt-1.5 font-display text-sm sm:text-base font-bold text-ink">{selected.timeline}</dd></div> : null}
                  {selected.investment ? <div><dt className="text-[10px] font-semibold tracking-[0.18em] text-teal uppercase">Typical Investment</dt><dd className="mt-1.5 font-display text-sm sm:text-base font-bold text-ink">{selected.investment}</dd></div> : null}
                  {selected.investmentTiers && selected.investmentTiers.length > 0 ? (
                    <div className="col-span-2 border-t border-ink/10 pt-3">
                      <dt className="text-[10px] font-semibold tracking-[0.18em] text-teal uppercase">Investment Breakdown</dt>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {selected.investmentTiers.map((tier) => (
                          <div className="rounded-lg border border-ink/10 bg-canvas/60 p-2.5" key={tier.label}>
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-xs font-semibold text-ink/80">{tier.label}</span>
                              <span className="font-display text-sm font-bold text-indigo">{tier.amount}</span>
                            </div>
                            {tier.description ? <p className="mt-1 text-[11px] leading-tight text-ink/60">{tier.description}</p> : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
