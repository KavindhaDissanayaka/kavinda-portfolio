import styles from "./FacebookEmbeds.module.css";

const ALLOW = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";

/**
 * Facebook's official iframe embeds. Posts must be Public; a Page timeline needs a Facebook *Page*.
 * (Browsers with strict tracking protection, or ad-blockers, may block these frames.)
 */
export default function FacebookEmbeds({ posts, pageUrl }: { posts: string[]; pageUrl: string }) {
  const enc = encodeURIComponent;

  return (
    <section className={styles.wrap} aria-label="Facebook posts">
      <span className="eyebrow">[ FEED ] — From Facebook</span>

      {pageUrl && (
        <div className={styles.card}>
          <iframe
            className={styles.frame}
            title="Facebook page timeline"
            src={`https://www.facebook.com/plugins/page.php?href=${enc(pageUrl)}&tabs=timeline&width=500&height=700&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
            height={700}
            loading="lazy"
            allow={ALLOW}
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}

      {posts.length > 0 && (
        <div className={styles.grid}>
          {posts.map((url) => {
            const isVideo = /\/(videos?|watch|reel)\b/.test(url);
            const plugin = isVideo ? "video" : "post";
            return (
              <div key={url} className={styles.card}>
                <iframe
                  className={styles.frame}
                  title="Facebook post"
                  src={`https://www.facebook.com/plugins/${plugin}.php?href=${enc(url)}&show_text=true&width=500`}
                  height={isVideo ? 420 : 640}
                  loading="lazy"
                  allow={ALLOW}
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
