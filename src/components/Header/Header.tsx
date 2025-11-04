"use client";
import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./Header.module.css";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const menuItems = [
  { key: "portfolio", href: "#portfolio" },
  { key: "services", href: "#services" },
  { key: "reviews", href: "#reviews" },
  { key: "blog", href: "#blog" },
  { key: "contacts", href: "#contacts" },
];

const Header = () => {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleClick = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";

    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 250);

      let current = "";
      menuItems.forEach(({ href }) => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 150;
          if (window.scrollY >= top) current = href;
        }
      });
      setActiveSection(current);
    };

    const handleHashChange = () => {
      setActiveSection(window.location.hash);
    };

    handleHashChange();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.desktop} container`}>
        <div className={styles.headerLeftDesktop}>
          <Link href="/">
            <Image
              src="/img/logo.svg"
              alt="logo"
              width={80}
              height={14}
              priority
              className={styles.logoMobileVersion}
            />
            <Image
              src={scrolled ? "/img/logo-black.svg" : "/img/logo.svg"}
              alt="logo"
              width={106}
              height={18}
              priority
              className={styles.logoDesktopVersion}
            />
          </Link>
          <nav className={styles.navDesktop}>
            <ul className={styles.menuListDesktop}>
              {menuItems.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className={activeSection === href ? styles.activeLink : ""}
                  >
                    {t(`menu.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.headerRightDesktop}>
          <LanguageSelector scrolled={scrolled} />
          <a className={styles.btnDesktop} href="#contacts">
            {t("button")}
          </a>
        </div>
      </div>

      <div className={styles.headerRightMobile}>
        <LanguageSelector scrolled={scrolled} variant="transparent" />
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

      <nav
        className={`${styles.mobileMenu} ${menuOpen ? styles.show : ""} ${
          scrolled ? styles.scrolledMenu : ""
        }`}
      >
        <Link href="/">
          <Image
            src="/img/logo.svg"
            alt="logo"
            width={131}
            height={22}
            className={styles.logoMobile}
          />
        </Link>
        <ul className={styles.menuList}>
          {menuItems.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                onClick={handleClick}
                className={activeSection === href ? styles.activeLink : ""}
              >
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

export default Header;
