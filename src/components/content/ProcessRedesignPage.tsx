import Image from "next/image";
import Link from "next/link";

import {GlobalCtaSection} from "./GlobalCtaSection";
import {PageActionLink, type PageAction} from "./PagePrimitives";
import {ProcessStageExplorer} from "./ProcessStageExplorer";
import {normalizeProcessSteps} from "./processSteps";
import type {AboutPageData, ProcessPageData} from "./SingletonPages";

const defaultProjectRisks = [
  {title: "Unclear Scope", description: "Projects drift when the real objective, priorities, and success criteria are never defined well enough to guide decisions.", icon: "/process-risk-scope.png"},
  {title: "Scattered Feedback", description: "Too many voices, delayed approvals, and fragmented comments create rework and weaken momentum.", icon: "/process-risk-feedback.png"},
  {title: "Late Technical Surprises", description: "Performance, content systems, integrations, and responsive realities cause delays when they’re discovered too late.", icon: "/process-risk-technical.png"},
  {title: "Untested Launches", description: "QA, redirects, forms, analytics, and accessibility need clear release criteria before a website goes live.", icon: "/process-risk-launch.png"},
] as const;

const defaultResponsibilityRows = [
  {title: "Business goals & strategy", detail: "Define objectives and success criteria", studio: false, team: true, together: true},
  {title: "Project management", detail: "Plan, coordinate, and keep work moving", studio: true, team: false, together: false},
  {title: "Design & development", detail: "Create the website and its systems", studio: true, team: false, together: false},
  {title: "Content & brand assets", detail: "Provide content, images, and brand resources", studio: false, team: true, together: false},
  {title: "Systems & integrations", detail: "Access to tools, domains, and third-party systems", studio: false, team: true, together: true},
  {title: "Feedback & communication", detail: "Timely, consolidated stakeholder input", studio: false, team: true, together: true},
  {title: "Quality assurance", detail: "Review across devices, browsers, and accessibility", studio: true, team: false, together: true},
  {title: "Launch & post-launch", detail: "Deployment, monitoring, and handoff", studio: true, team: false, together: true},
] as const;

const defaultRoles = [
  {label: "Chromapages leads", detail: "Process, strategy, and execution", icon: "/brand/chromapages-logo.svg", brand: true},
  {label: "Your team provides", detail: "Business context and resources", icon: "/process-role-team-crisp.png", brand: false},
  {label: "Together we decide", detail: "Aligned for the best outcome", icon: "/process-role-together-crisp.png", brand: false},
] as const;

const launchAreaIcons: Record<string, string> = {
  experience: "/process-launch-experience.png",
  "customer-action": "/process-launch-customer.png",
  "technical-release": "/process-launch-technical.png",
  handoff: "/process-launch-handoff.png",
};

function ResponsibilityMark({active, variant}: {active: boolean; variant: "studio" | "team" | "together"}) {
  return <span className={"inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold " + (active ? variant === "team" ? "bg-teal text-canvas" : "bg-indigo text-canvas" : "bg-indigo/10 text-ink/35")}><span className="sr-only">{active ? "Responsible" : "Not assigned"}</span><span aria-hidden="true">{active ? "✓" : "—"}</span></span>;
}

