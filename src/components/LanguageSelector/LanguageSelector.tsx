"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import styles from "./LanguageSelector.module.css";

interface LanguageSelectorProps {
  scrolled?: boolean;
  variant?: "light" | "dark" | "transparent";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  scrolled = false,
  variant,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "pl", label: "POL" },
    { code: "ua", label: "UKR" },
    { code: "en", label: "ENG" },
  ];

  const handleChange = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale !== locale) {
      const pathnameWithoutLocale = (pathname ?? "").replace(
        /^\/(ua|pl|en)/,
        ""
      );
      router.push(`/${newLocale}${pathnameWithoutLocale}`);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const theme = variant ? variant : scrolled ? "dark" : "light";

  return (
    <div className={`${styles.dropdown} ${styles[theme]}`}>
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={toggleDropdown}
        aria-label={t("label")}
      >
        {languages.find((lang) => lang.code === locale)?.label}
        <Image
          src="/img/icons/arrow.svg"
          alt="arrow"
          width={12}
          height={12}
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                className={`${styles.dropdownItem} ${
                  locale === lang.code ? styles.active : ""
                }`}
                onClick={() => handleChange(lang.code)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
