import '@emotion/react';
import type {Theme} from '@emotion/react';
import type {ThemeProp} from "react-native-paper/lib/typescript/types";
import type {Colors} from 'components/src/resources/colors';
import type {Dimens} from 'components/src/resources/dimens';

declare module '@emotion/react' {
    export interface Theme extends ThemeProp {
        colors: Colors & ThemeProp['colors'];
        dimens: Dimens;
    }
}

export interface CSSProps {
    theme: Theme;
}
