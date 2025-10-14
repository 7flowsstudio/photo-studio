"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { blogPosts } from "./data/posts";
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
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.details}>{t("details")}</p>
      </div>

      <div className={styles.cardList}>
        {displayedPosts.map((post) => (
          <Card key={post.id} post={post} locale={locale} />
        ))}
      </div>
      {posts.length > 2 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className={styles.button}
        >
          {showAll ? t("showLess") : t("viewAll")}
        </button>
      )}
    </section>
  );
};

export default Blog;
