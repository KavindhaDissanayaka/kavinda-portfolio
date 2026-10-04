"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import AtmosphereSwitch from "./AtmosphereSwitch";
import LiveClock from "./LiveClock";
import NavOrb from "./NavOrb";
import styles from "./Header.module.css";

export default function Header() {
  // True once the hero portrait has scrolled out of view.
  const [showOrb, setShowOrb] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <header className={styles.wrap}>
      <div className={styles.bar}>
        <div className={styles.brand}>
          <span className={styles.slot}>
            {/* Initial shown while the hero portrait is visible; the portrait button replaces it afterwards. */}
            <a
              href="#top"
              className={`${styles.markLink} ${showOrb ? styles.markHidden : ""}`}
              aria-label={`${profile.firstName} ${profile.lastName} — home`}
              tabIndex={showOrb ? -1 : 0}
            >
              <span className={`serif ${styles.mark}`}>{profile.firstName[0]}</span>
            </a>
            <NavOrb visible={showOrb} />
          </span>
          <span className={styles.tag}>Human Interface · v2100</span>
        </div>

        <div className={styles.clock}>
          <span className="liveDot" />
          <LiveClock />
          <span className={styles.tz}>{profile.timezone.label}</span>
        </div>

        <div className={styles.actions}>
          <AtmosphereSwitch />
          <a href="#transmit" className={styles.cta}>
            Connect
          </a>
        </div>
      </div>
    </header>
  );
}
