import type { MetadataRoute } from "next";
import { getPublicOrigin, isIndexableProduction } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  const origin = getPublicOrigin();
  const indexable = isIndexableProduction(origin);

  return {
    rules: {
      userAgent: "*",
      allow: indexable ? "/" : undefined,
      disallow: indexable ? undefined : "/",
    },
    sitemap: indexable && origin ? new URL("/sitemap.xml", origin).toString() : undefined,
  };
}
