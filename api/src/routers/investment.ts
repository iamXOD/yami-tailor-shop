//Imports
import { Router } from "express";
//App Imports
import { InvestmentController } from "../controllers";
import { ID_ROUTE, ROOT_ROUTE } from "./constants";
import { addActorId, addMaterialId } from "./controller-options";
import { OptionsFn } from "./controller-options/types";
import {
    addOrEditHandler,
    getHandler,
    listHandler,
    removeHandler,
} from "./genericHandler";

const addCriteria: OptionsFn = (req) =>
    addActorId("supplierId")(req, addMaterialId(req));

export const list = listHandler(InvestmentController.list, addCriteria);

export const add = addOrEditHandler(InvestmentController.add);

export const edit = addOrEditHandler(InvestmentController.edit);

export const get = getHandler(InvestmentController.get, addCriteria);

export const remove = removeHandler(InvestmentController.remove);

export default Router({ mergeParams: true })
    .get(ROOT_ROUTE, list)
    .post(ROOT_ROUTE, add)
    .put(ROOT_ROUTE, edit)
    .get(ID_ROUTE, get)
    .delete(ID_ROUTE, remove);
