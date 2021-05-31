//Imports
import { ClassConstructor, plainToClass } from "class-transformer";
import { EntityNotFoundError, getRepository } from "typeorm";

export interface GetOptions<T = any> {
    where?: Partial<T>;
}

export type GetControllerType<T> = (options: GetOptions<T>) => Promise<T>;

export function getController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>,
    entityName?: string
): GetControllerType<T> {
    return async (options) => {
        const item = plainToClass(
            Entity,
            await getRepository(Entity).findOne(options)
        );
        if (!item) {
            throw new EntityNotFoundError(
                entityName || Entity.name,
                options.where
            );
        }
        return item;
    };
}
