import {call, put} from 'redux-saga/effects';
import {SagaReturnType} from '@redux-saga/core/effects';
import {AnyAsyncAction} from 'scl/src/redux/create-async-action';

export function* commonRequest<
    Request extends (...args: any) => Promise<any>,
    ErrorType extends Error = Error,
>(
    actionType: AnyAsyncAction<any, SagaReturnType<Request>, ErrorType>,
    apiContext: any,
    request: Request,
    ...requestData: Parameters<Request>
) {
    try {
        const response = yield call([apiContext, request], ...requestData);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yield put(actionType.success(response));
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yield put(actionType.failure(error));
    }
}
