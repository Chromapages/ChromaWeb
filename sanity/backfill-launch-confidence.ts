import {getCliClient} from "sanity/cli";

const launchConfidence = {
  _type: "launchConfidence",
  eyebrow: "Launch confidence",
  headline: "We check the whole experience before the website goes live.",
  introduction: "Before release, Chromapages reviews the experience, customer actions, technical setup, and handoff requirements so launch is deliberate.",
  checklistLabel: "The launch control desk",
  ctaLabel: "See the launch checklist →",
  areas: [
    {
      _key: "experience",
      _type: "launchArea",
      id: "experience",
      title: "Experience",
      description: "We review the front-end experience across devices, browsers, and assistive technologies.",
      checks: ["Responsive behavior", "Accessibility review", "Browser and device QA"],
    },
    {
      _key: "customer-action",
      _type: "launchArea",
      id: "customer-action",
      title: "Customer action",
      description: "We confirm key customer actions work as intended, from inquiry to conversion.",
      checks: ["Forms and notifications", "Booking or CRM paths", "Analytics events"],
    },
    {
      _key: "technical-release",
      _type: "launchArea",
      id: "technical-release",
      title: "Technical release",
      description: "We validate the technical setup and deployment configuration before release.",
      checks: ["Metadata and links", "Redirects and deployment", "DNS where scoped"],
    },
    {
      _key: "handoff",
      _type: "launchArea",
      id: "handoff",
      title: "Handoff",
      description: "We prepare your team with clear documentation and next steps.",
      checks: ["CMS review", "Documentation", "Post-launch inspection"],
    },
  ],
};

async function main() {
  const client = getCliClient({apiVersion: "2026-08-15"});

  for (const id of ["processPage", "drafts.processPage"]) {
    const document = await client.getDocument<{_id: string; _rev: string; launchConfidence?: unknown}>(id);
    if (!document) {
      console.log(`${id}: not found; skipped`);
      continue;
    }
    if (document.launchConfidence) {
      console.log(`${id}: Launch Confidence already exists; skipped`);
      continue;
    }

    await client.patch(id).ifRevisionId(document._rev).setIfMissing({launchConfidence}).commit();
    console.log(`${id}: Launch Confidence added without changing other fields`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
