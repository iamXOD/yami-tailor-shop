//Imports
import express, { Request, Response, NextFunction } from "express";

//App Imports
import { verify, register, login } from "./middleware/auth";
import dao from "../db/dao";
import { databaseURL } from "../config";

//Setup
const userRouter = express.Router();
dao.setURL(databaseURL);

userRouter.get("/users", verify, (_req: Request, res: Response, next: NextFunction) => {
    dao.all("user")
        .then(data => res.json(data.map(({ username, admin }: Model.User) => ({ username, admin }))))
        .catch(err => next(err));
})

userRouter.get("/user/:id", verify, (req: Request, res: Response, next: NextFunction) => {
    dao.get("user", Number(req.params.id))
        .then(({ username, admin }: Model.User) => res.json({ username, admin }))
        .catch(err => next(err));
})

userRouter.post("/user/add", verify, (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.admin) {
        register(req.body).then(({ lastID }) => res.json(lastID));
    } else { next(new Error("You need to be admin")) }
})
userRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as Model.User;
    if (!username || !password) { throw new Error("Missing parameters to login") }
    login(req.body).then(token => {
        if (token) { res.json(token) }
        else { next(new Error("Invalid username or password")) }
    }).catch(err => next(err));
})

export = userRouter;