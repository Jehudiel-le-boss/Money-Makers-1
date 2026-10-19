"use client";

import { useEffect, useState } from "react";
import { CheckoutLink } from "./checkout-link";
import { CHECKOUT_CTA_LABEL, formatFcfa, PRODUCT_STATS } from "../lib/product-stats";

export function StickyCheckout() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [offerCheckoutVisible, setOfferCheckoutVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("accueil");
    const offerCheckout = document.querySelector(".offer-checkout .checkout-control");
    if (!hero || !offerCheckout) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === "accueil") setHeroVisible(entry.isIntersecting);
          if (entry.target === offerCheckout) {
            setOfferCheckoutVisible(entry.isIntersecting);
          }
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(hero);
    observer.observe(offerCheckout);
    return () => observer.disconnect();
  }, []);

  if (heroVisible || offerCheckoutVisible) return null;

  return (
    <aside className="sticky-checkout" aria-label="Accès rapide à l’achat">
      <span className="sticky-checkout-price">{formatFcfa(PRODUCT_STATS.priceFcfa)} FCFA</span>
      <CheckoutLink
        className="button button-primary"
        location="mobile-sticky"
      >
        {CHECKOUT_CTA_LABEL}
      </CheckoutLink>
    </aside>
  );
}
