import Image from "next/image";
import type { ReactNode } from "react";
import PageShell from "./PageShell";
import { NAV_ICONS, type NavIconName } from "./icons";
import styles from "./ExternalPortal.module.css";

/** In-site page for networks that cannot be shown inside another site (Facebook, LinkedIn). */
export default function ExternalPortal({
  eyebrow,
  title,
  accent,
  intro,
  network,
  handle,
  url,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  network: string;
  handle: string;
  url: string;
  icon: NavIconName;
  children?: ReactNode;
}) {
  const Icon = NAV_ICONS[icon];

  return (
    <PageShell eyebrow={eyebrow} title={title} accent={accent} intro={intro}>
      <div className={styles.panel}>
        <span className={styles.ring} aria-hidden />
        <div className={styles.id}>
          <span className={styles.avatar}>
            <Image src="/nav-portrait.png" alt="" width={84} height={84} />
          </span>
          <span className={styles.net}>
            <Icon size={22} />
          </span>
        </div>

        <div className={styles.text}>
          <span className={styles.line}>&gt; link --target {network.toLowerCase()}</span>
          <span className={styles.handle}>{handle}</span>
          <span className={styles.note}>SECURE CHANNEL · OPENS IN A NEW TAB</span>
        </div>

        <a href={url} target="_blank" rel="noreferrer" className={styles.go}>
          Open {network} ↗
        </a>
      </div>
      {children}
    </PageShell>
  );
}
