'use client'

import {useTranslations} from "next-intl";
import {Categories} from "@/components/Sections/Portfolio/Categories/Categories";
import s from "./Portfolio.module.css"
import {Images} from "@/components/Sections/Portfolio/Images/Images";
import {items} from "@/lib/collections/portfolio";
import {useCallback,  useRef, useState} from "react";
import {Item} from "@/lib/types/types";
import ImageModal from "@/components/Sections/Portfolio/ImageModal/ImageModal";

export const Portfolio = () => {
    const t = useTranslations("Portfolio");

    const [selectedCategory, setSelectedCategory] = useState<string>("portraits");
    const [expanded, setExpanded] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activeImage, setActiveImage] = useState<Item | null>(null);

    const sectionRef = useRef<HTMLElement>(null);

    const filtered = items.filter(item => item.category === selectedCategory);

    const scrollToSectionTop = useCallback(() => {
        requestAnimationFrame(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }, []);

    const handleSelectCategory = useCallback((type: string) => {
        setSelectedCategory(type);
        setExpanded(false);
        scrollToSectionTop();
    }, [scrollToSectionTop]);

    const toggleExpanded = useCallback(() => {
        setExpanded(prev => {
            const next = !prev;
            if (prev && !next) {
                scrollToSectionTop();
            }
            return next;
        });
    }, [scrollToSectionTop]);

    const handleImageClick = useCallback((image: Item) => {
        setActiveImage(image);
        setModalOpen(true);
    }, [])

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        setActiveImage(null);
    }, [])

    return (
        <section id="portfolio" ref={sectionRef} className={s.portfolio_section}>
            <h2 className={s.portfolio_title}>{t("title")}</h2>

            <Categories
                selectedType={selectedCategory}
                onSelect={handleSelectCategory}
            />

            <Images
                items={items as Item[]}
                category={selectedCategory}
                expanded={expanded}
                onImageClick={handleImageClick}
            />

            {filtered.length !== 0 ? (<button
                type="button"
                className={s.toggle_btn}
                onClick={toggleExpanded}
            >
                {expanded ? t("showLessBtn") : t("loadMoreBtn")}
            </button>) : null}

            <ImageModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                image={activeImage}
                alt={activeImage ? t(activeImage.alt) : ""}
            />
        </section>
    )
}
