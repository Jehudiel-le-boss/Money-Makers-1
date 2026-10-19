export const PRODUCT_STATS = {
  formationDisplayCount: 60,
  totalFormationCount: 62,
  megaFormationCount: 23,
  driveFormationCount: 12,
  directResourceCount: 27,
  sourceFolderCount: 3,
  topicCount: 4,
  pdfPageCount: 4,
  priceFcfa: 5_000,
  pricePerFormationCeilingFcfa: 85,
} as const;

export const SUPPORT_EMAIL = "expert.concentration@gmail.com";

export function formatFcfa(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

export const CHECKOUT_CTA_LABEL = `Obtenir le Digital Master Pack — ${formatFcfa(PRODUCT_STATS.priceFcfa)} FCFA`;
