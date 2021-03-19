//Imports
import { Router } from "express";
//App Imports
import { get, list, login, register } from "../controllers/User";
import { isAdmin } from "../middlewares/auth";
import {
    addOrEditHandler,
    getByNameHandler,
    listHandler,
    loginHandler,
} from "./requestHandler";

//Setup
export default Router()
    .get("/users", isAdmin, listHandler(list))
    .get("/users/:name", isAdmin, getByNameHandler(get))
    .post("/register", isAdmin, addOrEditHandler(register))
    .post("/login", loginHandler(login));
