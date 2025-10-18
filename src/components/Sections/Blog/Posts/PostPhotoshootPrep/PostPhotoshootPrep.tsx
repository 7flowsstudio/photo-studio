"use client";
import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { article } from "@/lib/collections/article";
import BookingShoot from "./BookingShoot/BookingShoot";
import styles from "./PostPhotoshootPrep.module.css";

const PostPhotoshootPrep = () => {
  const locale = useLocale();
  const currentArticle = article[locale] || article["ua"];

  return (
    <>
      <section className={styles.post}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h2 className={styles.title}>{currentArticle.title}</h2>
            <p style={{ whiteSpace: "pre-line" }} className={styles.details}>
              {currentArticle.details}
            </p>
          </div>
        </div>
        <Image
          src="/img/blog/photo.jpg"
          alt="photo"
          width={375}
          height={469}
          className={styles.imageMobile}
        />
        <Image
          src="/img/blog/photoshoot-portrait.jpg"
          alt="Photographer taking a portrait of a young woman in the studio"
          width={1440}
          height={427}
          className={styles.imageDesktop}
        />
        <div className={styles.container}>
          <div className={styles.adviceList}>
            {currentArticle.advice.map((item) => (
              <div key={item.id} className={styles.adviceItem}>
                <h3 className={styles.adviceTitle}>{item.title}</h3>
                <p className={styles.adviceDetails}>{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BookingShoot />
    </>
  );
};

export default PostPhotoshootPrep;
