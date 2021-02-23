//Imports
import winston, { format, transports } from "winston";
import path from "path";

//App Imports
import config from "../config";

export default winston.createLogger({
    transports: [
        new transports.File({
            filename: path.resolve(config.logDir, "error.log"),
            level: "error",
        }),
        new transports.File({
            filename: path.resolve(config.logDir, "trace.log"),
            level: "debug",
        }),
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});
