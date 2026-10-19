"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PRODUCT_STATS } from "../lib/product-stats";

const stats = [
  {
    value: PRODUCT_STATS.formationDisplayCount,
    suffix: "+",
    label: "formations référencées",
  },
  {
    value: PRODUCT_STATS.sourceFolderCount,
    suffix: "",
    label: "dossiers sources",
  },
  {
    value: PRODUCT_STATS.topicCount,
    suffix: "",
    label: "thématiques pour commencer",
  },
  {
    value: PRODUCT_STATS.pricePerFormationCeilingFcfa,
    prefix: "< ",
    suffix: " FCFA",
    label: "par formation",
  },
];

export function StatsBand() {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<number[]>(stats.map(({ value }) => value));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setValues(stats.map(({ value }) => value));
      setStarted(true);
      return;
    }

    setValues(stats.map(() => 0));
    const element = document.querySelector<HTMLElement>(".stats-band");
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!started || reduceMotion) return;

    const duration = 850;
    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValues(stats.map(({ value }) => Math.round(value * eased)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, started]);

  return (
    <section className="stats-band" aria-label="Les chiffres du pack">
      <div className="site-container stats-grid">
        {stats.map(({ value, prefix = "", suffix, label }, index) => (
          <div className="stat-item" key={label}>
            <p className="stat-value" aria-label={`${prefix}${value}${suffix}`}>
              <span aria-hidden="true">
                {prefix}
                {values[index]}
                {suffix}
              </span>
            </p>
            <p className="stat-label">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
