//Imports
import { ErrorRequestHandler } from "express";
import { Logger } from "winston";

export default function errorLogger(logger: Logger): ErrorRequestHandler {
    return (
        error,
        _req,
        res,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _next
    ) => {
        let logLevel: string;
        if (error.statusCode >= 500) {
            logLevel = "error";
        } else if (error.statusCode >= 400) {
            logLevel = "warn";
        } else {
            logLevel = "info";
        }
        logger.log(
            logLevel,
            `${new Date().toISOString()}: ${error.statusCode} - ${
                error.message
            }`
        );
        res.status(error.statusCode || 500).json(error);
    };
}
