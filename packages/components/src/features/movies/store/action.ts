import {createAsyncAction} from 'scl/src/redux/create-async-action';
import {MoviesResponse} from "components/src/api/movies/models/responses";

export const getMoviesRequestAction = createAsyncAction<
    void,
    MoviesResponse,
    Error
>('GET_MOVIES_REQUEST');