//Imports
import { plainToClass } from "class-transformer";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
//App Imports
import config from "../config";
import UserEntity from "../models/User";

export const auth: RequestHandler = (req, _res, next) => {
    if (req.url === "/login" && req.method === "POST") {
        return next();
    }
    req.user = null;
    const token =
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"] ||
        req.headers.authorization?.split(" ")[1] ||
        req.cookies.token;
    if (token && token != "null") {
        req.user = plainToClass(UserEntity, jwt.verify(token, config.secret));
        next();
    } else {
        const err = new Error();
        err.message = "You must authenticate first";
        err.statusCode = 403;
        next(err);
    }
};

export const isAdmin: RequestHandler = (req, _res, next) => {
    if (req.user?.admin) {
        next();
    } else {
        const error = new Error();
        error.message = "Resource not found";
        error.statusCode = 404;
        next(error);
    }
};
