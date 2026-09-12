import {getCliClient} from "sanity/cli";

const whyItMatters = {
  _type: "whyItMatters",
  eyebrow: "Why it matters",
  headline: "Most website projects get off track.",
  introduction: "Unclear scope, scattered feedback, and late technical decisions slow a project down. A defined process makes the next decision visible.",
  ctaLabel: "See how the process prevents this →",
  ctaHref: "#delivery-process",
  items: [
    {
      _key: "unclear-scope",
      _type: "whyItMattersItem",
      title: "Unclear Scope",
      description: "Projects drift when the real objective, priorities, and success criteria are never defined well enough to guide decisions.",
    },
    {
      _key: "scattered-feedback",
      _type: "whyItMattersItem",
      title: "Scattered Feedback",
      description: "Too many voices, delayed approvals, and fragmented comments create rework and weaken momentum.",
    },
    {
      _key: "late-technical-surprises",
      _type: "whyItMattersItem",
      title: "Late Technical Surprises",
      description: "Performance, content systems, integrations, and responsive realities cause delays when they're discovered too late.",
    },
    {
      _key: "untested-launches",
      _type: "whyItMattersItem",
      title: "Untested Launches",
      description: "QA, redirects, forms, analytics, and accessibility need clear release criteria before a website goes live.",
    },
  ],
};

async function main() {
  const client = getCliClient({apiVersion: "2026-08-15"});

  for (const id of ["processPage", "drafts.processPage"]) {
    const document = await client.getDocument<{_id: string; _rev: string; whyItMatters?: unknown}>(id);
    if (!document) {
      console.log(`${id}: not found; skipped`);
      continue;
    }
    if (document.whyItMatters) {
      console.log(`${id}: Why It Matters already exists; skipped`);
      continue;
    }

    await client.patch(id).ifRevisionId(document._rev).setIfMissing({whyItMatters}).commit();
    console.log(`${id}: Why It Matters added without changing other fields`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
