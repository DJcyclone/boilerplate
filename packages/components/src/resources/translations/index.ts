import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {isDevBuild} from "components/src/utils/constants";
import {resources} from "components/src/resources/translations/resources";


i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: isDevBuild,

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
