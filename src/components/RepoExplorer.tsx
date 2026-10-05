"use client";

import { useMemo, useState } from "react";
import type { Repo } from "@/lib/github";
import { formatMonth } from "@/lib/format";
import { GitFork, Star } from "./icons";
import styles from "./RepoExplorer.module.css";

const LANG_COLORS: Record<string, string> = {
  "C#": "#178600",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572a5",
  Java: "#b07219",
  TSQL: "#e38c00",
  PLpgSQL: "#336790",
  PHP: "#4f5d95",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Dart: "#00b4ab",
  Kotlin: "#a97bff",
  Vue: "#41b883",
  SCSS: "#c6538c",
  "Jupyter Notebook": "#da5b0b",
};

type Sort = "updated" | "stars" | "name";

export default function RepoExplorer({ repos }: { repos: Repo[] }) {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("all");
  const [sort, setSort] = useState<Sort>("updated");
  const [hideForks, setHideForks] = useState(false);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [repos]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = repos.filter((r) => {
      if (hideForks && r.fork) return false;
      if (lang !== "all" && r.language !== lang) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q) ||
        r.topics.some((t) => t.includes(q))
      );
    });
    out.sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars || b.pushedAt.localeCompare(a.pushedAt);
      if (sort === "name") return a.name.localeCompare(b.name);
      return b.pushedAt.localeCompare(a.pushedAt);
    });
    return out;
  }, [repos, query, lang, sort, hideForks]);

  return (
    <div>
      <div className={styles.controls}>
        <label className={styles.search}>
          <span className="srOnly">Search repositories</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="> search repositories…"
            className={styles.input}
          />
        </label>

        <label className={styles.select}>
          <span className={styles.selectLabel}>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="updated">Recently updated</option>
            <option value="stars">Most stars</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>

        <label className={styles.check}>
          <input type="checkbox" checked={hideForks} onChange={(e) => setHideForks(e.target.checked)} />
          <span>Hide forks</span>
        </label>
      </div>

      {languages.length > 0 && (
        <div className={styles.chips} role="group" aria-label="Filter by language">
          <button type="button" className={styles.chip} aria-pressed={lang === "all"} onClick={() => setLang("all")}>
            All <span>{repos.length}</span>
          </button>
          {languages.map(([name, count]) => (
            <button key={name} type="button" className={styles.chip} aria-pressed={lang === name} onClick={() => setLang(name)}>
              <i className={styles.dot} style={{ background: LANG_COLORS[name] ?? "var(--accent)" }} />
              {name} <span>{count}</span>
            </button>
          ))}
        </div>
      )}

      <p className={styles.count} aria-live="polite">
        {list.length} of {repos.length} repositories
      </p>

      {list.length === 0 ? (
        <p className={styles.empty}>Nothing matches that search.</p>
      ) : (
        <ul className={styles.grid}>
          {list.map((r) => (
            <li key={r.id}>
              <a href={r.url} target="_blank" rel="noreferrer" className={styles.card}>
                <span className={styles.top}>
                  <span className={styles.name}>{r.name}</span>
                  {r.fork && <span className={styles.badge}>Fork</span>}
                  {r.archived && <span className={styles.badge}>Archived</span>}
                </span>
                <span className={styles.desc}>{r.description ?? "No description provided."}</span>
                {r.topics.length > 0 && (
                  <span className={styles.topics}>
                    {r.topics.slice(0, 4).map((t) => (
                      <span key={t} className={styles.topic}>
                        {t}
                      </span>
                    ))}
                  </span>
                )}
                <span className={styles.meta}>
                  {r.language && (
                    <span className={styles.metaItem}>
                      <i className={styles.dot} style={{ background: LANG_COLORS[r.language] ?? "var(--accent)" }} />
                      {r.language}
                    </span>
                  )}
                  {r.stars > 0 && (
                    <span className={styles.metaItem}>
                      <Star size={14} /> {r.stars}
                    </span>
                  )}
                  {r.forks > 0 && (
                    <span className={styles.metaItem}>
                      <GitFork size={14} /> {r.forks}
                    </span>
                  )}
                  <span className={styles.updated}>{formatMonth(r.pushedAt)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
