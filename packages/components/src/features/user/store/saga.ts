import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
    logoutRequestAction,
} from 'components/src/features/user/store/action';
import {getRefreshToken, saveTokens} from 'components/src/storage';


const logoutRequest = function* (
    action: ReturnType<typeof logoutRequestAction.request>,
) {
    try {
        const refreshToken = yield call(getRefreshToken);
        yield call(saveTokens, null, null);

        if (refreshToken !== null && refreshToken !== undefined) {
            // Request logout
            // yield call([api, api.user.logout], request);
        }

        yield put(logoutRequestAction.success());
    } catch (error) {
        yield put(logoutRequestAction.failure(error as Error));
    }
};

export const userSaga = function* () {
    yield all([
        takeLatest(logoutRequestAction.request, logoutRequest),
    ]);
};
