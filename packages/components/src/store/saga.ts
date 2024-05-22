import {all} from 'redux-saga/effects';
import {userSaga} from 'components/src/features/user/store/saga';
import {moviesSaga} from "components/src/features/movies/store/saga";

export function* rootSaga() {
    yield all([
        userSaga(),
        moviesSaga(),
    ]);
}
