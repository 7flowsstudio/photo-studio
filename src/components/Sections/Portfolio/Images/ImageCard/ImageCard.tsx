import Image from "next/image";
import React from "react";
import s from "./ImageCard.module.css";

type Props = {
    url: string;
    alt: string;
    onClick: () => void;
}

export const ImageCard = ({url, alt, onClick}:Props) => {
    return (
        <div className={s.card} onClick={onClick}>
            <Image
                src={url}
                alt={alt}
                fill
                sizes="(max-width: 767px) 100vw, (min-width: 768px) 100vw"
                className={s.photo}
            />
        </div>
    )
}
