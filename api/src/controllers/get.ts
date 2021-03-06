//Imports
import { ClassConstructor } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { EntityNotFoundError } from "../errors";

export interface GetOptions<T = any> {
    where?: Partial<Record<keyof T, any>>;
}

export type GetControllerType<T> = (options: GetOptions<T>) => Promise<T>;

export function getController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>,
    entityName = Entity.name
): GetControllerType<T> {
    return async (options) => {
        const item = await getRepository(Entity).findOne(options);
        if (!item) {
            throw new EntityNotFoundError(entityName, options.where);
        }
        return item;
    };
}
