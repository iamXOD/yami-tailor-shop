export class BaseError extends Error {
    constructor(
        public message: string,
        public status = 500,
        public type = "base-error"
    ) {
        super();
    }
}
