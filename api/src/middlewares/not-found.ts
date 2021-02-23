//Imports
import express, { Request, Response, NextFunction } from "express";

//Setup
const notFoundRouter = express.Router();

notFoundRouter.all("*", (_req: Request, _res: Response, next: NextFunction) => {
    const error = new Error("Resource not found");
    error.statusCode = 404;
    next(error);
});

export default notFoundRouter;
