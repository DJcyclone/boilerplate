import createSagaMiddleware, {Task} from 'redux-saga';
import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from 'components/src/store/root-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {initState, RequestState} from 'scl/src/redux/create-request-reducer';
import {Reducer} from 'redux';
import {select} from "redux-saga/effects";
import {rootSaga} from 'components/src/store/saga';


export interface SagaStore extends Store {
    sagaTask: Task;
}

export function makeStore(
    reducer: Reducer<ReturnType<typeof rootReducer>> = rootReducer,
) {
    const sagaMiddleware = createSagaMiddleware();
    const listenerMiddlewareInstance = createListenerMiddleware({
        onError: () => console.error,
    });

    const store = configureStore({
        reducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware()
                .prepend(listenerMiddlewareInstance.middleware)
                .concat(sagaMiddleware),
    });

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

    return store;
}

type Store = ReturnType<typeof makeStore>;

export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useRequestSelector<Data, ErrorType extends Error = Error>(
    select: (state: RootState) => RequestState<Data, ErrorType> | null,
) {
    const data = useAppSelector(select);

    return data ?? initState<Data>();
}

export function* appSelect(selector: (state: RootState) => any) {
    return yield select(selector);
}