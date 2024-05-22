import {createReducer, ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {AnyAsyncAction} from 'scl/src/redux/create-async-action';

export function createSuccessReducer<Type>(
    initState: Type | null,
    ...actions: AnyAsyncAction<any, any, any>[]
) {
    return createReducer<Type | null>(initState, builder => {
        addSuccessCases(builder, ...actions);
    });
}

export function addSuccessCases<Type>(
    builder: ActionReducerMapBuilder<Type | null>,
    ...actions: AnyAsyncAction<any, any, any>[]
) {
    actions.forEach(action => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        builder.addCase(action.success, (state, action) => action.payload);
    });
}
