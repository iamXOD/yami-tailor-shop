//App Imports
import { Request } from "express";
import { GetOptions, ListOptions } from "../../controllers";

export type OptionsFn<T = any, O = GetOptions<T> | ListOptions<T>> = (
    request: Request,
    options?: O
) => O;

export const addPagination: OptionsFn = (req, options) => {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 5;
    return { ...options, skip: (page - 1) * perPage, take: perPage };
};

export const addId: OptionsFn = (req, options = {}) => {
    const id = Number(req.params.id);
    if (id) {
        return {
            ...options,
            where: ({ ...options.where, id } as unknown) as Partial<any>,
        };
    }
    return options;
};

export const addName: OptionsFn = (req, options = {}) => {
    const name = req.params.name;
    if (name) {
        return {
            ...options,
            where: ({ ...options.where, name } as unknown) as Partial<any>,
        };
    }
    return options;
};

export const addMaterialId: OptionsFn = (req, options = {}) => {
    const materialId = Number(req.params.materialId);
    if (materialId) {
        return { ...options, where: { ...options.where, materialId } };
    }
    return options;
};

export const addActorId = (actorIdPropName: string): OptionsFn => {
    return (req, options = {}) => {
        const actorId = Number(req.params.actorId);
        if (actorId) {
            return {
                ...options,
                where: { ...options?.where, [actorIdPropName]: actorId },
            };
        }
        return options;
    };
};
