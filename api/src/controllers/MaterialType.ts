//App Imports
import MaterialTypeEntity from "../models/MaterialType";
import { getController, listController } from "./GenericController";

export const list = listController(MaterialTypeEntity);

export const getByName = getController(MaterialTypeEntity);

export default { list, getByName };
