import {getCliClient} from "sanity/cli";

const afterLaunch = {
  _type: "afterLaunch",
  eyebrow: "After launch",
  headline: "Launch creates the baseline. Improvement comes next.",
  introduction: "Once the site is live, real behavior replaces assumptions. We inspect the experience, measure meaningful customer actions, prioritize the highest-value opportunities, and ship focused improvements.",
  repeatLabel: "Repeat",
  steps: [
    {
      _key: "inspect",
      _type: "afterLaunchStep",
      id: "inspect",
      title: "Inspect",
      description: "Review production behavior, customer paths, technical health, and launch stability.",
      output: "Post-launch review",
    },
    {
      _key: "measure",
      _type: "afterLaunchStep",
      id: "measure",
      title: "Measure",
      description: "Establish the baseline through analytics, performance data, and meaningful customer actions.",
      output: "Launch baseline",
    },
    {
      _key: "prioritize",
      _type: "afterLaunchStep",
      id: "prioritize",
      title: "Prioritize",
      description: "Rank opportunities by impact, urgency, effort, and business value.",
      output: "Prioritized roadmap",
    },
    {
      _key: "improve",
      _type: "afterLaunchStep",
      id: "improve",
      title: "Improve",
      description: "Ship focused refinements to pages, components, performance, or conversion paths — then measure again.",
      output: "Focused iteration",
    },
  ],
};

async function main() {
  const client = getCliClient({apiVersion: "2026-08-15"});

  for (const id of ["processPage", "drafts.processPage"]) {
    const document = await client.getDocument<{_id: string; _rev: string; afterLaunch?: unknown}>(id);
    if (!document) {
      console.log(`${id}: not found; skipped`);
      continue;
    }
    if (document.afterLaunch) {
      console.log(`${id}: After Launch already exists; skipped`);
      continue;
    }

    await client.patch(id).ifRevisionId(document._rev).setIfMissing({afterLaunch}).commit();
    console.log(`${id}: After Launch added without changing other fields`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
