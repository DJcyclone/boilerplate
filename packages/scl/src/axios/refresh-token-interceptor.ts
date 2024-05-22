import {AxiosInstance, InternalAxiosRequestConfig} from 'axios';

let startLoading = false;
let waitPromises: {
    resolve: (value: void) => void;
    reject: (reason?: any) => void;
}[] = [];

async function wait() {
    return new Promise((resolve, reject) => {
        waitPromises.push({resolve, reject});
    });
}

function onWaitResolve() {
    waitPromises.forEach(waitPromise => waitPromise.resolve());
    waitPromises = [];
    startLoading = false;
}

function onWaitReject(reason: any) {
    waitPromises.forEach(waitPromise => waitPromise.reject(reason));
    waitPromises = [];
    startLoading = false;
}

export default function refreshTokenInterceptor(
    refreshTokenRequest: (config: { _retry: true }) => Promise<any>,
    instance: AxiosInstance,
    addTokenHeader: (request: InternalAxiosRequestConfig) => Promise<void>,
    onAgainError: () => void,
): [(request) => Promise<InternalAxiosRequestConfig>, (error: any) => Promise<any>] {
    return [
        async function (request) {
            if (startLoading && !request._retry) {
                await wait();
                await addTokenHeader(request);
            }
            return request;
        },
        async function (error) {
            const originalRequest = error.config;

            if (originalRequest._retry) {
                onAgainError();
                onWaitReject(error);
                throw error;
            }

            if (error.response?.status !== 401) throw error;

            if (startLoading) {
                await wait();
                await addTokenHeader(originalRequest);
                return instance(originalRequest);
            } else {
                originalRequest._retry = true;
                startLoading = true;

                await refreshTokenRequest({
                    _retry: true,
                });
                await addTokenHeader(originalRequest);
                onWaitResolve();
                return instance(originalRequest);
            }
        },
    ];
}
