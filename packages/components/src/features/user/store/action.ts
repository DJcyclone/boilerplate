import {createAsyncAction} from 'scl/src/redux/create-async-action';

export const logoutRequestAction = createAsyncAction<void, void, Error>(
    'LOGOUT_REQUEST',
);
