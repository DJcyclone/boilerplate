import {
    all,
    takeLatest,
} from 'redux-saga/effects';
import {
    getMoviesRequestAction,
} from 'components/src/features/movies/store/action';
import {moviesApi} from "components/src/api/movies";
import {commonRequest} from "scl/src/redux/saga/common-request";

const getMoviesRequest = function* (
    action: ReturnType<typeof getMoviesRequestAction.request>,
) {
    yield* commonRequest(getMoviesRequestAction, moviesApi, moviesApi.getMovies)
};

export const moviesSaga = function* () {
    yield all([
        takeLatest(getMoviesRequestAction.request, getMoviesRequest),
    ]);
};
