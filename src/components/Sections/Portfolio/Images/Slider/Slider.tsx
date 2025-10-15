import {Item} from "@/lib/types/types";
import {ImageCard} from "@/components/Sections/Portfolio/Images/ImageCard/ImageCard";
import {useTranslations} from "next-intl";
import {useState} from "react";
import s from "./Slider.module.css";

type SliderProps = {
    images: Item[]
};

export const Slider = ({images}: SliderProps) => {
    const [index, setIndex] = useState(0);
    const t = useTranslations("Portfolio");

    const prev = () => setIndex (i => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setIndex (i => (i === images.length - 1 ? 0 : i + 1));

    if (images.length === 0) return null;

    return (
        <div className={s.slider}>
            <button
                type="button"
                onClick={prev}
                className={`${s.slider_btn} ${s.leftBtn}`}
            >‹</button>

            <ul
                className={s.slider_list}
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {images.map((item) => (
                    <li key={item.id} className={s.slider_item}>
                        <ImageCard url={item.url} alt={t(item.alt)} onClick={() => {}} />
                    </li>
                ))}
            </ul>
            <button
                type="button"
                onClick={next}
                className={`${s.slider_btn} ${s.rightBtn}`}
            >›</button>
        </div>
    )
}