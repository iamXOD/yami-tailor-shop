//Imports
import { Request } from "express";
import path from "path";
import { createLogger, format, transports } from "winston";
//App Imports
import config from "../config";

export const traceLogger = createLogger({
    transports: [
        new transports.File({
            filename: path.resolve(config.logDir, "trace.log"),
            level: "debug",
        }),
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});

export const errorLogger = createLogger({
    transports: [
        new transports.File({
            filename: path.resolve(config.logDir, "error.log"),
            level: "error",
        }),
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});

export function logError(level: string, error: Error): void {
    errorLogger.log(
        level,
        `${new Date().toISOString()}: ${error.status} - ${error.message}`
    );
}

export function logRequest({ method, originalUrl }: Request): void {
    traceLogger.log(
        "info",
        `${new Date().toISOString()}: ${method} - ${originalUrl}`
    );
}
