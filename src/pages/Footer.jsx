import React from "react";
import styles from "./footer.module.css";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <p><a className={styles.pointer}  href="https://www.tekdi.net/">{t("footerText")} ❤️ {t("footerText1")} </a> | <a className={styles.pointer} href="https://onest.network/">{t("onestText")}</a></p>
     
    </footer>
  );
}

export default Footer;
