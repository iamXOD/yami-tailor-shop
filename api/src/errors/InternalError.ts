//App Imports
import { BaseError } from "./BaseError";

export class InternalError extends BaseError {
    constructor(status = 500) {
        super(
            "We are facing an internal error. Please try later",
            status,
            "internal-error"
        );
    }
}
