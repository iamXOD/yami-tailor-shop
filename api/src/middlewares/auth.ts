//Imports
import { plainToClass } from "class-transformer";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
//App Imports
import config from "../config";
import { ResourceNotFoundError, UnauthorizedError } from "../errors";
import { UserEntity } from "../models";

interface Route {
    url: string;
    method?: string[];
}

const OpenRoutes: Route[] = [{ url: "/login", method: ["POST"] }];

function isOpenRoute(url: string, method?: string): boolean {
    const index = OpenRoutes.findIndex((route) => route.url === url);
    if (index === -1) {
        return false;
    }
    const route = OpenRoutes[index];
    if (route.method && method) {
        return route.method.includes(method);
    }
    return true;
}

export const auth: RequestHandler = (req, _res, next) => {
    if (isOpenRoute(req.url, req.method)) {
        return next();
    }
    req.user = null;
    const token =
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"] ||
        req.headers.authorization?.split(" ")[1] ||
        req.cookies.token;
    if (token && token !== "null" && token !== "undefined") {
        req.user = plainToClass(UserEntity, jwt.verify(token, config.secret));
        next();
    } else {
        next(new UnauthorizedError("You must authenticate first"));
    }
};

export const isAdmin: RequestHandler = (req, _res, next) => {
    req.user?.admin ? next() : next(new ResourceNotFoundError());
};
