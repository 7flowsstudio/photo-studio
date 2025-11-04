import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import s from "./About.module.css";

const About = () => {
  const t = useTranslations("About");
  return (
    <section className={s.about}>
      <div className={s.containerAbout}>
        <div className={s.imgAbout}>
          <Image
            src="/img/about/aboutme.jpg"
            alt="Image 1"
            width={432}
            height={502}
            sizes="(max-width: 768px) 375px, 432px"
            style={{ width: "100%", height: "100%" }}
            priority
          />
        </div>
        <div className={s.textAboutCont}>
          <h2 className={s.titleAbout}>{t("title")}</h2>
          <p className={s.textAbout}>{t("text")}</p>
          <p className={s.textAboutLast}>{t("details")}</p>
        </div>
        <div className={s.imgAbout}>
          <Image
            src="/img/about/aboutme2.jpg"
            alt="Image 2"
            width={546}
            height={502}
            sizes="(max-width: 768px) 375px, 546px"
            style={{ width: "100%", height: "100%" }}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default About;
