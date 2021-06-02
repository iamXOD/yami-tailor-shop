//Imports
import { ClassConstructor, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { validateAndThrowError } from "../errors";
import { editGroups } from "../models";

export type EditControllerType<T> = (item: T) => Promise<T>;

export function editController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): EditControllerType<T> {
    return async (plainItem) => {
        const item = plainToClass(Entity, plainItem);
        await validateAndThrowError(item, { groups: editGroups, always: true });

        const itemRepo = getRepository(Entity);

        return await itemRepo.save(
            plainToClass(Entity, {
                ...(await itemRepo.findOne(item.id)),
                ...item,
            })
        );
    };
}
