//App Imports
import { BaseError } from "./BaseError";

export class ResourceNotFoundError extends BaseError {
    constructor(message = "Resource not found") {
        super(message, 404, "resource-not-found-error");
    }
}
