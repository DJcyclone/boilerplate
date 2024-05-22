import {createReducer, ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {AnyAsyncAction} from 'scl/src/redux/create-async-action';

export function createErrorReducer(
    ...actions: AnyAsyncAction<any, any, any>[]
) {
    return createReducer<Error | null>(null, builder => {
        addErrorCases(builder, ...actions);
    });
}

export function addErrorCases(
    builder: ActionReducerMapBuilder<Error | null>,
    ...actions: AnyAsyncAction<any, any, any>[]
) {
    actions.forEach(action => {
        builder
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .addCase(action.request, (state, action) => null)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .addCase(action.failure, (state, action) => action.payload);
    });
}
