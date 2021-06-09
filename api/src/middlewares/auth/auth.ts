//Imports
import { plainToClass } from "class-transformer";
import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
//App Imports
import config from "../../config";
import { UnauthorizedError } from "../../errors";
import { UserEntity } from "../../models";
import { isOpenRoute } from "./isOpenRoute";

export const auth: RequestHandler = (req, _res, next) => {
    if (isOpenRoute(req.url, req.method)) {
        return next();
    }
    req.user = undefined;
    const token = getToken(req);
    if (isValidToken(token)) {
        req.user = plainToClass(UserEntity, jwt.verify(token, config.secret));
        next();
    } else {
        next(new UnauthorizedError("You must authenticate first"));
    }
};

function getToken(req: Request): string {
    return (
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"] ||
        req.headers.authorization?.split(" ")[1] ||
        req.cookies.token
    );
}

function isValidToken(token?: string): boolean {
    return (
        Boolean(token) &&
        typeof token === "string" &&
        token !== "null" &&
        token !== "undefined"
    );
}
