import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./PageShell.module.css";

/** Common frame for the in-site pages: header (with the portrait menu), title block, footer. */
export default function PageShell({
  eyebrow,
  title,
  accent,
  intro,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    // One plain wrapper: Next's router scrolls to the first non-sticky element, which must be the page top.
    <div>
      <Header inner />
      <main id="top" className={`container ${styles.main}`}>
        <div className={styles.head}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="sectionTitle">
            {title} <span className="serif">{accent}</span>
          </h1>
          {intro && <p className={styles.intro}>{intro}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
