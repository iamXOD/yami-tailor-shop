//Imports
import { ClassConstructor } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { GetOptions } from ".";

export type RemoveControllerType<T> = (options: GetOptions<T>) => Promise<void>;

export function removeController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): RemoveControllerType<T> {
    return async (options) => {
        const itemRepo = getRepository(Entity);
        const item = await itemRepo.findOne(options);
        item && (await itemRepo.remove(item));
    };
}
