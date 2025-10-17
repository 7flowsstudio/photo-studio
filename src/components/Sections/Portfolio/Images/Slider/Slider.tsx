import {Item} from "@/lib/types/types";
import {ImageCard} from "@/components/Sections/Portfolio/Images/ImageCard/ImageCard";
import {useTranslations} from "next-intl";
import {useCallback, useEffect, useRef, useState} from "react";
import s from "./Slider.module.css";
import useEmblaCarousel from "embla-carousel-react";
import {EmblaCarouselType} from "embla-carousel";

type SliderProps = {
    images: Item[]
};

export const Slider = ({images}: SliderProps) => {
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

    const onSelect = useCallback((api: EmblaCarouselType) => {
        if (!api) return;
        setSelectedIndex(api.selectedScrollSnap());
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, [])

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on('select', () => onSelect(emblaApi));
        emblaApi.on('reInit', () => onSelect(emblaApi));
    }, [emblaApi, onSelect]);

    useEffect(() => {
        emblaApi?.reInit()
    }, [images, emblaApi]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
                                onClick={() => {}} />
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