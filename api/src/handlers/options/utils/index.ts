//App Imports
import { Request } from "express";
import { GetOptions } from "../../../controllers";

export type OptionsFn<T = any> = (
    request: Request,
    options?: GetOptions<T>
) => GetOptions<T>;

export * from "./identity";
export { ifConditionMergeWhere } from "./mergeWhere";
export * from "./paramToWhere";
