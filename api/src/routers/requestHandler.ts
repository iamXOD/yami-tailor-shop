//Imports
import { RequestHandler, Router } from "express";
//App Imports
import UserEntity from "../models/User";
import { Controller } from "../types";

export function listHandler<T>(list: () => Promise<T[]>): RequestHandler {
    return async (_req, res, next) => {
        try {
            const items = await list();
            res.json(items);
        } catch (err) {
            next(err);
        }
    };
}

export function getHandler<T>(get: (id: number) => Promise<T>): RequestHandler {
    return async (req, res, next) => {
        try {
            const item = await get(+req.params.id);
            res.json(item);
        } catch (err) {
            next(err);
        }
    };
}

export function getByNameHandler<T>(
    getByName: (name: string) => Promise<T>
): RequestHandler {
    return async (req, res, next) => {
        try {
            const item = await getByName(req.params.name);
            res.json(item);
        } catch (err) {
            next(err);
        }
    };
}

export function addOrEditHandler<T>(
    addOrEdit: (item: T) => Promise<T>
): RequestHandler {
    return async (req, res, next) => {
        try {
            const item = await addOrEdit(req.body);
            res.json(item);
        } catch (err) {
            next(err);
        }
    };
}

export function removeHandler(
    remove: (id: number) => Promise<void>
): RequestHandler {
    return async (req, res, next) => {
        try {
            await remove(+req.params.id);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    };
}

export function loginHandler(
    login: (user: UserEntity) => Promise<string>
): RequestHandler {
    return async (req, res, next) => {
        try {
            const token = await login(req.body);
            res.json(token);
        } catch (err) {
            next(err);
        }
    };
}

export default function genericRoute<T>({
    list,
    get,
    add,
    edit,
    remove,
}: Controller<T>): Router {
    return Router()
        .get("/", listHandler(list))
        .get("/:id", getHandler(get))
        .post("/", addOrEditHandler(add))
        .put("/", addOrEditHandler(edit))
        .delete("/:id", removeHandler(remove));
}
