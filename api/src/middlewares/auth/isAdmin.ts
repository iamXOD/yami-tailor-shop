//Imports
import { RequestHandler } from "express";
//App Imports
import { ResourceNotFoundError } from "../../errors";

export const isAdmin: RequestHandler = (req, _res, next) => {
    req.user?.admin ? next() : next(new ResourceNotFoundError());
};
