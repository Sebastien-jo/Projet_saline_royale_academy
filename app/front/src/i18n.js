import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language files
import translationEN from './languages/locales/en/translation.json';
import translationFR from './languages/locales/fr/translation.json';

const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'fr', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
        escapeValue: false, // React handles escaping
    },
});

export default i18n;