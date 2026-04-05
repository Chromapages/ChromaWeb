import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getCaseStudies, getServices } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, services] = await Promise.all([
    getCaseStudies(),
    getServices(),
  ]);

  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/process",
    "/pricing",
    "/about",
    "/contact",
    "/privacy-policy",
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const projectRoutes = caseStudies.map((project) => `/work/${project.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
