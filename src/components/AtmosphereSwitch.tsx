"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Sunrise } from "./icons";
import styles from "./AtmosphereSwitch.module.css";

export const ATMOSPHERES = [
  { id: "day", label: "Day", Icon: Sun },
  { id: "dawn", label: "Dawn", Icon: Sunrise },
  { id: "dusk", label: "Dusk", Icon: Moon },
] as const;

export type Atmosphere = (typeof ATMOSPHERES)[number]["id"];

/**
 * Theme switch. Desktop shows text labels; on small screens each option
 * becomes an icon button (sun / sunrise / moon) so the header stays compact.
 */
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
    <div role="group" aria-label="Theme" className={styles.group}>
      {ATMOSPHERES.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={current === id}
          aria-label={`${label} theme`}
          title={`${label} theme`}
          className={`${styles.option} ${current === id ? styles.active : ""}`}
          onClick={() => choose(id)}
        >
          <span className={styles.label} aria-hidden>
            {label}
          </span>
          <span className={styles.icon} aria-hidden>
            <Icon size={17} />
          </span>
        </button>
      ))}
    </div>
  );
}
