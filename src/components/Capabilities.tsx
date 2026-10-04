"use client";

import { useId, useState } from "react";
import { profile } from "@/data/profile";
import { Plus } from "./icons";
import styles from "./Capabilities.module.css";

export default function Capabilities() {
  const [open, setOpen] = useState<number>(0);
  const baseId = useId();

  return (
    <section id="capabilities" className={styles.band}>
      <div className={`container section ${styles.layout}`}>
        <div className={styles.intro}>
          <span className="eyebrow">02 — Capabilities</span>
          <h2 className="sectionTitle">
            What I <span className="serif">bring</span> to the mission
          </h2>
          <p className={styles.hint}>Select a capability to expand it.</p>
        </div>

        <div className={styles.list}>
          {profile.capabilities.map((c, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <div key={i} className={styles.item}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.title}>{c.title}</span>
                  <span className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ""}`}>
                    <Plus />
                  </span>
                </button>
                <div id={panelId} className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
                  <div className={styles.panelInner}>
                    <p className={styles.body}>{c.body}</p>
                    <div className={styles.tags}>
                      {c.tags.map((t, j) => (
                        <span key={j} className={styles.tag}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
