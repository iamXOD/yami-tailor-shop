//App Imports
import { BaseError } from "./BaseError";

export class JSONParseError extends BaseError {
    constructor(message: string) {
        super(message, 400, "json-parse-error");
    }
}
