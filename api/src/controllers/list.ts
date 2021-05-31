//Imports
import { ClassConstructor, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { GetOptions } from ".";

export interface ListOptions<T = any> extends GetOptions<T> {
    skip: number;
    take: number;
}

export type ListControllerType<T> = (options: ListOptions<T>) => Promise<T[]>;

export function listController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): ListControllerType<T> {
    return async (options) =>
        plainToClass(Entity, await getRepository(Entity).find(options));
}
