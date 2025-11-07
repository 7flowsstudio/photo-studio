import {Fragment, useCallback, useMemo, useState} from "react";
import {ImageCard} from "@/components/Sections/Portfolio/Images/ImageCard/ImageCard";
import {useTranslations} from "next-intl";
import {Item} from "@/lib/types/types";
import s from "./Images.module.css";
import {Slider} from "@/components/Sections/Portfolio/Images/Slider/Slider";
import {useMediaPoints} from "@/lib/hooks/useMediaPoints";
import Image from "next/image";

type PhotoProps = {
    items: Item[];
    category: string;
    visibleCount?: number;
    onLoadMore?: () => void;
    onOpenModal?: (item: Item) => void;
    expanded: boolean;
    className?: string;
    onImageClick: (image: Item) => void;
}

export const Images = ({items, category, expanded, onImageClick}: PhotoProps) => {
    const t = useTranslations("Portfolio");
    const { isMobile } = useMediaPoints();
    const [expandedMobile, setExpandedMobile] = useState<Item | null>(null);
    const filtered = useMemo(() => items.filter(item => item.category === category), [items, category]);

    const handleMobileExpand = useCallback((item: Item) => {
        setExpandedMobile(prev => (prev?.id === item.id ? null : item));
    }, []);

    const handleCollapse = useCallback(() => setExpandedMobile(null), []);

    if (filtered.length === 0) {
        return <p className={s.placeholder}>{t("noPhotos")}</p>
    }

    const MOBILE_COLUMNS = 2;
    const activeIndex = expandedMobile
        ? filtered.findIndex(i => i.id === expandedMobile.id)
        : -1;
    const activeRow = activeIndex >= 0 ? Math.floor(activeIndex / MOBILE_COLUMNS) : -1;

    return  (
        <div className={expanded ? s.gridWrapper : s.sliderWrapper}>
            {expanded ? (
                isMobile ? (
                        <>
                            {expandedMobile && activeRow === 0 && (
                                <div className={s.expanderStandalone}>
                                    <button
                                        type="button"
                                        className={s.expanderClose}
                                        aria-label="Close"
                                        onClick={() => setExpandedMobile(null)}
                                    >
                                        <Image className={s.expandedPhoto} src="/img/icons/close.svg" alt="close" width={12} height={12} />
                                    </button>
                                    <img
                                        src={expandedMobile.url}
                                        alt={t(expandedMobile.alt)}
                                        className={s.expanderImg}
                                    />
                                </div>
                            )}

                            <ul className={s.image_list}>
                                {filtered.map((item, idx) => {
                                    const row = Math.floor(idx / MOBILE_COLUMNS);
                                    const isFirstInRow = idx % MOBILE_COLUMNS === 0;

                                    return (
                                        <Fragment key={item.id}>
                                            {expandedMobile && activeRow > 0 && row === activeRow && isFirstInRow && (
                                                <li className={s.expanderCell} key={`expander-${idx}`}>
                                                    <div className={s.expanderBox} onClick={handleCollapse}>
                                                        <img
                                                            src={expandedMobile.url}
                                                            alt={t(expandedMobile.alt)}
                                                            className={s.expanderImg}
                                                        />
                                                    </div>
                                                </li>
                                            )}

                                            <li
                                                className={s.image_item}
                                                onClick={() => handleMobileExpand(item)}
                                            >
                                                <ImageCard url={item.url} alt={t(item.alt)} onClick={() => {}} />
                                            </li>
                                        </Fragment>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <ul className={s.image_list}>
                        {filtered.map(item => (
                            <li key={item.id} className={s.image_item} onClick={() => onImageClick(item)}>
                                <ImageCard
                                    url={item.url}
                                    alt={t(item.alt)}
                                    onClick={() => onImageClick(item)}
                                />
                            </li>
                        ))}
                        </ul>)
                    ): (
                    <Slider images={filtered} onImageClick={onImageClick} />
            )
            }
        </div>
    )
}