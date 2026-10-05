"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import AtmosphereSwitch from "./AtmosphereSwitch";
import LiveClock from "./LiveClock";
import NavOrb from "./NavOrb";
import styles from "./Header.module.css";

/**
 * `inner` = used on sub-pages (/youtube, /github …): there is no hero portrait,
 * so the portrait button is always visible (in its calm state) and a back link is shown.
 */
export default function Header({ inner = false }: { inner?: boolean }) {
  // True once the hero portrait has scrolled out of view.
  const [showOrb, setShowOrb] = useState(inner);

  useEffect(() => {
    if (inner) return;
    const mainPortrait = document.getElementById("main-profile-image");
    if (!mainPortrait) return;

    const update = () => {
      const headerHeight = 90;
      setShowOrb(mainPortrait.getBoundingClientRect().bottom <= headerHeight);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [inner]);

  return (
    <header className={styles.wrap}>
      <div className={styles.bar}>
        <div className={styles.brand}>
          <span className={styles.slot}>
            {/* Initial shown while the hero portrait is visible; the portrait button replaces it afterwards. */}
            <Link
              href="/"
              className={`${styles.markLink} ${showOrb ? styles.markHidden : ""}`}
              aria-label={`${profile.firstName} ${profile.lastName} — home`}
              tabIndex={showOrb ? -1 : 0}
            >
              <span className={`serif ${styles.mark}`}>{profile.firstName[0]}</span>
            </Link>
            <NavOrb visible={showOrb} calm={inner} />
          </span>
          {inner ? (
            <Link href="/" className={styles.tag}>
              ← Back to portfolio
            </Link>
          ) : (
            <span className={styles.tag}>Human Interface · v2100</span>
          )}
        </div>

        <div className={styles.clock}>
          <span className="liveDot" />
          <LiveClock />
          <span className={styles.tz}>{profile.timezone.label}</span>
        </div>

        <div className={styles.actions}>
          <AtmosphereSwitch />
          <Link href="/#transmit" className={styles.cta}>
            Connect
          </Link>
        </div>
      </div>
    </header>
  );
}
