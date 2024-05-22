import {
    createAction,
    PayloadActionCreator,
    PrepareAction,
} from '@reduxjs/toolkit';

export type OptionalPrepareAction<P> = PrepareAction<P> | void;

export type AsyncActionWithCancel<
    P1,
    P1A extends OptionalPrepareAction<P1>,
    P2,
    P2A extends OptionalPrepareAction<P2>,
    P3,
    P3A extends OptionalPrepareAction<P3>,
> = AsyncAction<P1, P1A, P2, P2A, P3, P3A> & {
    cancel: PayloadActionCreator<void, string>;
};
export type AsyncAction<
    P1,
    P1A extends OptionalPrepareAction<P1>,
    P2,
    P2A extends OptionalPrepareAction<P2>,
    P3,
    P3A extends OptionalPrepareAction<P3>,
> = {
    request: PayloadActionCreator<P1, string, P1A>;
    success: PayloadActionCreator<P2, string, P2A>;
    failure: PayloadActionCreator<P3, string, P3A>;
    clean: PayloadActionCreator<void, string>;
};

export type AnyAsyncAction<P1, P2, P3> =
    | AsyncAction<
    P1,
    OptionalPrepareAction<P1>,
    P2,
    OptionalPrepareAction<P2>,
    P3,
    OptionalPrepareAction<P3>
>
    | AsyncActionWithCancel<
    P1,
    OptionalPrepareAction<P1>,
    P2,
    OptionalPrepareAction<P2>,
    P3,
    OptionalPrepareAction<P3>
>;

export function createAsyncAction<
    P1,
    P2,
    P3,
    P1A extends OptionalPrepareAction<P1> = void,
    P2A extends OptionalPrepareAction<P2> = void,
    P3A extends OptionalPrepareAction<P3> = void,
>(
    type: string,
    requestPrepare?: P1A,
    successPrepare?: P2A,
    failurePrepare?: P3A,
): AsyncAction<P1, P1A, P2, P2A, P3, P3A> {
    const requestType = `${type}_REQUEST`;
    const successType = `${type}_SUCCESS`;
    const failureType = `${type}_FAILURE`;
    const cleanType = `${type}_CLEAN`;

    const request = requestPrepare
        ? createAction(requestType, requestPrepare)
        : createAction(requestType);
    const success = successPrepare
        ? createAction(successType, successPrepare)
        : createAction(successType);
    const failure = failurePrepare
        ? createAction(failureType, failurePrepare)
        : createAction(failureType);
    const clean = createAction(cleanType);

    return {
        request,
        success,
        failure,
        clean,
    } as AsyncAction<P1, P1A, P2, P2A, P3, P3A>;
}

export function createAsyncActionWithCancel<
    P1,
    P2,
    P3,
    P1A extends OptionalPrepareAction<P1> = void,
    P2A extends OptionalPrepareAction<P2> = void,
    P3A extends OptionalPrepareAction<P3> = void,
>(
    type: string,
    requestPrepare?: P1A,
    successPrepare?: P2A,
    failurePrepare?: P3A,
): AsyncActionWithCancel<P1, P1A, P2, P2A, P3, P3A> {
    const cancelType = `${type}_CANCEL`;

    const cancel = createAction(cancelType);

    return {
        ...createAsyncAction(type, requestPrepare, successPrepare, failurePrepare),
        cancel,
    };
}
