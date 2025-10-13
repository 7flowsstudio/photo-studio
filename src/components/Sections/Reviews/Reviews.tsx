"use client";

import { useLocale, useTranslations } from "next-intl";
import Slider from "react-slick";
import Image from "next/image";
import CustomArrow from "./CustomArrow/CustomArrow";
import { reviews } from "./data/reviews";
import styles from "./Reviews.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const t = useTranslations("Reviews");
  const locale = useLocale();
  const currentReviews = reviews[locale] || reviews["ua"];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    adaptiveHeight: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  return (
    <section className={styles.reviews}>
      <h2 className={styles.title}>{t("title")}</h2>
      <Slider {...settings}>
        {currentReviews.map((r, i) => (
          <div key={i} className={styles.slide}>
            <p className={styles.text}>{r.text}</p>
            <p className={styles.author}>
              — {r.author}, <span>{r.role}</span>
            </p>
            <div className={styles.photoWrapper}>
              <Image
                src={r.photo}
                alt={r.author}
                width={343}
                height={262}
                className={styles.photo}
              />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Reviews;
