import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './localisation/translationEn.json';
import translationRU from './localisation/translationRu.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationEN,
      },
      ru: {
        translation: translationRU,
      },
    },
  });

export default i18n;
