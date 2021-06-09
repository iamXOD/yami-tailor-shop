//Imports
import { ErrorRequestHandler } from "express";
//App Imports
import { JSONParseError } from "../../errors";
import { logError } from "../../services";

export const JSONErrorHandler: ErrorRequestHandler = (
    error,
    _req,
    res,
    next
) => {
    if (error instanceof SyntaxError) {
        const jsonParseError = new JSONParseError(error.message);
        logError("warn", jsonParseError);
        res.status(jsonParseError.status).send(jsonParseError);
    } else {
        next(error);
    }
};
