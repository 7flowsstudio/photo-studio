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
        <div className="container">
          <div className={styles.info}>
            <h2 className={styles.title}>{currentArticle.title}</h2>
            <p className={styles.details}>{currentArticle.details}</p>
          </div>
          <Image
            src="/img/blog/photo.jpg"
            alt="photo"
            width={375}
            height={469}
            className={styles.image}
          />
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
