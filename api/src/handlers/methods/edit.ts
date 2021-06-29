//Imports
import { RequestHandler } from "express";
//App Imports
import { EditControllerType } from "../../controllers";
import { addId, IdentityOption } from "../options";

export function editHandler<T>(
    edit: EditControllerType<T>,
    optionFn = IdentityOption
): RequestHandler {
    return async (req, res, next) => {
        try {
            res.status(200).json(
                await edit(req.body, optionFn(req, addId(req)))
            );
        } catch (err) {
            next(err);
        }
    };
}
