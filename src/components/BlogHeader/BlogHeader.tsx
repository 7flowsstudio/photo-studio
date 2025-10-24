"use client";
import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import styles from "./BlogHeader.module.css";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const BlogHeader = () => {
  const locale = useLocale();
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250 && window.innerWidth >= 768) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { key: "portfolio", href: `/${locale}/#portfolio` },
    { key: "services", href: `/${locale}/#services` },
    { key: "reviews", href: `/${locale}/#reviews` },
    { key: "blog", href: `/${locale}/#blog` },
    { key: "contacts", href: `/${locale}/#contacts` },
  ];

  const handleClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.desktop} container`}>
        <div className={styles.headerLeftDesktop}>
          <Link href="/">
            <Image
              src="/img/logo-black.svg"
              alt="logo"
              width={80}
              height={14}
              className={styles.logoMobileVersion}
            />

            <Image
              src="/img/logo-black.svg"
              alt="logo"
              width={106}
              height={18}
              className={styles.logoDesktopVersion}
            />
          </Link>
          <nav className={styles.navDesktop}>
            <ul className={styles.menuListDesktop}>
              {menuItems.map(({ key, href }) => (
                <li key={key}>
                  <a href={href}>{t(`menu.${key}`)}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.headerRightDesktop}>
          <LanguageSelector scrolled={scrolled} variant="dark" />
          <a className={styles.btnDesktop} href="#contacts">
            {t("button")}
          </a>
        </div>
      </div>

      <div className={styles.headerRightMobile}>
        <LanguageSelector scrolled={scrolled} variant="dark" />
        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.open : ""} ${
            scrolled ? styles.scrolledBurger : ""
          }`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`${styles.mobileMenu} ${menuOpen ? styles.show : ""}`}>
        <Link href="/">
          <Image
            src="/img/logo-black.svg"
            alt="logo"
            width={131}
            height={22}
            className={styles.logoMobile}
          />
        </Link>
        <ul className={styles.menuList}>
          {menuItems.map(({ key, href }) => (
            <li key={key}>
              <a href={href} onClick={handleClick}>
                {t(`menu.${key}`)}
              </a>
            </li>
          ))}
        </ul>
        <a className={styles.btnMobile} onClick={handleClick} href="#contacts">
          {t("button")}
        </a>
      </nav>
    </header>
  );
};

export default BlogHeader;
