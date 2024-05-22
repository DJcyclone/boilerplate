export class ServerError extends Error {
    constructor(readonly status: number, message?: string) {
        super(message);
    }
}
