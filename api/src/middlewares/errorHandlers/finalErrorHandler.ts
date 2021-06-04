//Imports
import { NextFunction, Request, Response } from "express";
//App Imports
import { BaseError, InternalError } from "../../errors";
import { logError } from "../../services";

export function finalErrorHandler(
    error: BaseError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void {
    error = IfStatusUndefinedSetTo500(error);
    logError(getLogLevel(error), error);
    res.status(error.status).json(hideErrorIfInternal(error));
}

function IfStatusUndefinedSetTo500(error: BaseError): BaseError {
    if (!error.status) {
        return new BaseError(error.message, 500, "unknown-error");
    }
    return error;
}

function getLogLevel(error: BaseError): "error" | "warn" | "info" {
    if (error.status >= 500) {
        return "error";
    } else if (error.status >= 400) {
        return "warn";
    }
    return "info";
}

function hideErrorIfInternal(error: BaseError): BaseError {
    if (error.status >= 500) {
        return new InternalError(error.status);
    }
    return error;
}
