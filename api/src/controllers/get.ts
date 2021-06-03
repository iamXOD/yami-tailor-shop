//Imports
import { ClassConstructor } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { EntityNotFoundError } from "../errors";

export interface GetOptions<T = any> {
    where?: Partial<T>;
}

export type GetControllerType<T> = (options: GetOptions<T>) => Promise<T>;

export function getController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>,
    entityName?: string
): GetControllerType<T> {
    return async (options) => {
        const item = await getRepository(Entity).findOne(options);
        if (!item) {
            throw new EntityNotFoundError(
                entityName || Entity.name,
                options.where
            );
        }
        return item;
    };
}
