//App Imports
import { MaterialTypeController } from "../controllers";
import { getByNameHandler, listHandler } from "./methods";

export const MaterialTypeHandler = {
    list: listHandler(MaterialTypeController.list),
    getByName: getByNameHandler(MaterialTypeController.getByName),
};
