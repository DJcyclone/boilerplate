export function delay(delayMs: number): Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => resolve(delayMs), delayMs);
    });
}

export function delayWithPromise<PromiseResponse>(
    delayMs: number,
    promise: PromiseResponse | PromiseLike<PromiseResponse>,
): Promise<PromiseResponse> {
    return new Promise(resolve => {
        setTimeout(() => resolve(promise), delayMs);
    });
}
