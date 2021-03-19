//App Imports
import { NextFunction, Request, Response, Router } from "express";
//Types
import { Logger } from "winston";

export default function requestLogger(logger: Logger): Router {
    return Router().use((req: Request, _res: Response, next: NextFunction) => {
        logger.log(
            "info",
            `${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
        );
        next();
    });
}
