"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { blogPosts } from "@/lib/collections/posts";
import Card from "./Card/Card";
import styles from "./Blog.module.css";

const Blog = () => {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const posts = blogPosts[locale] || blogPosts["ua"];
  const [showAll, setShowAll] = useState(false);

  const displayedPosts = showAll ? posts : posts.slice(0, 2);

  return (
    <section id="blog" className={styles.blog}>
      <div className={`${styles.useful} container`}>
        <div className={`${styles.cardList} ${showAll ? styles.showAll : ""}`}>
          <div className={`${styles.infoBlog} ${styles.card}`}>
            <div>
              <h2 className={styles.title}>{t("title")}</h2>
              <p className={styles.details}>{t("details")}</p>
            </div>
            {posts.length > 2 && (
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className={styles.buttonDesktop}
              >
                {showAll ? t("showLess") : t("viewAll")}
              </button>
            )}
          </div>

          {displayedPosts.map((post) => (
            <Card key={post.id} post={post} locale={locale} />
          ))}
        </div>

        {posts.length > 2 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className={styles.buttonMobile}
          >
            {showAll ? t("showLess") : t("viewAll")}
          </button>
        )}
      </div>
    </section>
  );
};

export default Blog;
