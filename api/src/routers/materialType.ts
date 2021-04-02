//Imports
import { Router } from "express";
//Controller
import { MaterialTypeController } from "../controllers";
//Router
import { NAME_ROUTE, ROOT_ROUTE } from "./constants";
import { getByNameHandler, listHandler } from "./genericHandler";

//Setup
export default Router()
    .get(ROOT_ROUTE, listHandler(MaterialTypeController.list))
    .get(NAME_ROUTE, getByNameHandler(MaterialTypeController.getByName));
