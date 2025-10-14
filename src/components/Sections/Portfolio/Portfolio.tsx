'use client'

import {useTranslations} from "next-intl";
import {Categories} from "@/components/Sections/Portfolio/Categories/Categories";
import s from "./Portfolio.module.css"
import {Images} from "@/components/Sections/Portfolio/Images/Images";
import {items} from "@/lib/collections/portfolio";
import {useCallback, useState} from "react";
import {Item} from "@/lib/types/types";

export const Portfolio = () => {
    const t = useTranslations("Portfolio");

    const [selectedCategory, setSelectedCategory] = useState<string>("portraits");
    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [activeImage, setActiveImage] = useState<Item | null>(null);

    const handleSelectCategory = useCallback((type: string) => {
        setSelectedCategory(type);
        setVisibleCount(4);
        setActiveImage(null);
    }, []);

    const handleLoadMore = useCallback(() => {
        const l = items.filter(item => item.category === selectedCategory).length;
        setVisibleCount(v => Math.min(v + 12, l));
    }, [selectedCategory])

    return (
        <section className={s.portfolio_section}>
            <h2 className={s.portfolio_title}>{t("title")}</h2>
            <Categories
                selectedType={selectedCategory}
                onSelect={handleSelectCategory}
            />
            <Images
                items={items as Item[]}
                category={selectedCategory}
                visibleCount={visibleCount}
                onLoadMore={handleLoadMore}
                onOpenModal={setActiveImage}
            />
        </section>
    )
}
