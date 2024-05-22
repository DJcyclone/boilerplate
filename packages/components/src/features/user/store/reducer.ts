import {combineReducers} from 'redux';
import {
    logoutRequestAction,
} from 'components/src/features/user/store/action';
import {
    createRequestReducer,
    RequestState,
} from 'scl/src/redux/create-request-reducer';

export const userReducer = combineReducers<{
    logoutRequest: RequestState<void> | null;
}>({
    logoutRequest: createRequestReducer(logoutRequestAction),
});
