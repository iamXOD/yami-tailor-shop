//Imports
import { NextFunction, Request, Response } from "express";

export default function (
    error: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void {
    res.status(error.statusCode || 500).json({ error: error.toString() });
}
