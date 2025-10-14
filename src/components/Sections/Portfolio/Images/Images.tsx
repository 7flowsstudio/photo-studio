import {useMemo} from "react";
import {ImageCard} from "@/components/Sections/Portfolio/Images/ImageCard/ImageCard";
import {useTranslations} from "next-intl";
import {Item} from "@/lib/types/types";

type PhotoProps = {
    items: Item[];
    category: string;
    visibleCount: number;
    onLoadMore: () => void;
    onOpenModal: (item: Item) => void;
    className?: string;
}

export const Images = ({items, category, visibleCount, onLoadMore, onOpenModal, className}: PhotoProps) => {
    const t = useTranslations("Portfolio");
    const filtered = useMemo(() => items.filter(item => item.category === category), [items, category]);
    const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
    const hasMore = visibleCount < filtered.length;

    if (filtered.length === 0) {
        return <p>{t("noPhotos")}</p>
    }

    return  (
        <ul>
            {visible.map(item => (
                <li key={item.id}>
                    <ImageCard
                        url={item.url}
                        alt={t(item.alt)}
                        onClick={() => onOpenModal(item)}
                    />
                </li>
            ))}
            {hasMore && (
                <button type="button" onClick={onLoadMore}>
                    {t("loadMoreBtn")}
                </button>
            )}
        </ul>
    )
}