import {Item} from "@/lib/types/types";
import {ImageCard} from "@/components/Sections/Portfolio/Images/ImageCard/ImageCard";
import {useTranslations} from "next-intl";
import {useCallback, useEffect, useRef, useState} from "react";
import s from "./Slider.module.css";
import useEmblaCarousel from "embla-carousel-react";
import {EmblaCarouselType} from "embla-carousel";

type SliderProps = {
    images: Item[],
    onImageClick: (item: Item) => void
};

export const Slider = ({images, onImageClick}: SliderProps) => {
    const t = useTranslations('Portfolio');

    const [viewportRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
            dragFree: false,
        }
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(true);
    const [canScrollNext, setCanScrollNext] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const onSelect = useCallback((api: EmblaCarouselType) => {
        if (!api) return;
        setSelectedIndex(api.selectedScrollSnap());
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, [])

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);

        const onPointerDown = () => setIsDragging(true);
        const onPointerUp = () => setIsDragging(false);
        const onReInit = () => onSelect(emblaApi);
        const onSelectHandler = () => onSelect(emblaApi);

        emblaApi.on('pointerDown', onPointerDown);
        emblaApi.on('pointerUp', onPointerUp);
        emblaApi.on('select', onSelectHandler);
        emblaApi.on('reInit', onReInit);

        return () => {
            emblaApi.off('pointerDown', onPointerDown);
            emblaApi.off('pointerUp', onPointerUp);
            emblaApi.off('select', onSelectHandler);
            emblaApi.off('reInit', onReInit);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        emblaApi?.reInit()
    }, [images, emblaApi]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const handleSlideClick = useCallback((item: Item) => {
        if (isDragging) return;
        onImageClick(item);
    }, [isDragging, onImageClick]);

    if (images.length === 0) return null;

    return (
        <div className={s.slider}>
            <button
                type="button"
                onClick={scrollPrev}
                className={`${s.slider_btn} ${s.leftBtn}`}
                disabled={!emblaApi || !canScrollPrev}
            >
                ‹
            </button>

            <div className={s.viewport} ref={viewportRef}>
                <ul className={s.slider_list}>
                    {images.map((item) => (
                        <li key={item.id} className={s.slider_item}>
                            <ImageCard
                                url={item.url}
                                alt={t(item.alt)}
                                onClick={() => handleSlideClick(item)} />
                        </li>
                    ))}
                </ul>
            </div>

            <button
                type="button"
                onClick={scrollNext}
                className={`${s.slider_btn} ${s.rightBtn}`}
                disabled={!emblaApi || !canScrollNext}
            >
                ›
            </button>
        </div>
    )
}