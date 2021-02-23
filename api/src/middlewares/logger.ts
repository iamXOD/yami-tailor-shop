//App Imports
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

//Types
import { Logger } from "winston";

export default function loggerRoute(logger: Logger): ErrorRequestHandler {
    return (
        error: Error,
        req: Request,
        _res: Response,
        next: NextFunction
    ): void => {
        const d = new Date();
        const time = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

        let logLevel: string;
        if (error.statusCode >= 500) {
            logLevel = "error";
        } else if (error.statusCode >= 400) {
            logLevel = "warn";
        } else {
            logLevel = "info";
        }

        const msg = `${time} - ${req.method} ${req.originalUrl} ${error.statusCode} ${error.message}`;

        logger.log(logLevel, msg);
        next(error);
    };
}
