// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationZH from './locales/zh/translation.json';
import translationEN from './locales/en/translation.json';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      zh: {
        translation: translationZH
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
  });

export default i18n;