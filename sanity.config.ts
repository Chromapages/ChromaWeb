"use client";

import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";

import {schemaTypes} from "./src/sanity/schemaTypes";
import {InsightStudioPreview, InsightsPageStudioPreview} from "./src/sanity/insightsPreview";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "13w6gq5t";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "chromapages",
  title: "Chromapages",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem().title("Homepage").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem().title("Process page").id("processPage").child(S.document().schemaType("processPage").documentId("processPage")),
            S.listItem().title("About page").id("aboutPage").child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem().title("Contact page").id("contactPage").child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.listItem().title("Insights page").id("insightsPage").child(
              S.document()
                .schemaType("insightsPage")
                .documentId("insightsPage")
                .views([S.view.form().id("editor"), S.view.component(InsightsPageStudioPreview).id("preview").title("Preview")])
                .defaultPanes(["editor", "preview"]),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !["siteSettings", "homePage", "processPage", "aboutPage", "contactPage", "insightsPage"].includes(item.getId() ?? "")),
          ]),
      defaultDocumentNode: (S, context) => context.schemaType === "insight"
        ? S.document().views([S.view.form().id("editor"), S.view.component(InsightStudioPreview).id("preview").title("Preview")])
        : S.document(),
    }),
  ],
  schema: {types: schemaTypes},
});
