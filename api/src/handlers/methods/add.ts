//Imports
import { RequestHandler } from "express";
//App Imports
import { AddControllerType } from "../../controllers";

export function addHandler<T>(add: AddControllerType<T>): RequestHandler {
    return async (req, res, next) => {
        try {
            res.status(201).json(await add(req.body));
        } catch (err) {
            next(err);
        }
    };
}
