//Imports
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//App Imports
import { secret, databaseURL, saltRounds } from "../../config";
import dao from "../../db/dao";
import { Request, Response, NextFunction } from "express";

//Setup
dao.setURL(databaseURL);

export function verify(request: Request, _res: Response, next: NextFunction) {
    request.user = null;
    let token = request.body.token ||
        request.query.token ||
        request.headers['x-access-token'] ||
        request.cookies.token;
    if (token && token != "null") {
        request.user = Object(jwt.verify(token, secret));
        next();
    } else { next(new Error("You must authenticate first")) }
}

export function register({ username, password, admin = false }: Model.User) {
    return dao.getUser(username).then(user => {
        if (user) { throw new Error("username already in use"); }
        return bcrypt.hash(password, saltRounds);
    }).then((salted_password) => {
        return dao.insert("user", {
            username,
            salted_password,
            admin: Boolean(admin)
        });
    });
}

export function login({ username, password }: Model.User) {
    return dao.getUser(username).then(user => {
        return bcrypt.compare(password, user.salted_password)
            .then(check => {
                if (check) { return jwt.sign({ username: user.username, admin: user.admin }, secret) }
                throw new Error("Wrong username or password");
            });
    });
}