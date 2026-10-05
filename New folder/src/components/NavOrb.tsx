"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { fullName, profile } from "@/data/profile";
import { NAV_ICONS } from "./icons";
import styles from "./NavOrb.module.css";

/**
 * Portrait action button + robotic navigation panel.
 * `visible` is controlled by Header: hidden while the hero portrait is on screen,
 * shown (with the warning-alarm animation) once it scrolls away.
 */
export default function NavOrb({ visible, calm = false }: { visible: boolean; calm?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // If the visitor scrolls back to the hero, the button disappears — close the menu with it.
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span ref={rootRef} className={styles.root}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.orb}
        data-visible={visible}
        data-open={open}
        data-calm={calm}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.face}>
          <Image src="/nav-portrait.png" alt="" width={46} height={46} className={styles.img} />
        </span>
        <span className={styles.warn} aria-hidden>
          !
        </span>
      </button>

      {open && (
        <nav id={panelId} className={styles.panel} aria-label={`${fullName} — links`}>
          <span className={styles.beam} aria-hidden />

          <div className={styles.head}>
            <span className={styles.title}>
              <span className={styles.blip} aria-hidden />
              NAV // CORE
            </span>
            <span className={styles.sig}>LINK · ONLINE</span>
          </div>

          <p className={styles.boot}>
            <span>&gt; initialising interface…</span>
          </p>

          <ul className={styles.list}>
            {profile.nav.map((item, i) => {
              const Icon = NAV_ICONS[item.icon];
              const offline = item.href === "";
              const internal = item.href.startsWith("/") || item.href.startsWith("#");
              const here = internal && !item.href.includes("#") && item.href === pathname;
              const status = offline ? "OFFLINE" : here ? "HERE" : internal ? "GO" : "OPEN ↗";
              const content = (
                <>
                  <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.icon}>
                    <Icon size={18} />
                  </span>
                  <span className={styles.text}>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.hint}>{item.hint}</span>
                  </span>
                  <span className={styles.status}>{status}</span>
                </>
              );
              const style = { "--i": i } as CSSProperties;
              const cls = `${styles.item} ${here ? styles.here : ""}`;

              return (
                <li key={item.label} style={style} className={styles.row}>
                  {offline ? (
                    <span className={`${styles.item} ${styles.off}`} aria-disabled="true">
                      {content}
                    </span>
                  ) : internal ? (
                    <Link href={item.href} className={cls} aria-current={here ? "page" : undefined} onClick={() => setOpen(false)}>
                      {content}
                    </Link>
                  ) : (
                    <a href={item.href} className={cls} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className={styles.foot}>
            <span>
              kd@interface:~$ <span className={styles.caret} aria-hidden />
            </span>
            <span>ESC · close</span>
          </div>
        </nav>
      )}
    </span>
  );
}
