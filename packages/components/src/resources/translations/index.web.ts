import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {isDevBuild} from "components/src/utils/constants";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: isDevBuild,

        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: 'components/src/resources/translations/{{lng}}/{{ns}}.json',
        }
    });

export default i18n;
