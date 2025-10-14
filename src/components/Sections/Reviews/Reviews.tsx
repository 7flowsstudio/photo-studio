"use client";

import { useLocale, useTranslations } from "next-intl";
import Slider from "react-slick";
import Image from "next/image";
import CustomArrow from "./CustomArrow/CustomArrow";
import { reviews } from "@/lib/collections/reviews";
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
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  return (
    <section id="reviews" className={styles.reviews}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.wrapInfo}>
            <h2 className={styles.title}>{t("title")}</h2>

            <Slider {...settings} className={styles.slider}>
              {currentReviews.map((r, i) => (
                <div key={i} className={styles.slideWrapper}>
                  <div className={styles.textWrapper}>
                    <p className={styles.text}>{r.text}</p>
                    <p className={styles.author}>
                      — {r.author}, <span>{r.role}</span>
                    </p>
                  </div>

                  <div className={styles.photoWrapper}>
                    <Image
                      src="/img/reviews/photo.jpg"
                      alt="Photo"
                      width={343}
                      height={262}
                      className={styles.photo}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <Image
            src="/img/reviews/photo.jpg"
            alt="Photo"
            width={443}
            height={330}
            className={styles.photoDesktop}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
