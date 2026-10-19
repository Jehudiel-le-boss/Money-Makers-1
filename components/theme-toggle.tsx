"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  const theme = document.documentElement.dataset.theme;
  return theme === "light" || theme === "dark"
    ? theme
    : window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      window.localStorage.setItem("money-makers-theme", nextTheme);
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
      console.warn("Impossible d’enregistrer la préférence de thème.", error);
    }

    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 450);
  }

  const label = theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={label}
      aria-pressed={theme === "light"}
      title={label}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon" key={theme}>
        {theme === "dark" ? (
          <Sun size={18} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Moon size={18} strokeWidth={1.8} aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
