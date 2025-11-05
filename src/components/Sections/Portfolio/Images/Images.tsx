import {useMemo} from "react";
import {ImageCard} from "@/components/Sections/Portfolio/Images/ImageCard/ImageCard";
import {useTranslations} from "next-intl";
import {Item} from "@/lib/types/types";
import s from "./Images.module.css";
import {Slider} from "@/components/Sections/Portfolio/Images/Slider/Slider";

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
    const filtered = useMemo(() => items.filter(item => item.category === category), [items, category]);


    if (filtered.length === 0) {
        return <p className={s.placeholder}>{t("noPhotos")}</p>
    }

    return  (
        <div className={expanded ? s.gridWrapper : s.sliderWrapper}>
            {expanded ? (
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

                </ul>) : (
                    <Slider images={filtered} onImageClick={onImageClick} />
            )
            }
        </div>
    )
}