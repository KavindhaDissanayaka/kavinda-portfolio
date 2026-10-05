"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import CurrentYear from "./CurrentYear";
import AtmosphereSwitch from "./AtmosphereSwitch";
import LiveClock from "./LiveClock";
import NavOrb from "./NavOrb";
import { Download, Send } from "./icons";
import styles from "./Header.module.css";

/**
 * The portrait action button always sits top-left.
 * Home page: it starts in its normal (calm) state and switches to the warning
 * alarm once the hero portrait scrolls out of view — and calms down again on the way back.
 * `inner` = sub-pages (/youtube, /github …): no hero portrait, so it stays calm and a back link is shown.
 */
export default function Header({ inner = false }: { inner?: boolean }) {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (inner) return;
    const mainPortrait = document.getElementById("main-profile-image");
    if (!mainPortrait) return;

    const update = () => {
      const headerHeight = 90;
      setAlert(mainPortrait.getBoundingClientRect().bottom <= headerHeight);
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
          <NavOrb alert={!inner && alert} />
          {inner ? (
            <Link href="/" className={styles.tag}>
              ← Back to portfolio
            </Link>
          ) : (
            <span className={styles.tag}>Human Interface · v<CurrentYear /></span>
          )}
        </div>

        <div className={styles.clock}>
          <span className="liveDot" />
          <LiveClock />
          <span className={styles.tz}>{profile.timezone.label}</span>
        </div>

        <div className={styles.actions}>
          <AtmosphereSwitch />
          <a
            href={profile.cv.href}
            download={profile.cv.fileName}
            className={`${styles.btn} ${styles.cv}`}
            aria-label="Download CV (PDF)"
            title="Download CV (PDF)"
          >
            <Download size={17} />
            <span className={styles.btnText}>Download CV</span>
          </a>
          <Link href="/#transmit" className={`${styles.btn} ${styles.cta}`} aria-label="Connect" title="Connect">
            <Send size={16} />
            <span className={styles.btnText}>Connect</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
