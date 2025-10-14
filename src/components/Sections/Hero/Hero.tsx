import React from "react";
import { useTranslations } from "next-intl";

import styles from "./Hero.module.css";

const Hero = () => {
  const t = useTranslations("Hero");
  return (
    <section className={styles.hero}>
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
          <span className={`${styles.bage} ${styles.mobile}`}>{t("bage")}</span>
          <a href="#contacts" className={`${styles.btn} ${styles.mobile}`}>
            {t("button")}
          </a>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
