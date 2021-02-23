//Imports
import express, { Request, Response, NextFunction } from "express";

//App Imports
import { register, login } from "../middlewares/auth";

//Setup
const userRouter = express.Router();

userRouter.get("/users", (req: Request, res: Response, next: NextFunction) => {
    req.dao
        .all("user")
        .then((data) =>
            res.json(
                data.map(({ username, admin }: Model.UserTable) => ({
                    username,
                    admin,
                }))
            )
        )
        .catch((err) => next(err));
});

userRouter.get(
    "/user/:id",
    (req: Request, res: Response, next: NextFunction) => {
        req.dao
            .get("user", Number(req.params.id))
            .then(({ username, admin }: Model.UserTable) =>
                res.json({ username, admin })
            )
            .catch((err) => next(err));
    }
);

userRouter.post(
    "/user/add",
    (req: Request, res: Response, next: NextFunction) => {
        if (req.user && req.user.admin) {
            register(req.body).then(({ lastID }) => res.json(lastID));
        } else {
            next(new Error("You need to be admin"));
        }
    }
);
userRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as Model.User;
    if (!username || !password) {
        throw new Error("Missing parameters to login");
    }
    login(req.body)
        .then((token) => {
            if (token) {
                res.json(token);
            } else {
                next(new Error("Invalid username or password"));
            }
        })
        .catch((err) => next(err));
});

export default userRouter;
