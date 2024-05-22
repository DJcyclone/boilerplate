import storage from '@react-native-async-storage/async-storage';

const JWT_TOKEN_KEY = 'keys:jwt';
const REFRESH_TOKEN_KEY = 'keys:refresh';

export function getJWTToken(): Promise<string | null> {
    return storage.getItem(JWT_TOKEN_KEY);
}

export function saveJWTToken(token: string | null): Promise<void> {
    return token === null
        ? storage.removeItem(JWT_TOKEN_KEY)
        : storage.setItem(JWT_TOKEN_KEY, token);
}

export function getRefreshToken(): Promise<string | null> {
    return storage.getItem(REFRESH_TOKEN_KEY);
}

export function saveRefreshToken(token: string | null): Promise<void> {
    return token === null
        ? storage.removeItem(REFRESH_TOKEN_KEY)
        : storage.setItem(REFRESH_TOKEN_KEY, token);
}

export function saveTokens(
    jwtToken: string | null,
    refreshToken: string | null,
): Promise<[void, void]> {
    return Promise.all([saveJWTToken(jwtToken), saveRefreshToken(refreshToken)]);
}