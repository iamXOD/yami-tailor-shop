//Imports
import { ClassConstructor } from "class-transformer";
import { FindManyOptions, FindOneOptions, getRepository } from "typeorm";
//App Imports
import { GetOptions } from ".";

export interface ListOptions<T> extends GetOptions<T> {
    take: FindManyOptions<T>["take"];
    order: FindOneOptions<T>["order"];
}

export type ListControllerType<T> = (options: ListOptions<T>) => Promise<T[]>;

export function listController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): ListControllerType<T> {
    return async (options) => await getRepository(Entity).find(options);
}
