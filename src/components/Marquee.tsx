import { Fragment } from "react";
import { profile } from "@/data/profile";
import styles from "./Marquee.module.css";

export default function Marquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const items = [...profile.marquee, ...profile.marquee];
  return (
    <div className={styles.band} aria-label={profile.marquee.map((m) => m.text).join(", ")}>
      <div className={styles.track} aria-hidden>
        {items.map((m, i) => (
          <Fragment key={i}>
            <span className={m.italic ? styles.italic : undefined}>{m.text}</span>
            <span className={styles.star}>✳</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
