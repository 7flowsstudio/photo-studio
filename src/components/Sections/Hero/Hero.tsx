import Image from "next/image";
import bgMobile from "../../../../public/img/hero/background-mobile.png";
import bgDesktop from "../../../../public/img/hero/background.png";
import { useTranslations } from "next-intl";
import styles from "./Hero.module.css";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className={styles.hero}>
      <Image
        src={bgMobile}
        fill
        className={styles.bgMobile}
        sizes="(max-width: 767px) 100vw"
        quality={60}
        placeholder="blur"
        priority
        alt=""
      />

      <Image
        src={bgDesktop}
        alt=""
        fill
        sizes="(min-width: 768px) 100vw"
        quality={75}
        className={styles.bgDesktop}
      />

      <div className={styles.overlay}></div>

      <div className="container">
        <div className={styles.wrapperInfo}>
          <div className={styles.content}>
            <span className={`${styles.bage} ${styles.desktop}`}>
              {t("bage")}
            </span>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.details}>{t("details")}</p>
            <a href="#contacts" className={`${styles.btn} ${styles.desktop}`}>
              {t("button")}
            </a>
          </div>

          <div className={styles.contentMobileBotom}>
            <span className={`${styles.bage} ${styles.mobile}`}>
              {t("bage")}
            </span>
            <a href="#contacts" className={`${styles.btn} ${styles.mobile}`}>
              {t("button")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
