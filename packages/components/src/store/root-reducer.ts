import {combineReducers} from 'redux';
import {userReducer} from 'components/src/features/user/store/reducer';
import {moviesReducer} from "components/src/features/movies/store/reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer,
});
