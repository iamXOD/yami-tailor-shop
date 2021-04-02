//Imports
import { Router } from "express";
//App Imports
import { UserController } from "../controllers";
import { isAdmin } from "../middlewares";
import { NAME_ROUTE } from "./constants";
import {
    addOrEditHandler,
    getByNameHandler,
    listHandler,
    loginHandler,
} from "./genericHandler";

//Setup
export default Router()
    .get("/users", isAdmin, listHandler(UserController.list))
    .get(
        "/users" + NAME_ROUTE,
        isAdmin,
        getByNameHandler(UserController.getByName, (req) => ({
            where: {
                username: req.params.name.toLowerCase(),
            },
        }))
    )
    .post("/register", isAdmin, addOrEditHandler(UserController.register))
    .post("/login", loginHandler(UserController.login));
