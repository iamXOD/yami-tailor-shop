//Imports
import { validate, ValidationError, ValidatorOptions } from "class-validator";

export default class ObjectError<T> extends Error {
    object: Record<keyof T, string>;
    constructor(
        errors: Record<keyof T, string>,
        public status: number,
        public message = "Errors"
    ) {
        super();
        this.object = errors;
    }
}

export function validationToAggregateError<T>(
    errors: ValidationError[]
): ObjectError<T> {
    return new ObjectError<T>(
        errors.reduce(
            (acc, { property, constraints }) => ({
                ...acc,
                [property]: constraints
                    ? Object.values(constraints).join(", ")
                    : "",
            }),
            {} as Record<keyof T, string>
        ),
        400,
        "Invalid data provided"
    );
}

export async function validateAndThrowError<T extends Record<string, any>>(
    obj: T,
    valOpt?: Partial<ValidatorOptions>
): Promise<void> {
    const errors = await validate(obj, valOpt);
    if (errors.length) {
        throw validationToAggregateError<T>(errors);
    }
}
