//App Imports
import { Request } from "express";
import { GetOptions } from "../../../controllers";

export type OptionsFn<T = any> = (
    request: Request,
    options?: GetOptions<T>
) => GetOptions<T>;

export { IdentityOption } from "./identity";
export { ifConditionMergeWhere } from "./mergeWhere";
export {
    addNumberParamToWhere,
    addParamToWhere,
    addStringParamToWhere,
} from "./paramToWhere";
