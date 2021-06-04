//Imports
import {
    validate,
    ValidationError as CVValidationError,
    ValidatorOptions,
} from "class-validator";
//App Imports
import { BaseError } from "./BaseError";

interface ValidationFail {
    error: string;
    path: string[];
    message?: string;
}

export default class ValidationError extends BaseError {
    constructor(
        public validationErrors: ValidationFail[],
        message = "Invalid data provided"
    ) {
        super(message, 400, "validation-error");
    }
}

export async function validateAndThrowError(
    obj: Record<string, any>,
    valOpt?: ValidatorOptions
): Promise<void> {
    const errors = await validate(obj, valOpt);
    if (errors.length) {
        throw transformValidationError(errors);
    }
}

function transformValidationError(
    errors: CVValidationError[]
): ValidationError {
    return new ValidationError(
        errors
            .map(({ property, constraints = {} }) => {
                return Object.entries(constraints).map(([error, message]) => ({
                    path: [property],
                    error,
                    message,
                }));
            })
            .reduce((acc, res) => acc.concat(...res), [])
    );
}
