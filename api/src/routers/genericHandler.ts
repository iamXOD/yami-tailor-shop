//Imports
import { RequestHandler, Router, RouterOptions } from "express";
//App Imports
import {
    addOrEditControllerType,
    ControllerType,
    getControllerType,
    listControllerType,
    ListOptions,
    loginControllerType,
    removeControllerType,
} from "../controllers/types";
import { ID_ROUTE, ROOT_ROUTE } from "./constants";
import { addId, addName, addPagination } from "./controller-options";
import { OptionsFn } from "./controller-options/types";

export function listHandler<T>(
    list: listControllerType<T>,
    optionFn?: OptionsFn<T>
): RequestHandler {
    return async (req, res, next) => {
        const defaultOptions = addPagination(req) as ListOptions<T>;
        const options =
            (optionFn?.(req, defaultOptions) as ListOptions<T>) ||
            defaultOptions;

        try {
            const items = await list(options);
            res.json(items);
        } catch (err) {
            next(err);
        }
    };
}

export function getHandler<T>(
    get: getControllerType<T>,
    optionFn?: OptionsFn<T>
): RequestHandler {
    return async (req, res, next) => {
        const defaultOptions = addId(req);
        const options = optionFn?.(req, defaultOptions) || defaultOptions;
        try {
            const item = await get(options);
            res.json(item);
        } catch (err) {
            next(err);
        }
    };
}

export function getByNameHandler<T>(
    getByName: getControllerType<T>,
    optionFn?: OptionsFn<T>
): RequestHandler {
    return async (req, res, next) => {
        const defaultOptions = addName(req);
        const options = optionFn?.(req, defaultOptions) || defaultOptions;
        try {
            const item = await getByName(options);
            res.json(item);
        } catch (err) {
            next(err);
        }
    };
}

export function addOrEditHandler<T>(
    addOrEdit: addOrEditControllerType<T>
): RequestHandler {
    return async (req, res, next) => {
        try {
            const item = await addOrEdit(req.body);
            res.status(201).json(item);
        } catch (err) {
            next(err);
        }
    };
}

export function removeHandler<T>(
    remove: removeControllerType<T>,
    optionFn?: OptionsFn<T>
): RequestHandler {
    return async (req, res, next) => {
        const defaultOptions = addId(req);
        const options = optionFn?.(req, defaultOptions) || defaultOptions;
        try {
            await remove(options);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    };
}

export function loginHandler(login: loginControllerType): RequestHandler {
    return async (req, res, next) => {
        try {
            const token = await login(req.body);
            res.json(token);
        } catch (err) {
            next(err);
        }
    };
}

export default function genericRoute<T>(
    controller: ControllerType<T>,
    options?: RouterOptions
): Router {
    return Router(options)
        .get(ROOT_ROUTE, listHandler(controller.list))
        .post(ROOT_ROUTE, addOrEditHandler(controller.add))
        .put(ROOT_ROUTE, addOrEditHandler(controller.edit))
        .get(ID_ROUTE, getHandler(controller.get))
        .delete(ID_ROUTE, removeHandler(controller.remove));
}
