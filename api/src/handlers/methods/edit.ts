//Imports
import { RequestHandler } from "express";
//App Imports
import { EditControllerType } from "../../controllers";

export function editHandler<T>(edit: EditControllerType<T>): RequestHandler {
    return async (req, res, next) => {
        try {
            res.status(200).json(await edit(req.body));
        } catch (err) {
            next(err);
        }
    };
}
