import Image from "next/image";
import { profile, type Project } from "@/data/profile";
import { getLinkPreview, type LinkPreview } from "@/lib/linkPreview";
import { ArrowUpRight } from "./icons";
import PreviewImage from "./PreviewImage";
import styles from "./Archive.module.css";

const Globe = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z" />
  </svg>
);

/** Samsung-Messages-style link card: picture on top, then title, description and domain. */
function Preview({ preview }: { preview: LinkPreview }) {
  const heading = preview.title || preview.siteName || preview.host;

  return (
    <a
      href={preview.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.preview}
      aria-label={`Open ${heading} (${preview.host})`}
    >
      {preview.image && (
        <PreviewImage src={preview.image} className={styles.previewMedia} imgClassName={styles.previewImg} />
      )}
      <span className={styles.previewBody}>
        <span className={styles.previewText}>
          <span className={styles.previewTitle}>{heading}</span>
          {preview.description && <span className={styles.previewDesc}>{preview.description}</span>}
          <span className={styles.previewHost}>
            <span className={styles.fav}>
              <Globe />
              {preview.favicon && (
                <PreviewImage src={preview.favicon} className={styles.favMedia} imgClassName={styles.favImg} />
              )}
            </span>
            <span className={styles.hostText}>{preview.host}</span>
          </span>
        </span>
        <span className={styles.go} aria-hidden>
          <ArrowUpRight size={16} />
        </span>
      </span>
    </a>
  );
}

function ProjectCard({ project, preview }: { project: Project; preview: LinkPreview | null }) {
  const tags = project.category
    .split("·")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className={styles.card}>
      {project.image && (
        <div className={styles.media}>
          <Image src={project.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className={styles.img} />
        </div>
      )}

      <div className={styles.body}>
        <span className={styles.meta}>
          {project.code} · {project.year}
        </span>
        <h3 className={styles.title}>{project.title}</h3>

        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((t) => (
              <li key={t} className={styles.tag}>
                {t}
              </li>
            ))}
          </ul>
        )}

        <p className={styles.summary}>{project.summary}</p>
      </div>

      {preview && <Preview preview={preview} />}
    </article>
  );
}

export default async function Archive() {
  const projects: Project[] = profile.projects;
  // Fetch every link preview in parallel (cached by Next.js, refreshed daily).
  const previews = await Promise.all(projects.map((p) => getLinkPreview(p.href)));

  return (
    <section id="archive" className={`container ${styles.section}`}>
      <div className="sectionHead">
        <h2 className="sectionTitle">
          The <span className="serif">archive</span>
        </h2>
        <span className="eyebrow">04 — Selected work</span>
      </div>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={p.code} project={p} preview={previews[i]} />
        ))}
      </div>
    </section>
  );
}
