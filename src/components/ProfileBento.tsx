import { profile } from "@/data/profile";
import styles from "./ProfileBento.module.css";

export default function ProfileBento() {
  const { about, stats } = profile;
  return (
    <section id="index" className="container section">
      <div className="sectionHead">
        <h2 className="sectionTitle">
          The <span className="serif">profile</span>
        </h2>
        <span className="eyebrow">01 — Index</span>
      </div>

      <div className={styles.bento}>
        <article className={`${styles.card} ${styles.who}`}>
          <span className={styles.label}>Who</span>
          <p className={`serif ${styles.statement}`}>{about.who}</p>
          <p className={styles.detail}>{about.detail}</p>
        </article>

        <article className={`${styles.card} ${styles.now}`}>
          <span className={styles.ringLarge} aria-hidden />
          <span className={styles.ringSmall} aria-hidden />
          <span className={`${styles.label} ${styles.nowLabel}`}>
            <span className="liveDot" /> Currently
          </span>
          <p className={styles.nowText}>{about.currently}</p>
          <span className={styles.nowMeta}>Updated {about.currentlyUpdated}</span>
        </article>

        {stats.map((s) => (
          <article key={s.label} className={`${styles.card} ${styles.stat}`}>
            <span className={styles.statValue}>
              {s.value}
              {s.suffix && <span className={`serif ${styles.statSuffix}`}>{s.suffix}</span>}
            </span>
            <span className={styles.statLabel}>{s.label}</span>
          </article>
        ))}

        <article className={`${styles.card} ${styles.coords}`}>
          <span className={`${styles.label} ${styles.coordsLabel}`}>Coordinates</span>
          <ul className={styles.coordsList}>
            {about.coordinates.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
