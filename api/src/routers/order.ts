//Imports
import { Router } from "express";
//App Imports
import { OrderController } from "../controllers";
import { ID_ROUTE, ROOT_ROUTE } from "./constants";
import { addActorId, addMaterialId, OptionsFn } from "./controller-options";
import {
    addOrEditHandler,
    getHandler,
    listHandler,
    removeHandler,
} from "./genericHandler";

const addCriteria: OptionsFn = (req) =>
    addActorId("costumerId")(req, addMaterialId(req));

export const list = listHandler(OrderController.list, addCriteria);

export const add = addOrEditHandler(OrderController.add);

export const edit = addOrEditHandler(OrderController.edit);

export const get = getHandler(OrderController.get, addCriteria);

export const remove = removeHandler(OrderController.remove);

export default Router({ mergeParams: true })
    .get(ROOT_ROUTE, list)
    .post(ROOT_ROUTE, add)
    .put(ROOT_ROUTE, edit)
    .get(ID_ROUTE, get)
    .delete(ID_ROUTE, remove);
