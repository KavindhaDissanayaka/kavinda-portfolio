import { profile } from "@/data/profile";
import CurrentYear from "./CurrentYear";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <div className={styles.wordmark} aria-hidden>
        <span className="serif">{profile.firstName}</span> {profile.lastName}
      </div> */}
      <div className={`container ${styles.meta}`}>
        <span>
          © <CurrentYear /> · Made on Earth
        </span>
        <span>
          {profile.firstName} {profile.lastName}
        </span>
        <a href="#top">Return to orbit ↑</a>
      </div>
    </footer>
  );
}
