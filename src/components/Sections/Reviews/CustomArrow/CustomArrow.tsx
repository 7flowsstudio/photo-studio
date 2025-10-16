import { FC } from "react";
import { ArrowProps } from "@/lib/types/types";
import Image from "next/image";
import leftArrow from "./left-arrow.svg";
import rightArrow from "./right-arrow.svg";
import styles from "./CustomArrow.module.css"; 

const CustomArrow: FC<ArrowProps> = ({ className, onClick, direction }) => {
  const arrowImg = direction === "next" ? rightArrow : leftArrow;

  return (
    <div
      className={`${className} ${styles.arrow}`}
      onClick={onClick}
    >
      <Image src={arrowImg} alt={`${direction} arrow`} width={24} height={24} />
    </div>
  );
};

export default CustomArrow;
