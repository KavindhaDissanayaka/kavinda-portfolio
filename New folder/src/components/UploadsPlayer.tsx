import styles from "./UploadsPlayer.module.css";

/**
 * Backup when the video list can't be fetched: YouTube's own "all uploads" playlist player.
 * It needs only the channel id (UC… → UU…) and lists every upload inside the player itself.
 */
export default function UploadsPlayer({ channelId }: { channelId: string }) {
  const uploads = `UU${channelId.slice(2)}`;
  return (
    <div className={styles.screen}>
      <iframe
        className={styles.frame}
        src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploads}&rel=0`}
        title="All uploads"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
