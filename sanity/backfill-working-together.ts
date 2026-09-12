import {getCliClient} from "sanity/cli";

const workingTogether = {
  _type: "workingTogether",
  eyebrow: "Working together",
  headline: "Different strengths.\nA better result.",
  introduction: "A successful website needs the right people doing the right things. Here is how we share responsibilities and keep decisions clear.",
  ctaLabel: "See the delivery process →",
  ctaHref: "#delivery-process",
  sharedGoalLabel: "Same goal",
  sharedGoalText: "A website that supports the next stage of your business.",
  roles: [
    {
      _key: "chromapages",
      _type: "workingTogetherRole",
      label: "Chromapages leads",
      detail: "Process, strategy, and execution",
    },
    {
      _key: "team",
      _type: "workingTogetherRole",
      label: "Your team provides",
      detail: "Business context and resources",
    },
    {
      _key: "together",
      _type: "workingTogetherRole",
      label: "Together we decide",
      detail: "Aligned for the best outcome",
    },
  ],
  responsibilities: [
    {
      _key: "r1",
      _type: "responsibilityRow",
      title: "Business goals & strategy",
      detail: "Define objectives and success criteria",
      studio: false,
      team: true,
      together: true,
    },
    {
      _key: "r2",
      _type: "responsibilityRow",
      title: "Project management",
      detail: "Plan, coordinate, and keep work moving",
      studio: true,
      team: false,
      together: false,
    },
    {
      _key: "r3",
      _type: "responsibilityRow",
      title: "Design & development",
      detail: "Create the website and its systems",
      studio: true,
      team: false,
      together: false,
    },
    {
      _key: "r4",
      _type: "responsibilityRow",
      title: "Content & brand assets",
      detail: "Provide content, images, and brand resources",
      studio: false,
      team: true,
      together: false,
    },
    {
      _key: "r5",
      _type: "responsibilityRow",
      title: "Systems & integrations",
      detail: "Access to tools, domains, and third-party systems",
      studio: false,
      team: true,
      together: true,
    },
    {
      _key: "r6",
      _type: "responsibilityRow",
      title: "Feedback & communication",
      detail: "Timely, consolidated stakeholder input",
      studio: false,
      team: true,
      together: true,
    },
    {
      _key: "r7",
      _type: "responsibilityRow",
      title: "Quality assurance",
      detail: "Review across devices, browsers, and accessibility",
      studio: true,
      team: false,
      together: true,
    },
    {
      _key: "r8",
      _type: "responsibilityRow",
      title: "Launch & post-launch",
      detail: "Deployment, monitoring, and handoff",
      studio: true,
      team: false,
      together: true,
    },
  ],
  summaryTitle: "A stronger partnership",
  summaryText: "Clear roles. Better decisions. A smoother launch.",
  highlights: ["Less rework", "Clearer decisions", "Launch readiness"],
  summaryCtaLabel: "Our approach →",
  summaryCtaHref: "#operating-principles",
};

async function main() {
  const client = getCliClient({apiVersion: "2026-08-15"});

  for (const id of ["processPage", "drafts.processPage"]) {
    const document = await client.getDocument<{_id: string; _rev: string; workingTogether?: unknown}>(id);
    if (!document) {
      console.log(`${id}: not found; skipped`);
      continue;
    }
    if (document.workingTogether) {
      console.log(`${id}: Working Together already exists; skipped`);
      continue;
    }

    await client.patch(id).ifRevisionId(document._rev).setIfMissing({workingTogether}).commit();
    console.log(`${id}: Working Together added without changing other fields`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
