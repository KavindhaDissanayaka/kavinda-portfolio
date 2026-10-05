"use client";

import { useEffect, useState } from "react";
import styles from "./AtmosphereSwitch.module.css";

export const ATMOSPHERES = [
  { id: "day", label: "Day" },
  { id: "dawn", label: "Dawn" },
  { id: "dusk", label: "Dusk" },
] as const;

export type Atmosphere = (typeof ATMOSPHERES)[number]["id"];

export default function AtmosphereSwitch() {
  const [current, setCurrent] = useState<Atmosphere>("day");

  // Sync with whatever the pre-paint script in layout.tsx applied.
  useEffect(() => {
    const a = document.documentElement.dataset.atmosphere as Atmosphere | undefined;
    if (a) setCurrent(a);
  }, []);

  const choose = (id: Atmosphere) => {
    setCurrent(id);
    document.documentElement.dataset.atmosphere = id;
    try {
      localStorage.setItem("atmosphere", id);
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
  };

  return (
    <div role="group" aria-label="Atmosphere" className={styles.group}>
      {ATMOSPHERES.map((a) => (
        <button
          key={a.id}
          type="button"
          aria-pressed={current === a.id}
          className={`${styles.option} ${current === a.id ? styles.active : ""}`}
          onClick={() => choose(a.id)}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
