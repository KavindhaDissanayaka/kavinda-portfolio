import Image from "next/image";
import { profile, type Project } from "@/data/profile";
import { ArrowUpRight } from "./icons";
import styles from "./Archive.module.css";

function Media({ project, className }: { project: Project; className: string }) {
  return (
    <div className={className}>
      {project.image ? (
        <Image src={project.image} alt="" fill sizes="(max-width: 900px) 100vw, 66vw" className={styles.img} />
      ) : (
        <span className={styles.placeholder}>[Project image]</span>
      )}
    </div>
  );
}

export default function Archive() {
  const [featured, ...rest] = profile.projects;

  return (
    <section id="archive" className={`container ${styles.section}`}>
      <div className="sectionHead">
        <h2 className="sectionTitle">
          The <span className="serif">archive</span>
        </h2>
        <span className="eyebrow">04 — Selected work</span>
      </div>

      <div className={styles.grid}>
        {featured && (
          <a href={featured.href} className={`${styles.card} ${styles.featured}`}>
            <div className={styles.featuredMediaWrap}>
              <Media project={featured} className={styles.featuredMedia} />
              <span className={styles.badge}>Featured</span>
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.featuredText}>
                <span className={styles.meta}>
                  {featured.code} · {featured.category} · {featured.year}
                </span>
                <span className={styles.featuredTitle}>{featured.title}</span>
                <span className={styles.summary}>{featured.summary}</span>
              </div>
              <span className={styles.go}>
                <ArrowUpRight />
              </span>
            </div>
          </a>
        )}

        <div className={styles.side}>
          {rest.map((p) => (
            <a key={p.code} href={p.href} className={`${styles.card} ${styles.small}`}>
              <Media project={p} className={styles.smallMedia} />
              <div className={styles.smallBody}>
                <span className={styles.meta}>
                  {p.code} · {p.year}
                </span>
                <span className={styles.smallTitle}>{p.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
