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
}

export const Images = ({items, category, expanded}: PhotoProps) => {
    const t = useTranslations("Portfolio");
    const filtered = useMemo(() => items.filter(item => item.category === category), [items, category]);
    const visible = expanded ? filtered : filtered.slice(0, 4);

    if (filtered.length === 0) {
        return <p className={s.placeholder}>{t("noPhotos")}</p>
    }

    return  (
        <div className={expanded ? s.gridWrapper : s.sliderWrapper}>
            {expanded ? (
                <ul className={s.image_list}>
                    {visible.map(item => (
                        <li key={item.id} className={s.image_item}>
                            <ImageCard
                                url={item.url}
                                alt={t(item.alt)}
                                onClick={() => {}}
                            />
                        </li>
                    ))}

                </ul>) : (
                    <Slider images={visible} />
            )
            }
        </div>
    )
}