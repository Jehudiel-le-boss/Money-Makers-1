import type { MetadataRoute } from "next";
import { getPublicOrigin, isIndexableProduction } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getPublicOrigin();
  if (!isIndexableProduction(origin) || !origin) return [];

  return [
    {
      url: new URL("/", origin).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
