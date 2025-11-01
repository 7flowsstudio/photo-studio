import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import s from "./Footer.module.css";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <div>
      <div className={s.containerFooter}>
        <h3>{t("title")}</h3>
        <div className={s.wrappImg}>
          <Image
            src="/img/footer/footer.png"
            alt="Image footer"
            width={200}
            height={200}
            sizes="(max-width: 768px) 375px, 432px"
            style={{ width: "100%", height: "100%" }}
            priority
          />
        </div>
        <ul className={s.list}>
          <li className={s.element}>
            {" "}
            <Image
              src="/img/icons/icon-tel.svg"
              alt="tel"
              width={24}
              height={24}
            />
            +380 97 497 14 78
          </li>
          <li className={s.element}>
            {" "}
            <Image
              src="/img/icons/icon-mail.svg"
              alt="mail"
              width={24}
              height={24}
            />
            kobrynkhrystyna@gmail.com
          </li>
          <li className={s.element}>
            {" "}
            <Image
              src="/img/icons/icon-map.svg"
              alt="map"
              width={24}
              height={24}
            />
            {t("map")}
          </li>
        </ul>
        <div className={s.wrappSocMedia}>
          <Image
            src="/img/icons/icon-inst.svg"
            alt="instagram"
            width={36}
            height={36}
          />
          <Image
            src="/img/icons/icon-faceb.svg"
            alt="facebook"
            width={36}
            height={36}
          />
        </div>
      </div>
      <Image
        src="/img/footer/insert-desc.png"
        alt="Image footer"
        width={200}
        height={200}
        sizes="(max-width: 768px) 375px, 432px"
        style={{ width: "100%", height: "100%" }}
        priority
      />
    </div>
  );
};

export default Footer;
