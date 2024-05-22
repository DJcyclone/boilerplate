import 'i18next';
import {resources} from "components/src/resources/translations/resources";

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: typeof resources['en'],
    }
}