"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./Header.module.css";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const Header = () => {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuItems = [
    { key: "portfolio", href: "#portfolio" },
    { key: "services", href: "#services" },
    { key: "reviews", href: "#reviews" },
    { key: "blog", href: "#blog" },
    { key: "contacts", href: "#contacts" },
  ];

  return (
    <header className={styles.header}>
      <div className={`${styles.desktop} container`}>
        <a href="/">
          <img src="/img/logo.svg" alt="logo" className={styles.logoDesktop} />
        </a>

        <nav className={styles.navDesktop}>
          <ul className={styles.menuListDesktop}>
            {menuItems.map(({ key, href }) => (
              <li key={key}>
                <a href={href}>{t(`menu.${key}`)}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerRightDesktop}>
          <LanguageSelector />
          <a className={styles.btnDesktop} href="#">
            {t("button")}
          </a>
        </div>
      </div>

      <div className={styles.headerRightMobile}>
        <LanguageSelector />
        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && (
        <nav className={`${styles.mobileMenu} ${menuOpen ? styles.show : ""}`}>
          <a href="#">
            <img src="/img/logo.svg" alt="logo" className={styles.logoMobile} />
          </a>
          <ul className={styles.menuList}>
            {menuItems.map(({ key, href }) => (
              <li key={key}>
                <a href={href}>{t(`menu.${key}`)}</a>
              </li>
            ))}
          </ul>
          <a className={styles.btnMobile} href="#">
            {t("button")}
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
