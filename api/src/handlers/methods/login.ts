//Imports
import { RequestHandler } from "express";
//App Imports
import { LoginControllerType } from "../../controllers";

export function loginHandler(login: LoginControllerType): RequestHandler {
    return async (req, res, next) => {
        try {
            res.json(await login(req.body));
        } catch (err) {
            next(err);
        }
    };
}
