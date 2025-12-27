import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Sanity Configuration with fallbacks for development
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

// Only create a real client if projectId is configured
const isConfigured = projectId !== "placeholder";

// Sanity Client for data fetching
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
});

// Image URL Builder
const builder = imageUrlBuilder(client);

// Chainable placeholder for when Sanity isn't configured
const placeholderBuilder = {
    width: () => placeholderBuilder,
    height: () => placeholderBuilder,
    quality: () => placeholderBuilder,
    format: () => placeholderBuilder,
    fit: () => placeholderBuilder,
    crop: () => placeholderBuilder,
    url: () => "/placeholder.jpg",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    if (!isConfigured || !source) {
        return placeholderBuilder;
    }
    return builder.image(source);
}

// Helper to check if Sanity is configured
export function isSanityConfigured() {
    return isConfigured;
}
