import React from "react";
import s from "./Modal.module.css";
import { useTranslations } from "next-intl";

const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const t = useTranslations("Modal");
  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.title}>{t("title")}</h2>
        <p className={s.text}>{t("text")}</p>
        <button className={s.btnModal} onClick={onClose}>
          {t("button")}
        </button>
      </div>
    </div>
  );
};

export default Modal;
