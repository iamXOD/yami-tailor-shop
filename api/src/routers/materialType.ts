//Imports
import { Router } from "express";
//App Imports
import { MaterialTypeHandler } from "../handlers";
import { NAME_ROUTE, ROOT_ROUTE } from "./constants";

//Setup
export default Router()
    .get(ROOT_ROUTE, MaterialTypeHandler.list)
    .get(NAME_ROUTE, MaterialTypeHandler.getByName);
