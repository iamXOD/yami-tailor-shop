//Types
import { validate, ValidationError, ValidatorOptions } from "class-validator";

export default class AggregateError extends Error {
    errors: Error[];
    constructor(errors: any[], statusCode: number, message?: string) {
        super();
        this.errors = errors;
        this.statusCode = statusCode;
        this.message = message || "Errors";
    }
}

export function validationToAggregateError(
    errors: ValidationError[]
): AggregateError {
    return new AggregateError(
        errors.map(({ property, constraints }) => ({
            [property]: constraints
                ? Object.values(constraints).join(", ")
                : "",
        })),
        400,
        "Invalid data provided"
    );
}

export async function validateAndThrowError(
    obj: Record<string, any>,
    valOpt?: Partial<ValidatorOptions>
): Promise<void> {
    const errors = await validate(obj, valOpt);
    if (errors.length) {
        throw validationToAggregateError(errors);
    }
}
