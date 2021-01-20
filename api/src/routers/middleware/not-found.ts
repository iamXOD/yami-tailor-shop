import express, { Request, Response, NextFunction } from "express";

const notFoundRouter = express.Router();

notFoundRouter.all("*", (_req: Request, _res: Response, next: NextFunction) => {
    next(new Error("Resource not found"));
})

export = notFoundRouter;