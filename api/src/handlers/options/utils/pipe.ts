//Imports
import { Request } from "express";
//App Imports
import { OptionsFn } from ".";

export function pipe<T>(
    optionFn: OptionsFn<T>,
    ...optionsFns: OptionsFn<T>[]
): OptionsFn<T> {
    return (req: Request, options = {}) =>
        optionsFns.reduce(
            (acc, current) => current(req, acc),
            optionFn(req, options)
        );
}
