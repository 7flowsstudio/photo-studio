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
    // const [visibleCount, setVisibleCount] = useState<number>(4);
    // const [activeImage, setActiveImage] = useState<Item | null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleSelectCategory = useCallback((type: string) => {
        setSelectedCategory(type);
        setExpanded(false)
    }, []);

    // const handleLoadMore = useCallback(() => {
    //     const l = items.filter(item => item.category === selectedCategory).length;
    //     setVisibleCount(v => Math.min(v + 12, l));
    // }, [selectedCategory])

    const toggleExpanded =() => setExpanded(prev => !prev);

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
                expanded={expanded}
                // visibleCount={visibleCount}
                // onLoadMore={handleLoadMore}
                // onOpenModal={setActiveImage}
            />

            <button
                type="button"
                className={s.toggle_btn}
                onClick={toggleExpanded}
            >
                {expanded ? t("showLessBtn") : t("loadMoreBtn")}
            </button>
        </section>
    )
}
