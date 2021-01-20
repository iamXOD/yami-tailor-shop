import { Request, Response, NextFunction } from "express";

export = function (error: Error, _req: Request, res: Response, _next: NextFunction) {
    res.status(error.statusCode || 500).json({ error: error.toString() });
}