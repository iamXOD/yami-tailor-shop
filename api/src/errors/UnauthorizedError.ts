//App Imports
import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(reason: string) {
        super(reason, 401, "unauthorized-error");
    }
}
