"use client";
import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { article } from "@/lib/collections/bookingShoot";
import styles from "./BookingShoot.module.css";

const BookingShoot = () => {
  const locale = useLocale();
  const currentArticle = article[locale] || article["ua"];

  return (
    <section className={styles.booking}>
      <div className="container">
        <div className={styles.info}>
          <h2 className={styles.title}>{currentArticle.title}</h2>
          <p className={styles.details}>{currentArticle.details}</p>
        </div>
        <a href="#contacts" className={styles.button}>
          {currentArticle.button}
        </a>
        <div className={styles.socialList}>
          <span>{currentArticle.social}:</span>
          <a href="#" aria-label="Instagram">
            <Image
              src="/img/icons/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
          </a>
          <a href="#" aria-label="Facebook">
            <Image
              src="/img/icons/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookingShoot;
