"use client";

import { useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type CheckoutLinkProps = {
  children: ReactNode;
  className: string;
  location: string;
};

function getCheckoutUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_MAKETOU_CHECKOUT_URL?.trim();
  if (!raw) return undefined;

  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function CheckoutLink({ children, className, location }: CheckoutLinkProps) {
  const [notice, setNotice] = useState(false);
  const checkoutUrl = getCheckoutUrl();

  return (
    <span className="checkout-control">
      <a
        className={className}
        href={checkoutUrl ?? "#offre"}
        target={checkoutUrl ? "_blank" : undefined}
        rel={checkoutUrl ? "noopener noreferrer" : undefined}
        data-umami-event={checkoutUrl ? "clic-achat" : undefined}
        data-umami-event-emplacement={checkoutUrl ? location : undefined}
        onClick={
          checkoutUrl
            ? undefined
            : (event) => {
                event.preventDefault();
                setNotice(true);
              }
        }
      >
        {children}
        <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
      </a>
      <span className="checkout-status" role="status" aria-live="polite">
        {notice
          ? "Le checkout Maketou sera activé dès l’ajout du lien officiel."
          : ""}
      </span>
    </span>
  );
}
