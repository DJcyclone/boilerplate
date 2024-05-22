import React from 'react';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {Theme} from "@emotion/react";
import {dimens} from "components/src/resources/dimens";
import {colors} from 'components/src/resources/colors';

export const appTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...colors,
    },
    dimens: dimens
}
