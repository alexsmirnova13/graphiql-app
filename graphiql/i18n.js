import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './src/localisation/translationEn.json';
import translationRU from './src/localisation/translationRu.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // !убрать в конце, чтобы не было в консоли вывода языка
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
