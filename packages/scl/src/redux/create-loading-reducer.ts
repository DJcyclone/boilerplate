import {createReducer, ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {AnyAsyncAction} from 'scl/src/redux/create-async-action';

export function createLoadingReducer(
    ...actions: AnyAsyncAction<any, any, any>[]
) {
    return createReducer<boolean>(false, builder => {
        addLoadingCases(builder, ...actions);
    });
}

export function addLoadingCases(
    builder: ActionReducerMapBuilder<boolean>,
    ...actions: AnyAsyncAction<any, any, any>[]
) {
    actions.forEach(action => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        builder.addCase(action.request, (state, action) => true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        builder.addCase(action.success, (state, action) => false);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        builder.addCase(action.failure, (state, action) => false);
    });
}
