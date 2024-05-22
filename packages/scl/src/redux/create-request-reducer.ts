import {
    createReducer,
    ActionReducerMapBuilder,
    PayloadAction,
    Draft,
} from '@reduxjs/toolkit';
import {AnyAsyncAction} from 'scl/src/redux/create-async-action';

export function createRequestReducer<
    DataType,
    NewDataType = DataType,
    ErrorType extends Error = Error,
>(
    action: AnyAsyncAction<any, DataType, ErrorType>,
    initValue?: NewDataType,
    mergeData: (
        prevData: NewDataType | undefined,
        newData: DataType,
    ) => NewDataType = (_, newData) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newData,
) {
    return createReducer<RequestState<NewDataType, ErrorType> | null>(
        initValue !== undefined ? data(null, initValue) : null,
        builder => {
            addRequestCase(builder, action, mergeData);
        },
    );
}

export function addRequestCase<
    DataType,
    NewDataType = DataType,
    ErrorType extends Error = Error,
>(
    builder: ActionReducerMapBuilder<RequestState<NewDataType, ErrorType> | null>,
    action: AnyAsyncAction<any, DataType, ErrorType>,
    mergeData: (
        prevData: NewDataType | undefined,
        newData: DataType,
    ) => NewDataType = (_, newData) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newData,
) {
    builder.addCase(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        action.request,
        (state, action) => loading(state),
    );
    builder.addCase(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        action.success,
        (
            state: RequestState<NewDataType> | null,
            action: PayloadAction<DataType>,
        ) => data(state, mergeData(state?.data, action.payload)),
    );
    builder.addCase(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        action.failure,
        (state, action: PayloadAction<Draft<ErrorType>>) =>
            error(state, action.payload),
    );
    builder.addCase(action.clean, (state, action) => null);
}

export interface RequestState<DataType, ErrorType extends Error = Error> {
    isLoading: boolean;
    data?: DataType;
    error?: ErrorType;
}

export function loading<DataType, ErrorType extends Error>(
    prevState: RequestState<DataType, ErrorType> | null,
): RequestState<DataType, ErrorType> {
    return {
        isLoading: true,
        data: prevState?.data,
    };
}

export function data<DataType, ErrorType extends Error>(
    prevState: RequestState<DataType, ErrorType> | null,
    data: DataType,
): RequestState<DataType, ErrorType> {
    return {
        isLoading: false,
        data,
    };
}

export function error<DataType, ErrorType extends Error>(
    prevState: RequestState<DataType, ErrorType> | null,
    error: ErrorType,
): RequestState<DataType, ErrorType> {
    return {
        isLoading: false,
        data: prevState?.data,
        error,
    };
}

export function initState<
    DataType = any,
    ErrorType extends Error = Error,
>(): RequestState<DataType, ErrorType> {
    return {
        isLoading: false,
    };
}
