import type { ReactNode } from "react";
import styles from "./Notice.module.css";

/** Friendly panel for "couldn't load" states. */
export default function Notice({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  return (
    <div className={styles.box} role="status">
      <span className={styles.code}>{code}</span>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
