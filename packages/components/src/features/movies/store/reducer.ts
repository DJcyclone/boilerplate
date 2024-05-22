import {combineReducers} from 'redux';
import {
    getMoviesRequestAction,
} from 'components/src/features/movies/store/action';
import {
    createRequestReducer,
    RequestState,
} from 'scl/src/redux/create-request-reducer';
import {MoviesResponse} from "components/src/api/movies/models/responses";

export const moviesReducer = combineReducers<{
    moviesRequest: RequestState<MoviesResponse> | null;
}>({
    moviesRequest: createRequestReducer(getMoviesRequestAction),
});
