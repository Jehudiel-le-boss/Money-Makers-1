"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#contenu", label: "Le contenu" },
  { href: "#methode", label: "La méthode" },
  { href: "#publicites", label: "Les vidéos" },
  { href: "#faq", label: "FAQ" },
];

function BrandMark() {
  return (
    <span className="brand-lockup" aria-label="Money Makers">
      <svg
        aria-hidden="true"
        className="brand-symbol"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M5 32V8l10 10 5-5 15 19V8L20 23 5 8" />
        <path d="M11 32 20 23l9 9" />
      </svg>
      <span className="brand-words">
        <strong>MONEY MAKERS</strong>
        <small>ÉDITION DIGITALE</small>
      </span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <a href="#accueil" className="brand-link" onClick={() => setOpen(false)}>
          <BrandMark />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav
          id="primary-navigation"
          className={`header-nav${open ? " is-open" : ""}`}
          aria-label="Navigation principale"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="header-cta" href="#offre" onClick={() => setOpen(false)}>
            Voir le pack <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
