"use client";

import { useState } from "react";
import type { YtVideo } from "@/lib/youtube";
import { formatDate } from "@/lib/format";
import { Play } from "./icons";
import styles from "./YoutubeGallery.module.css";

/** Plays videos inside the page. The player only loads when asked, so the page stays fast. */
export default function YoutubeGallery({ videos }: { videos: YtVideo[] }) {
  const [activeId, setActiveId] = useState(videos[0].id);
  const [playing, setPlaying] = useState(false);
  const active = videos.find((v) => v.id === activeId) ?? videos[0];

  const pick = (id: string) => {
    setActiveId(id);
    setPlaying(true);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.stage}>
        <div className={styles.screen}>
          {playing ? (
            <iframe
              key={active.id}
              className={styles.frame}
              src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button type="button" className={styles.facade} onClick={() => setPlaying(true)} aria-label={`Play ${active.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.thumb} alt="" className={styles.thumb} />
              <span className={styles.scan} aria-hidden />
              <span className={styles.playBtn}>
                <Play size={30} />
              </span>
              <span className={`${styles.corner} ${styles.tl}`} aria-hidden />
              <span className={`${styles.corner} ${styles.tr}`} aria-hidden />
              <span className={`${styles.corner} ${styles.bl}`} aria-hidden />
              <span className={`${styles.corner} ${styles.br}`} aria-hidden />
            </button>
          )}
        </div>
        <div className={styles.now}>
          <span className={styles.nowLabel}>{playing ? "NOW PLAYING" : "READY"}</span>
          <h2 className={styles.nowTitle}>{active.title}</h2>
          <span className={styles.nowDate}>{formatDate(active.published)}</span>
        </div>
      </div>

      <ul className={styles.list} aria-label="Latest videos">
        {videos.map((v, i) => (
          <li key={v.id}>
            <button
              type="button"
              className={`${styles.item} ${v.id === activeId ? styles.itemActive : ""}`}
              onClick={() => pick(v.id)}
              aria-current={v.id === activeId ? "true" : undefined}
            >
              <span className={styles.itemThumb}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.thumb} alt="" loading="lazy" />
              </span>
              <span className={styles.itemText}>
                <span className={styles.itemIdx}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.itemTitle}>{v.title}</span>
                <span className={styles.itemDate}>{formatDate(v.published)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
