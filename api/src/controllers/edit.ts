//Imports
import { ClassConstructor, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { validateAndThrowError } from "../errors";
import { editGroups } from "../models";
import { GetOptions } from "./get";

export type EditControllerType<T> = (
    item: T,
    options: GetOptions<T>
) => Promise<T>;

export function editController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): EditControllerType<T> {
    return async (plainItem, options) => {
        const newItem = plainToClass(Entity, plainItem);
        await validateAndThrowError(newItem, {
            groups: editGroups,
            always: true,
        });

        const repo = getRepository(Entity);

        const oldItem = await repo.findOne(options);

        return await repo.save(
            plainToClass(Entity, {
                ...oldItem,
                ...newItem,
            })
        );
    };
}
