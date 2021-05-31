//Imports
import { RequestHandler } from "express";
//App Imports
import { GetControllerType } from "../../controllers";
import { addId, IdentityOption } from "../options";

export function getHandler<T>(
    get: GetControllerType<T>,
    optionFn = IdentityOption
): RequestHandler {
    return async (req, res, next) => {
        try {
            res.json(await get(optionFn(req, addId(req))));
        } catch (err) {
            next(err);
        }
    };
}
