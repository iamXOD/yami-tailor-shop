//Imports
import { ErrorRequestHandler } from "express";
//App Imports
import { logError } from "../services";

export const JSONErrorHandler: ErrorRequestHandler = (
    error,
    _req,
    res,
    next
) => {
    if (error instanceof SyntaxError && error.status === 400) {
        logError("warn", error);
        res.status(400).send({
            status: 400,
            message: error.message,
            name: error.name,
        });
    } else {
        next(error);
    }
};

export const errorHandler: ErrorRequestHandler = (
    error,
    _req,
    res,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next
) => {
    let logLevel: string;
    if (error.status >= 500 || !error.status) {
        logLevel = "error";
    } else if (error.status >= 400) {
        logLevel = "warn";
    } else {
        logLevel = "info";
    }
    const errorCode = error.status || 500;
    const errorToSend =
        error.status && error.status !== 500
            ? error
            : {
                  message: "We are facing an internal error. Please try later",
              };
    logError(logLevel, error);
    res.status(errorCode).json(errorToSend);
};
