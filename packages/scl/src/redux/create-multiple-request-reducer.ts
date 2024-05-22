import {
    createReducer,
    ActionReducerMapBuilder,
    PayloadAction,
    Draft,
} from '@reduxjs/toolkit';
import {AnyAsyncAction} from 'scl/src/redux/create-async-action';
import {data, error, loading, RequestState} from 'scl/src/redux/create-request-reducer';

export type MultipleRequestKey = string | number | symbol;

export function createMultipleRequestReducer<
    RequestType,
    DataType,
    NewDataType = DataType,
    ErrorType extends Error = Error,
    Key extends MultipleRequestKey = string,
>(
    action: AnyAsyncAction<[Key, RequestType], [Key, DataType], [Key, ErrorType]>,
    initValue?: [Key, NewDataType],
    mergeData: (
        prevData: NewDataType | undefined,
        newData: DataType,
    ) => NewDataType = (_, newData) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newData,
) {
    return createReducer<MultipleRequestState<NewDataType, ErrorType>>(
        initValue !== undefined
            ? multipleData({}, initValue[1], initValue[0])
            : multipleInitState(),
        builder => {
            addMultipleRequestCase(builder, action, mergeData);
        },
    );
}

export function addMultipleRequestCase<
    RequestType,
    DataType,
    NewDataType = DataType,
    ErrorType extends Error = Error,
    Key extends MultipleRequestKey = string,
>(
    builder: ActionReducerMapBuilder<
        MultipleRequestState<NewDataType, ErrorType>
    >,
    action: AnyAsyncAction<[Key, RequestType], [Key, DataType], [Key, ErrorType]>,
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
        (state, action: PayloadAction<[Key, RequestType]>) =>
            multipleLoading(state, action.payload[0]),
    );
    builder.addCase(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        action.success,
        (
            state: MultipleRequestState<NewDataType, ErrorType>,
            action: PayloadAction<[Key, DataType]>,
        ) =>
            multipleData(
                state,
                mergeData(state[action.payload[0]]?.data, action.payload[1]),
                action.payload[0],
            ),
    );
    builder.addCase(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        action.failure,
        (state, action: PayloadAction<Draft<ErrorType>>) =>
            multipleError(state, action.payload[1], action.payload[0]),
    );
    builder.addCase(action.clean, (state, action) =>
        multipleInitState<NewDataType, ErrorType>(),
    );
}

export interface MultipleRequestState<
    DataType,
    ErrorType extends Error = Error,
> {
    [key: MultipleRequestKey]: RequestState<DataType, ErrorType>;
}

export function multipleLoading<
    DataType,
    ErrorType extends Error,
    Key extends MultipleRequestKey = string,
>(
    prevState: MultipleRequestState<DataType, ErrorType>,
    key: Key,
): MultipleRequestState<DataType, ErrorType> {
    return {
        ...prevState,
        [key]: loading(prevState[key]),
    };
}

export function multipleData<
    DataType,
    ErrorType extends Error,
    Key extends MultipleRequestKey = string,
>(
    prevState: MultipleRequestState<DataType, ErrorType>,
    newData: DataType,
    key: Key,
): MultipleRequestState<DataType, ErrorType> {
    return {
        ...prevState,
        [key]: data(prevState[key], newData),
    };
}

export function multipleError<
    DataType,
    ErrorType extends Error,
    Key extends MultipleRequestKey = string,
>(
    prevState: MultipleRequestState<DataType, ErrorType>,
    newError: ErrorType,
    key: Key,
): MultipleRequestState<DataType, ErrorType> {
    return {
        ...prevState,
        [key]: error(prevState[key], newError),
    };
}

export function multipleInitState<
    DataType = any,
    ErrorType extends Error = Error,
>(): MultipleRequestState<DataType, ErrorType> {
    return {};
}

export function isMultipleAnyLoading(
    state: MultipleRequestState<any, any>,
): boolean {
    return Object.values(state).some(requestState => requestState.isLoading);
}

export function getMultipleAnyError<ErrorType extends Error = Error>(
    state: MultipleRequestState<any, ErrorType>,
): ErrorType | undefined {
    return Object.values(state).find(requestState => !!requestState.error)?.error;
}
