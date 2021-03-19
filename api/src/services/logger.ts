//Imports
import path from "path";
import winston, { createLogger, format, transports } from "winston";
//App Imports
import config from "../config";

export const traceLogger = winston.createLogger({
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
