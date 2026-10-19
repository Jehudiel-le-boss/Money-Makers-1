import type { Metadata } from "next";
import Script from "next/script";
import { getHttpsUrl, getPublicOrigin } from "../lib/site";
import { formatFcfa, PRODUCT_STATS } from "../lib/product-stats";
import "./globals.css";

const title = `Digital Master Pack — ${PRODUCT_STATS.formationDisplayCount}+ formations en un seul PDF | Money Makers`;
const description =
  `Un PDF avec les liens vers ${PRODUCT_STATS.formationDisplayCount}+ formations : ChatGPT, Shopify, Python, Facebook Ads, TikTok, montage vidéo. ${formatFcfa(PRODUCT_STATS.priceFcfa)} FCFA.`;

const siteOrigin = getPublicOrigin();
const image = "/media/hero-landscape.webp";

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: {
    default: title,
    template: "%s | Money Makers",
  },
  description,
  keywords: [
    "Digital Master Pack",
    "Money Makers",
    "marketing digital",
    "intelligence artificielle",
    "création de contenu",
    "compétences numériques",
  ],
  alternates: siteOrigin ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Money Makers",
    title,
    description,
    url: siteOrigin?.toString(),
    images: siteOrigin
      ? [{ url: image, width: 1920, height: 1080, alt: "Digital Master Pack — Money Makers" }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: siteOrigin ? [image] : undefined,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const analyticsUrl = getHttpsUrl(process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL);
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();

  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <div className="site-shell">{children}</div>
        {analyticsUrl && websiteId ? (
          <Script
            src={analyticsUrl}
            data-website-id={websiteId}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
