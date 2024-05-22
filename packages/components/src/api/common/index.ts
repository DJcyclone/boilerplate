import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import Config from "react-native-config";
import refreshTokenInterceptor from "scl/src/axios/refresh-token-interceptor";
import {getJWTToken, getRefreshToken, saveTokens} from "components/src/storage";
import {ServerError} from "components/src/api/common/models/errors/server-error";
import {logoutRequestAction} from "components/src/features/user/store/action";
// import {store} from "components/src/store";

const BASE_PATH = Config.URL;
console.log("BASE_PATH", BASE_PATH)

export const AUTH_HEADER = 'Authorization';
export const AUTH_HEADER_PREFIX = 'Bearer ';
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};


const commonConfiguration: AxiosRequestConfig = {
    headers: {...DEFAULT_HEADERS},
};

export const instance = axios.create({baseURL: BASE_PATH, ...commonConfiguration});

async function addTokenHeader(request: AxiosRequestConfig, withReset = false) {
    const accessToken = await getJWTToken();
    if (!accessToken) return;

    if (!request.headers) {
        request.headers = {};
    }
    if (!Object.keys(request.headers).includes(AUTH_HEADER) || withReset) {
        request.headers[AUTH_HEADER] =
            AUTH_HEADER_PREFIX + accessToken;
    }
}

const [refreshTokenRequestInterceptor, refreshTokenResponseErrorInterceptor] =
    refreshTokenInterceptor(
        async config => {
            const refreshToken = await getRefreshToken();
            if (!refreshToken) {
                throw new Error();
            }

            //Refresh Request
            // return userApi
            //     .refreshToken({refreshToken}, config)
            //     .then(async response => {
            //         await saveTokens(
            //             response.data.accessToken,
            //             response.data.refreshToken,
            //         );
            //     })
            //     .catch(() => store.dispatch(logoutRequestAction.request()));
        },
        instance,
        request => addTokenHeader(request, true),
        () => {
        }
        // store.dispatch(logoutRequestAction.request()),
    );

instance.interceptors.request.use(async (request: AxiosRequestConfig) => {
    await addTokenHeader(request);
    return refreshTokenRequestInterceptor(request);
});

instance.interceptors.response.use(
    (value: AxiosResponse) => {
        console.log(
            'Response Success',
            value.request.responseURL,
            value.status,
            value.data,
        );

        return value
    },
    async (error: AxiosError<any>) => {
        console.log('Response Error', JSON.stringify(error));

        try {
            const data = await refreshTokenResponseErrorInterceptor(error);

            if (data) {
                return data;
            }

            throw error;
        } catch (error) {
            const axiosError = error as AxiosError<any>
            if (axiosError?.response?.data) {
                throw new ServerError(axiosError.response.status, axiosError.response.statusText);
            }

            throw error;
        }
    },
);