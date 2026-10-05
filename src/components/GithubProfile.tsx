import type { GithubUser } from "@/lib/github";
import styles from "./GithubProfile.module.css";

export default function GithubProfile({ user }: { user: GithubUser }) {
  return (
    <div className={styles.strip}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.avatar} alt="" width={72} height={72} className={styles.avatar} />
      <div className={styles.who}>
        <span className={styles.name}>{user.name ?? user.login}</span>
        <a href={user.url} target="_blank" rel="noreferrer" className={styles.handle}>
          @{user.login} ↗
        </a>
        {user.bio && <span className={styles.bio}>{user.bio}</span>}
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>{user.publicRepos}</strong>
          <span>Repos</span>
        </div>
        <div className={styles.stat}>
          <strong>{user.followers}</strong>
          <span>Followers</span>
        </div>
      </div>
    </div>
  );
}
