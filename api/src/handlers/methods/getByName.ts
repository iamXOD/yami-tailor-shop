//Imports
import { RequestHandler } from "express";
//App Imports
import { GetControllerType } from "../../controllers";
import { addName } from "../options";

export function getByNameHandler<T>(
    getByName: GetControllerType<T>,
    optionFn = addName
): RequestHandler {
    return async (req, res, next) => {
        try {
            res.json(await getByName(optionFn(req)));
        } catch (err) {
            next(err);
        }
    };
}
