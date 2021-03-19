//Imports
import express, { NextFunction, Request, Response } from "express";

//Setup
const notFoundRouter = express.Router();

notFoundRouter.all("*", (_req: Request, _res: Response, next: NextFunction) => {
    const error = new Error();
    error.message = "Resource not found";
    error.statusCode = 404;
    next(error);
});

export default notFoundRouter;
