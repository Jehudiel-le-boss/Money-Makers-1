export function getPublicOrigin(): URL | undefined {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (!raw) return undefined;

  try {
    const candidate = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    return candidate.protocol === "https:" ? candidate : undefined;
  } catch {
    return undefined;
  }
}

export function getHttpsUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;

  try {
    const candidate = new URL(raw);
    return candidate.protocol === "https:" ? candidate.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function isIndexableProduction(origin = getPublicOrigin()): boolean {
  if (!origin || process.env.NODE_ENV !== "production") return false;

  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }

  return Boolean(process.env.NEXT_PUBLIC_SITE_URL);
}
