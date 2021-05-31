//Imports
import { Router, RouterOptions } from "express";
//App Imports
import { HandlerType } from "../handlers";
import { ID_ROUTE, ROOT_ROUTE } from "./constants";

export default function buildRouter(
    handler: HandlerType,
    options?: RouterOptions
): Router {
    return Router(options)
        .get(ROOT_ROUTE, handler.list)
        .post(ROOT_ROUTE, handler.add)
        .put(ROOT_ROUTE, handler.edit)
        .get(ID_ROUTE, handler.get)
        .delete(ID_ROUTE, handler.remove);
}
