//Imports
import { ClassConstructor, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { validateAndThrowError } from "../errors";
import { addGroups } from "../models/constants";

export type AddControllerType<T> = (item: T) => Promise<T>;

export const addGroupAlways = { groups: addGroups, always: true };

export function addController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): AddControllerType<T> {
    return async (plainItem) => {
        const item = plainToClass(Entity, plainItem);
        await validateAndThrowError(item, addGroupAlways);
        return await getRepository(Entity).save(item);
    };
}
