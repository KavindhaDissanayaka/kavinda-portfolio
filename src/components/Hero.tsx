import Image from "next/image";
import { fullName, profile } from "@/data/profile";
import { ArrowRight } from "./icons";
import CurrentYear from "./CurrentYear";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={`container ${styles.hero}`}>
      <div className={styles.copy}>
        <span className={`eyebrow ${styles.kicker}`}>[ Subject 001 ] — Earth, year <CurrentYear /></span>

        <h1 className={styles.name}>
          <span className={`serif ${styles.first}`}>{profile.firstName}</span>
          <span className={styles.last}>
            {profile.lastName}
            <span className={styles.dot}>.</span>
          </span>
        </h1>

        <p className={styles.lede}>
          {profile.role}, shaping <span className={`serif ${styles.ledeSerif}`}>{profile.focus}</span> for a calmer,
          more human future.
        </p>

        <div className={styles.ctas}>
          <a href="#archive" className="pill pillAccent">
            Enter the archive <ArrowRight />
          </a>
          <a href="#index" className="pill pillGhost">
            Read the profile
          </a>
        </div>
      </div>

      <div className={styles.lensWrap}>
        <div className={styles.lens}>
          <div className={styles.orbitOuter} aria-hidden>
            <span className={styles.satelliteSmall} />
          </div>
          <div className={styles.orbitInner} aria-hidden>
            <span className={styles.satellite} />
          </div>

          <div className={styles.frame} id="main-profile-image">
            <Image
              src={profile.portrait}
              alt={`Portrait of ${fullName}`}
              width={800}
              height={800}
              priority
              className={styles.portrait}
            />
          </div>

          <div className={`${styles.hud} ${styles.hudId}`}>
            <div className={styles.hudCard}>
              <span className={styles.hudLabel}>ID</span>
              <span className="mono">{profile.initials} / <CurrentYear /></span>
            </div>
            <span className={styles.hudLine} />
          </div>

          <div className={`${styles.hud} ${styles.hudStatus}`}>
            <span className={styles.hudLine} />
            <div className={styles.hudCard}>
              <span className={styles.hudLabel}>Status</span>
              <span className={styles.hudStatusText}>
                <span className="liveDot" />
                {profile.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
