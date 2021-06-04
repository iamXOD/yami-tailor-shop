//Imports
import { NextFunction, Request, Response, Router } from "express";
//App Imports
import { ResourceNotFoundError } from "../errors";

export default Router().all(
    "*",
    (_req: Request, _res: Response, next: NextFunction) => {
        next(new ResourceNotFoundError());
    }
);
