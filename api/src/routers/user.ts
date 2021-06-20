//Imports
import { Router } from "express";
//App Imports
import { UserHandler } from "../handlers";
import { isAdmin } from "../middlewares";
import { NAME_ROUTE } from "./constants";

//Setup
export default Router()
    .get("/users", isAdmin, UserHandler.list)
    .get("/users" + NAME_ROUTE, isAdmin, UserHandler.getByName)
    .get("/me", UserHandler.getCurrent)
    .post("/register", isAdmin, UserHandler.register)
    .post("/login", UserHandler.login);
