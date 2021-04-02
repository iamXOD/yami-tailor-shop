//Imports
import { NextFunction, Request, Response, Router } from "express";

export default Router().all(
    "*",
    (_req: Request, _res: Response, next: NextFunction) => {
        const error = new Error();
        error.message = "Resource not found";
        error.status = 404;
        next(error);
    }
);
