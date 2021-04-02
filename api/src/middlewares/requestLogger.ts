//Imports
import { RequestHandler } from "express";
//App Imports
import { logRequest } from "../services";

export const requestLogger: RequestHandler = (req, _res, next) => {
    logRequest(req);
    next();
};
