import React from "react";
import {StatusBar} from "react-native";
import TestSvg from "components/src/assets/icons/Test.svg"
import {useTranslation} from "react-i18next";
import {MoviesScreenTitle} from "components/src/features/movies/style";
import {MoviesList} from "components/src/features/movies/components/List";

export const MoviesScreen = () => {
    const {t} = useTranslation(['movies.screen'])
    return <>
        <StatusBar
            animated
        />
        <TestSvg width={24} height={24}/>
        <MoviesScreenTitle>{t('movies.screen:title')}</MoviesScreenTitle>
        <MoviesList/>
    </>
}
