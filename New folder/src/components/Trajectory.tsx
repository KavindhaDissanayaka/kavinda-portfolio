import { profile } from "@/data/profile";
import styles from "./Trajectory.module.css";

export default function Trajectory() {
  return (
    <section id="trajectory" className="container section">
      <div className="sectionHead">
        <h2 className="sectionTitle">
          The <span className="serif">trajectory</span>
        </h2>
        <span className="eyebrow">03 — Timeline</span>
      </div>

      <ol className={styles.track}>
        {profile.timeline.map((m, i) => (
          <li key={i} className={styles.stop}>
            <span className={`${styles.node} ${m.current ? styles.nodeCurrent : ""}`} aria-hidden />
            <span className={`${styles.period} ${m.current ? styles.periodCurrent : ""}`}>{m.period}</span>
            <span className={styles.title}>{m.title}</span>
            <span className={styles.note}>
              {m.org} — {m.note}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
