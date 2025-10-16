import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CardText } from "@/lib/types/types";
import styles from "./Card.module.css";
import { useTranslations } from "next-intl";

type Props = {
  post: CardText;
  locale: string;
};

const Card = ({ post, locale }: Props) => {
  const t = useTranslations("Blog");
  return (
    <div className={styles.card}>
      <Image
        src={post.image}
        alt={post.title}
        width={342}
        height={280}
        className={styles.image}
      />
      <div className={styles.postContainer}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.text}>{post.text}</p>
        <Link href={`/${locale}/blog/${post.slug}`} className={styles.readMore}>
          {t("readMore")}
        </Link>
      </div>
    </div>
  );
};

export default Card;
