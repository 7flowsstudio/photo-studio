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
        <div onClick={onClick}>
            <Image
                src={url}
                alt={alt}
                width={343}
                height={468}
                className={s.photo}
            />
        </div>
    )
}
