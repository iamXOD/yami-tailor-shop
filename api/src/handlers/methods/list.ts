//Imports
import { RequestHandler } from "express";
//App Imports
import { ListControllerType, ListOptions } from "../../controllers";
import { addPagination, IdentityOption } from "../options";

export function listHandler<T>(
    list: ListControllerType<T>,
    optionFn = IdentityOption
): RequestHandler {
    return async (req, res, next) => {
        try {
            res.json(
                await list(optionFn(req, addPagination(req)) as ListOptions<T>)
            );
        } catch (err) {
            next(err);
        }
    };
}