export function ProcessRedesignPage({process, about}: {process: ProcessPageData; about?: AboutPageData | null}) {
  const steps = normalizeProcessSteps(process.steps);
  const perspective = about?.detail?.split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean) ?? [];
  const cta: PageAction = process.cta ?? about?.cta ?? {label: "Plan Your Digital Upgrade →", href: "/contact"};
  const launchConfidence = process.launchConfidence;
  const launchAreas = (launchConfidence?.areas ?? []).flatMap((area) => {
    const id = area?.id?.trim();
    const title = area?.title?.trim();
    const description = area?.description?.trim();
    if (!id || !title || !description) return [];
    return [{
      id,
      title,
      description,
      icon: launchAreaIcons[id],
      checks: (area?.checks ?? []).filter((check): check is string => Boolean(check?.trim())).map((check) => check.trim()),
    }];
  });
  const afterLaunch = process.afterLaunch;
  const afterLaunchSteps = (afterLaunch?.steps ?? []).flatMap((step) => {
    const id = step?.id?.trim();
    const title = step?.title?.trim();
    const description = step?.description?.trim();
    const output = step?.output?.trim();
    return id && title && description && output ? [{id, title, description, output}] : [];
  });
  const hero = process.hero;
  const heroEyebrow = hero?.eyebrow?.trim() || "How We Work";
  const heroHeadline = hero?.headline?.trim() || "A controlled path from ambiguity to launch.";
  const heroIntroduction = hero?.introduction?.trim() || process.introduction?.trim() || "A structured, milestone-driven process that turns your goals into a stronger digital presence, with clear ownership and visible progress.";
  const heroSecondaryCtaLabel = hero?.secondaryCtaLabel?.trim() || "See the process →";
  const heroSecondaryCtaHref = hero?.secondaryCtaHref?.trim() || "#delivery-process";
  const heroImageUrl = hero?.image?.url || "/process-editorial-concept.png";
  const heroImageAlt = hero?.image?.alt?.trim() || "Illustrative concept of a discovery brief, process plan, and website interface";
  const heroImageCaption = hero?.image?.caption !== undefined ? hero?.image?.caption?.trim() : "Process illustration";

  const wim = process.whyItMatters;
  const wimEyebrow = wim?.eyebrow?.trim() || "Why it matters";
  const wimHeadline = wim?.headline?.trim() || "Most website projects get off track.";
  const wimIntroduction = wim?.introduction?.trim() || "Unclear scope, scattered feedback, and late technical decisions slow a project down. A defined process makes the next decision visible.";

  const wimItems = wim?.items && wim.items.length > 0
    ? wim.items.flatMap((item, index) => {
        const title = item?.title?.trim();
        const description = item?.description?.trim();
        if (!title || !description) return [];
        const defaultRisk = defaultProjectRisks[index % defaultProjectRisks.length];
        return [{
          title,
          description,
          icon: item?.icon?.url || defaultRisk.icon,
        }];
      })
    : defaultProjectRisks;

  const wt = process.workingTogether;
  const wtEyebrow = wt?.eyebrow?.trim() || "Working together";
  const wtHeadline = wt?.headline?.trim() || "Different strengths.\nA better result.";
  const wtIntroduction = wt?.introduction?.trim() || "A successful website needs the right people doing the right things. Here is how we share responsibilities and keep decisions clear.";
  const wtCtaLabel = wt?.ctaLabel?.trim() || "See the delivery process →";
  const wtCtaHref = wt?.ctaHref?.trim() || "#delivery-process";
  const wtSharedGoalLabel = wt?.sharedGoalLabel?.trim() || "Same goal";
  const wtSharedGoalText = wt?.sharedGoalText?.trim() || "A website that supports the next stage of your business.";

  const wtRoles = wt?.roles && wt.roles.length > 0
    ? wt.roles.map((r, i) => {
        const defaultRole = defaultRoles[i % defaultRoles.length];
        return {
          label: r?.label?.trim() || defaultRole.label,
          detail: r?.detail?.trim() || defaultRole.detail,
          icon: r?.icon?.url || defaultRole.icon,
          brand: !r?.icon?.url && Boolean(defaultRole.brand),
        };
      })
    : defaultRoles;

  const wtResponsibilities = wt?.responsibilities && wt.responsibilities.length > 0
    ? wt.responsibilities.flatMap((row) => {
        const title = row?.title?.trim();
        if (!title) return [];
        return [{
          title,
          detail: row?.detail?.trim() || "",
          studio: Boolean(row?.studio),
          team: Boolean(row?.team),
          together: Boolean(row?.together),
        }];
      })
    : defaultResponsibilityRows;

  const wtSummaryTitle = wt?.summaryTitle?.trim() || "A stronger partnership";
  const wtSummaryText = wt?.summaryText?.trim() || "Clear roles. Better decisions. A smoother launch.";
  const wtHighlights = (wt?.highlights && wt.highlights.length > 0
    ? wt.highlights
    : ["Less rework", "Clearer decisions", "Launch readiness"]
  ).filter((h): h is string => Boolean(h?.trim())).map((h) => h.trim());
  const wtSummaryCtaLabel = wt?.summaryCtaLabel?.trim() || "Our approach →";
  const wtSummaryCtaHref = wt?.summaryCtaHref?.trim() || "#operating-principles";

  return (
    <main className="overflow-x-clip bg-canvas text-ink" id="main-content" tabIndex={-1}>
      <header className="border-b border-canvas/10 bg-ink text-canvas">
        <div className="mx-auto grid w-full max-w-[112rem] gap-8 px-5 py-12 sm:px-8 lg:min-h-[29rem] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center lg:px-12 lg:py-10 2xl:px-20">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-[0.18em] text-teal-300 uppercase">{heroEyebrow}</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.055em] text-canvas sm:text-5xl lg:text-6xl">{heroHeadline}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-canvas/75 sm:text-lg sm:leading-8">{heroIntroduction}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PageActionLink action={cta} analyticsLocation="process_hero" />
              <Link className="inline-flex min-h-11 items-center justify-center rounded-lg border border-canvas/50 px-5 text-sm font-semibold text-canvas transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={heroSecondaryCtaHref}>{heroSecondaryCtaLabel}</Link>
            </div>
          </div>
          <figure className="relative -mx-5 aspect-[16/10] overflow-hidden sm:mx-0 lg:aspect-[16/9] lg:max-h-[32rem] lg:rounded-xl">
            <Image alt={heroImageAlt} className="object-cover object-center" fill priority sizes="(min-width: 1024px) 50vw, 100vw" src={heroImageUrl} />
            {heroImageCaption ? (
              <figcaption className="absolute bottom-3 right-3 rounded bg-paper/90 px-2 py-1 text-[10px] font-semibold tracking-wide text-ink">{heroImageCaption}</figcaption>
            ) : null}
          </figure>
        </div>
      </header>

      <section aria-labelledby="principles-title" className="bg-canvas py-10 lg:pt-14 lg:pb-6" id="principles">
        <div className="mx-auto w-full max-w-[112rem] rounded-xl border border-indigo/10 bg-paper px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid scroll-mt-24 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:justify-between lg:gap-12 xl:gap-16" id="studio">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-xs font-bold tracking-[0.18em] text-indigo uppercase">{wimEyebrow}</p>
                <span aria-hidden="true" className="h-px w-12 bg-indigo/40" />
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.045em] text-ink sm:text-4xl lg:text-[2.6rem]" id="principles-title">
                {wimHeadline}
              </h2>
            </div>
            <div className="lg:max-w-lg lg:justify-self-end">
              <p className="text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
                {wimIntroduction}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-indigo/15 pt-8 lg:mt-12 lg:pt-10">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {wimItems.map((risk, index) => (
                <article
                  className="min-w-0 lg:border-l lg:border-indigo/15 lg:px-7 lg:first:border-l-0 lg:first:pl-0"
                  key={`${risk.title}-${index}`}
                >
                  {risk.icon ? (
                    <span aria-hidden="true" className="block size-16 overflow-hidden rounded-full bg-[#eef0f9]">
                      <Image alt="" className="size-full object-cover mix-blend-multiply" height={64} src={risk.icon} width={64} />
                    </span>
                  ) : null}
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-xs font-bold tracking-[0.18em] text-indigo">{String(index + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px w-16 bg-indigo/60" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold leading-tight tracking-[-0.035em] text-ink">
                    {risk.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-ink/70">
                    {risk.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProcessStageExplorer steps={steps} />

      <section aria-label="The working relationship" className="scroll-mt-24 bg-paper py-14 lg:pt-6 lg:pb-20" id="working-relationship">
        <div className="mx-auto w-full max-w-[112rem] px-5 sm:px-8 lg:px-12 2xl:px-20 xl:hidden">
          <p className="text-xs font-bold tracking-[0.18em] text-indigo uppercase">{wtEyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-[-0.045em] text-ink sm:text-4xl" id="working-relationship-title-mobile">
            {wtHeadline.includes("\n") ? wtHeadline.replace(/\n/g, " ") : wtHeadline}
          </h2>
          <div className="mt-7 grid gap-4">
            <div className="rounded-xl bg-ink p-7 text-canvas lg:p-9">
              <p className="text-[11px] font-bold tracking-[0.16em] text-teal-300 uppercase">Chromapages perspective</p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.035em]">The work stays close to the people building it.</h3>
              <p className="mt-5 text-sm leading-7 text-canvas/75">{perspective[0] || wtIntroduction}</p>
            </div>
            <div className="rounded-xl border border-indigo/15 bg-canvas p-7 lg:p-9">
              <p className="text-[11px] font-bold tracking-[0.16em] text-indigo uppercase">Shared direction</p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.035em] text-ink">Your goals shape each decision.</h3>
              {perspective.slice(1).map((paragraph, index) => <p className="mt-5 text-sm leading-7 text-ink/70" key={index}>{paragraph}</p>)}
              {perspective.length <= 1 ? <p className="mt-5 text-sm leading-7 text-ink/70">You bring the business context and decisions; we bring the design and development work into focus.</p> : null}
            </div>
            <div className="flex flex-col justify-center rounded-xl border border-indigo/15 bg-canvas p-7 lg:p-9">
              <p className="text-[11px] font-bold tracking-[0.16em] text-indigo uppercase">{wtSharedGoalLabel}</p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.035em] text-ink">A considered launch, together.</h3>
              <p className="mt-4 text-sm leading-6 text-ink/70">{wtSharedGoalText}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto hidden w-full max-w-[112rem] px-12 2xl:px-0 xl:block">
          <div className="overflow-hidden rounded-xl bg-paper">
            <div className="grid grid-cols-[minmax(19rem,0.9fr)_minmax(0,2.55fr)] gap-0 px-8 py-8 xl:px-10 xl:py-10">
              <div className="border-r border-indigo/15 pr-9">
                <div className="flex items-center gap-4"><p className="text-xs font-bold tracking-[0.17em] text-indigo uppercase">{wtEyebrow}</p><span aria-hidden="true" className="h-px w-14 bg-indigo/50" /></div>
                <h2 className="mt-7 max-w-md font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.055em] whitespace-pre-line text-ink xl:text-5xl" id="working-relationship-title">{wtHeadline}</h2>
                <p className="mt-6 max-w-md text-base leading-7 text-ink/70">{wtIntroduction}</p>
                <Link className="mt-7 inline-flex min-h-12 self-start items-center justify-center rounded-lg bg-teal px-7 text-sm font-semibold text-canvas transition-colors hover:bg-indigo active:bg-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={wtCtaHref}>{wtCtaLabel}</Link>
                <div className="mt-5">
                  <p className="text-xs font-bold tracking-[0.16em] text-indigo uppercase">{wtSharedGoalLabel}</p>
                  <p className="mt-2 max-w-xs text-base leading-7 text-ink/70">{wtSharedGoalText}</p>
                </div>
              </div>

              <div className="min-w-0 pl-8 xl:pl-10">
                <table className="w-full table-fixed border-collapse text-left">
                  <colgroup><col className="w-[39%]" /><col className="w-[20.33%]" /><col className="w-[20.33%]" /><col className="w-[20.33%]" /></colgroup>
                  <thead>
                    <tr className="border-b border-indigo/15 align-bottom">
                      <th className="pb-5 pr-5 text-xs font-bold tracking-[0.14em] text-indigo uppercase" scope="col">Key responsibilities</th>
                      {wtRoles.map((role) => <th className="border-l border-indigo/15 bg-indigo/[0.025] px-4 py-4 text-left" key={role.label} scope="col"><span className="flex items-center gap-3"><span aria-hidden="true" className={"relative block h-11 shrink-0 overflow-hidden " + (role.brand ? "w-9" : "w-11")}>{role.brand ? <Image alt="" className="h-12 w-[240px] max-w-none" height={48} src={role.icon} width={240} /> : <Image alt="" className="size-11 object-cover mix-blend-multiply" height={44} src={role.icon} unoptimized width={44} />}</span><span className="min-w-0"><span className="block font-display text-xs font-bold leading-tight tracking-[0.04em] text-indigo uppercase">{role.label}</span><span className="mt-1 block text-[11px] font-normal leading-4 text-ink/60">{role.detail}</span></span></span></th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {wtResponsibilities.map((row) => <tr className="border-b border-indigo/10 last:border-b-0" key={row.title}><th className="py-2.5 pr-5 font-normal" scope="row"><span className="block font-display text-sm font-bold leading-tight text-ink">{row.title}</span><span className="mt-0.5 block text-xs leading-4 text-ink/60">{row.detail}</span></th><td className="border-l border-indigo/10 text-center"><ResponsibilityMark active={row.studio} variant="studio" /></td><td className="border-l border-indigo/10 text-center"><ResponsibilityMark active={row.team} variant="team" /></td><td className="border-l border-indigo/10 text-center"><ResponsibilityMark active={row.together} variant="together" /></td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,0.7fr))_minmax(12rem,0.65fr)] items-center gap-5 rounded-lg border border-indigo/15 bg-indigo/[0.025] px-8 py-5 xl:px-10">
              <div><p className="text-xs font-bold tracking-[0.14em] text-indigo uppercase">{wtSummaryTitle}</p><p className="mt-1 text-sm text-ink/70">{wtSummaryText}</p></div>
              {wtHighlights.map((highlight) => (
                <p className="border-l border-indigo/15 pl-5 text-sm font-semibold text-indigo" key={highlight}>{highlight}</p>
              ))}
              <Link className="inline-flex min-h-11 items-center justify-center rounded-lg bg-indigo/5 px-4 text-sm font-semibold text-indigo transition-colors hover:bg-indigo hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href={wtSummaryCtaHref}>{wtSummaryCtaLabel}</Link>
            </div>
          </div>
        </div>
      </section>

      {launchConfidence?.headline?.trim() && launchAreas.length ? <section aria-labelledby="operating-principles-title" className="scroll-mt-24 bg-ink py-16 text-canvas lg:py-24" id="operating-principles">
        <div className="mx-auto grid w-full max-w-[112rem] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,2fr)] lg:px-12 2xl:px-20">
          <div className="lg:pr-10">
            {launchConfidence.eyebrow?.trim() ? <p className="text-xs font-bold tracking-[0.18em] text-canvas/65 uppercase">{launchConfidence.eyebrow}</p> : null}
            <h2 className="mt-6 max-w-xl font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.05em] sm:text-5xl" id="operating-principles-title">{launchConfidence.headline}</h2>
            {launchConfidence.introduction?.trim() ? <p className="mt-6 max-w-lg text-base leading-7 text-canvas/70">{launchConfidence.introduction}</p> : null}
            {launchConfidence.ctaLabel?.trim() ? <Link className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg border border-canvas/55 px-6 text-sm font-semibold text-canvas transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" href="#launch-checklist">{launchConfidence.ctaLabel}</Link> : null}
          </div>
          <div className="min-w-0 scroll-mt-24" id="launch-checklist">
            <div className="flex items-center gap-6"><span aria-hidden="true" className="h-px flex-1 bg-canvas/15" />{launchConfidence.checklistLabel?.trim() ? <p className="text-[11px] font-bold tracking-[0.16em] text-canvas/60 uppercase">{launchConfidence.checklistLabel}</p> : null}</div>
            <ol className="mt-10 grid gap-y-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-y-0">
              {launchAreas.map((item, index) => (
                <li className="border-l border-canvas/15 px-5 first:border-l-0 xl:px-7" key={item.id}>
                  <span className="text-sm font-bold tracking-[0.16em] text-teal-300">{String(index + 1).padStart(2, "0")}</span>
                  {item.icon ? <span aria-hidden="true" className="mt-5 block size-16 overflow-hidden rounded-xl border border-canvas/15 bg-white/[0.04]"><Image alt="" className="size-full object-cover" height={64} src={item.icon} width={64} /></span> : null}
                  <h3 className="mt-6 font-display text-base font-bold tracking-[0.04em] text-canvas uppercase">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-canvas/65">{item.description}</p>
                  {item.checks.length ? <ul className="mt-6 space-y-3 border-t border-canvas/15 pt-6 text-sm leading-5 text-canvas/70">
                    {item.checks.map((check) => <li className="flex gap-3" key={check}><span aria-hidden="true" className="text-teal-300">•</span>{check}</li>)}
                  </ul> : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section> : null}

      {afterLaunch?.headline?.trim() && afterLaunchSteps.length ? <section aria-labelledby="after-launch-title" className="bg-paper py-16 text-ink lg:py-24" id="after-launch">
        <div className="mx-auto w-full max-w-[112rem] px-5 sm:px-8 lg:px-12 2xl:px-20">
          <div className="grid gap-10 xl:grid-cols-[minmax(20rem,0.9fr)_minmax(0,1.8fr)] xl:gap-14">
            <div className="xl:pt-4">
              {afterLaunch.eyebrow?.trim() ? <p className="text-xs font-bold tracking-[0.2em] text-indigo uppercase">{afterLaunch.eyebrow}</p> : null}
              <h2 className="mt-6 max-w-lg font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] sm:text-5xl xl:text-6xl" id="after-launch-title">{afterLaunch.headline}</h2>
              {afterLaunch.introduction?.trim() ? <p className="mt-7 max-w-lg text-base leading-8 text-ink/70 sm:text-lg">{afterLaunch.introduction}</p> : null}
            </div>
            <ol className="divide-y divide-indigo/25">
              {afterLaunchSteps.map((step, index) => (
                <li className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-6 sm:gap-x-6 xl:min-h-[9.5rem] xl:grid-cols-[3.5rem_12rem_minmax(0,1fr)_13rem] xl:items-center xl:gap-x-0 xl:py-7" key={step.id}>
                  <span className="font-display text-lg font-bold tracking-[0.12em] text-indigo">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="border-l border-indigo/40 pl-5 font-display text-lg font-bold tracking-[0.02em] text-ink uppercase xl:pl-7">{step.title}</h3>
                  <p className="col-start-2 max-w-md text-base leading-7 text-ink/70 xl:col-auto xl:pr-7">{step.description}</p>
                  <div className="col-start-2 border-l border-indigo/40 pl-5 xl:col-auto xl:pl-7">
                    <p className="text-xs font-semibold tracking-[0.12em] text-ink/50 uppercase">Output</p>
                    <p className="mt-1 font-display text-base font-bold text-ink">{step.output}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-indigo/45 pt-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold tracking-[0.18em] text-indigo uppercase">
              {afterLaunchSteps.map((step) => <span className="inline-flex items-center gap-4" key={step.id}>{step.title}<span aria-hidden="true" className="font-normal">→</span></span>)}
              {afterLaunch.repeatLabel?.trim() ? <span className="text-teal">{afterLaunch.repeatLabel}</span> : null}
            </div>
            <span aria-hidden="true" className="text-4xl font-light leading-none text-teal">→</span>
          </div>
        </div>
      </section> : null}

      <GlobalCtaSection analyticsLocation="process_closing" primaryAction={cta} />
    </main>
  );
}
