import React, {useEffect} from "react";
import {MovieListContainer, MovieListData} from "components/src/features/movies/components/List/style";
import {useAppDispatch, useRequestSelector} from "components/src/store/store";
import {getMoviesRequestAction} from "components/src/features/movies/store/action";


export const MoviesList = () => {
    const dispatch = useAppDispatch();
    const moviesRequest = useRequestSelector(
        store => store.movies.moviesRequest,
    );

    useEffect(() => {
        dispatch(getMoviesRequestAction.request());

        return function () {
            dispatch(getMoviesRequestAction.clean());
        };
    }, [dispatch]);

    return <MovieListContainer>
        <MovieListData>{JSON.stringify(moviesRequest)}</MovieListData>
    </MovieListContainer>
}