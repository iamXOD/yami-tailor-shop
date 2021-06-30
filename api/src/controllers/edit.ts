//Imports
import { ClassConstructor, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { EntityNotFoundError, validateAndThrowError } from "../errors";
import { editGroups } from "../models";
import { GetOptions } from "./get";

export type EditControllerType<T> = (
    item: T,
    options: GetOptions<T>
) => Promise<T>;

export function editController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>,
    entityName = Entity.name
): EditControllerType<T> {
    return async (plainItem, options) => {
        const itemRepo = getRepository(Entity);

        const oldItem = await itemRepo.findOne(options);
        if (!oldItem) {
            throw new EntityNotFoundError(entityName, options.where);
        }

        await validateAndThrowError(plainToClass(Entity, plainItem), {
            groups: editGroups,
            always: true,
        });

        return await itemRepo.save(
            plainToClass(Entity, {
                ...oldItem,
                ...plainItem,
            })
        );
    };
}
