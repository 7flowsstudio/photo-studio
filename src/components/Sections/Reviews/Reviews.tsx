"use client";
import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Slider from "react-slick";
import Image from "next/image";
import CustomArrow from "./CustomArrow/CustomArrow";
import { reviews } from "@/lib/collections/reviews";
import styles from "./Reviews.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface SliderRef extends Slider {
  slickNext: () => void;
  slickPrev: () => void;
  slickGoTo: (index: number) => void;
}

const Reviews = () => {
  const t = useTranslations("Reviews");
  const locale = useLocale();
  const currentReviews = reviews[locale] || reviews["ua"];

  const sliderRef = useRef<SliderRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  const nextSlide = () => sliderRef.current?.slickNext();
  const prevSlide = () => sliderRef.current?.slickPrev();
  const goToSlide = (i: number) => sliderRef.current?.slickGoTo(i);

  return (
    <section id="reviews" className={styles.reviews}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.wrapInfo}>
            <h2 className={styles.title}>{t("title")}</h2>

            <Slider ref={sliderRef} {...settings} className={styles.slider}>
              {currentReviews.map((r, i) => (
                <div key={i} className={styles.slideWrapper}>
                  <div className={styles.textWrapper}>
                    <p className={styles.text}>{r.text}</p>
                    <p className={styles.author}>
                      — {r.author}, <span>{r.role}</span>
                    </p>
                  </div>
                </div>
              ))}
            </Slider>

            <div className={styles.photoWrapper}>
              <Image
                src="/img/reviews/photo.jpg"
                alt="Photo"
                width={343}
                height={262}
                className={styles.photo}
              />
            </div>

            <div className={styles.navigation}>
              <div className={styles.arrows}>
                <CustomArrow direction="prev" onClick={prevSlide} />
                <div className={styles.dots}>
                  {currentReviews.map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`${styles.dot} ${
                        index === currentSlide ? styles.activeDot : ""
                      }`}
                      onClick={() => goToSlide(index)}
                      aria-label="Next slide"
                    />
                  ))}
                </div>
                <CustomArrow direction="next" onClick={nextSlide} />
              </div>
            </div>
          </div>

          <Image
            src="/img/reviews/photo.jpg"
            alt="Photo"
            width={433}
            height={330}
            className={styles.photoDesktop}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
