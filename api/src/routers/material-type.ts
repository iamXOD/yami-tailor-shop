//Imports
import { Router } from "express";
//Controller
import { get, list } from "../controllers/MaterialType";
//Router
import { getByNameHandler, listHandler } from "./requestHandler";

//Setup
export default Router()
    .get("/material_types", listHandler(list))
    .get("/material_types/:name", getByNameHandler(get));
