//Imports
import { RequestHandler } from "express";
//App Imports
import { RemoveControllerType } from "../../controllers";
import { addId, IdentityOption } from "../options";

export function removeHandler<T>(
    remove: RemoveControllerType<T>,
    optionFn = IdentityOption
): RequestHandler {
    return async (req, res, next) => {
        try {
            await remove(optionFn(req, addId(req)));
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    };
}
