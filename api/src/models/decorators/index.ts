/* eslint-disable @typescript-eslint/ban-types */
//Imports
import { registerDecorator, ValidationOptions } from "class-validator";

export function IsOnlyDateString(options?: ValidationOptions) {
    return function (object: Object, propertyName: string): void {
        registerDecorator({
            name: "IsOnlyDateString",
            options,
            propertyName,
            target: object.constructor,
            validator: {
                validate(value: string): boolean {
                    return /^\d{4}-\d{2}-\d{2}$/.test(value);
                },
                defaultMessage: (args) =>
                    `${args?.property} must be a 'YYYY-MM-DD' date string`,
            },
        });
    };
}

export * from "./checkEntityExists";
