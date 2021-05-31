import i18n from 'i18next';
import { initReactI18next } from 'react-i18next/';
import translationEN from './locales/en/translations.json';
import translationTH from './locales/th/translations.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  th: {
    translation: translationTH,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'th',
  resources,
});
