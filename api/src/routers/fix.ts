//Imports
import { Router } from "express";
//App Imports
import { FixController } from "../controllers";
import { ID_ROUTE, ROOT_ROUTE } from "./constants";
import { addActorId } from "./controller-options";
import {
    addOrEditHandler,
    getHandler,
    listHandler,
    removeHandler,
} from "./genericHandler";

const addCostumerId = addActorId("costumerId");

export const list = listHandler(FixController.list, addCostumerId);

export const add = addOrEditHandler(FixController.add);

export const edit = addOrEditHandler(FixController.edit);

export const get = getHandler(FixController.get, addCostumerId);

export const remove = removeHandler(FixController.remove);

export default Router({ mergeParams: true })
    .get(ROOT_ROUTE, list)
    .post(ROOT_ROUTE, add)
    .put(ROOT_ROUTE, edit)
    .get(ID_ROUTE, get)
    .delete(ID_ROUTE, remove);
