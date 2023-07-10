import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        greeting: "Hello",
      },
    },
    ua: {
      translation: {
        greeting: "Привіт",
      },
    },
    he: {
      translation: {
        greeting: "שלום",
      },
    },
  },
  lng: "en", // Мова за замовчуванням
  fallbackLng: "en", // Запасна мова
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
