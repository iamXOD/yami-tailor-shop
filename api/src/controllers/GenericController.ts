/* eslint-disable @typescript-eslint/no-explicit-any */
//Imports
import { ClassConstructor, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { EntityNotFoundError, validateAndThrowError } from "../errors";
import { addGroupAlways, editGroupAlways } from "./constants";
import {
    addOrEditControllerType,
    ControllerType,
    getControllerType,
    listControllerType,
    removeControllerType,
} from "./types";

export function listController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): listControllerType<T> {
    return async (options) =>
        plainToClass(Entity, await getRepository(Entity).find(options));
}

export function getController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>,
    entityName?: string
): getControllerType<T> {
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

export function addController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): addOrEditControllerType<T> {
    return async (plainItem) => {
        const item = plainToClass(Entity, plainItem);
        await validateAndThrowError(item, addGroupAlways);

        const itemRepo = getRepository(Entity);

        return await itemRepo.save(item);
    };
}

export function editController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): addOrEditControllerType<T> {
    return async (plainItem) => {
        const item = plainToClass(Entity, plainItem);
        await validateAndThrowError(item, editGroupAlways);

        const itemRepo = getRepository(Entity);

        return await itemRepo.save(
            plainToClass(Entity, {
                ...(await itemRepo.findOne(item.id)),
                ...item,
            })
        );
    };
}

export function removeController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): removeControllerType<T> {
    return async (options) => {
        const itemRepo = getRepository(Entity);
        const item = await itemRepo.findOne(options);
        item && (await itemRepo.remove(item));
    };
}

export default function GenericController<T extends Record<string, any>>(
    Entity: ClassConstructor<T>
): ControllerType<T> {
    return {
        list: listController(Entity),
        get: getController(Entity, Entity.name),
        add: addController(Entity),
        edit: editController(Entity),
        remove: removeController(Entity),
    };
}
