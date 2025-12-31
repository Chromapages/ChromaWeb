import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = "7ma5n919";
const dataset = "production";

export default defineConfig({
    name: "chromapages-studio",
    title: "Chromapages CMS",

    projectId,
    dataset,

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
});
