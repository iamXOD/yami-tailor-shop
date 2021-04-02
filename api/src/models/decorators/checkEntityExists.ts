/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
//Imports
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from "class-validator";
import { EntityTarget, Equal, getRepository, Not } from "typeorm";
//App Imports
import { stringify } from "../../util";

type DecoratorArgs<T> = {
    Entity: T;
    criteriaFn?: (value: any, object: any) => any;
};

export const EntityHasUniqueProps = checkEntityExists(
    "entityHasUniqueProps",
    false,
    "already exists"
);

export const EntityWithPropsExists = checkEntityExists(
    "entityWithPropsExists",
    true,
    "was not found"
);

function checkEntityExists<T>(
    decoratorName: string,
    checkingIfExists: boolean,
    messageEnding: string
) {
    return function (
        { Entity, criteriaFn }: DecoratorArgs<T>,
        options?: ValidationOptions
    ) {
        return function (object: Object, propertyName: string): void {
            registerDecorator({
                name: decoratorName,
                target: object.constructor,
                propertyName,
                constraints: [Entity, {}, criteriaFn],
                async: true,
                options,
                validator: {
                    async validate(value: any, args: ValidationArguments) {
                        const [Entity, , criteriaFn] = args.constraints;
                        args.constraints[1] = criteriaFn?.(
                            value,
                            (args.object as unknown) as T
                        ) || {
                            [args.property]: value,
                        };
                        if (!value) {
                            return false;
                        }
                        const exists = await entityWithCriteriaExists(
                            Entity,
                            args.constraints[1]
                        );
                        return checkingIfExists ? exists : !exists;
                    },
                    defaultMessage(args) {
                        const criteria = args?.value
                            ? ` with ${stringify(args?.constraints[1])}`
                            : "";
                        return `${
                            args?.constraints[0].name
                        }${criteria} ${messageEnding.trim()}`;
                    },
                },
            });
        };
    };
}

async function entityWithCriteriaExists<T>(
    Entity: EntityTarget<T>,
    criteria: any
): Promise<boolean> {
    return !!(await getRepository(Entity).findOne(criteria));
}

//utils criteriaFn
export const idValue = (id: number): { id: number } => ({ id });
export function uniqueProp(propertyName: string) {
    return (val: any, object: any): { id: any; [x: string]: any } => ({
        id: Not(Equal(object.id)),
        [propertyName]: val,
    });
}
