//App Imports
import { OptionsFn } from ".";
import { GetOptions } from "../../../controllers";
import { ifConditionMergeWhere } from "./mergeWhere";

export function addParamToWhere<T>(
    castingFunction: (s: string) => unknown,
    reqParamName: string,
    propName = reqParamName as keyof T
): OptionsFn<T> {
    return function (req, options) {
        const param = req.params[reqParamName];
        return ifConditionMergeWhere(options, Boolean(param), {
            [propName]: castingFunction(param),
        } as GetOptions<T>["where"]);
    };
}

export function addStringParamToWhere<T>(
    reqParamName: string,
    propName = reqParamName as keyof T
): OptionsFn<T> {
    return addParamToWhere(String, reqParamName, propName);
}
export function addNumberParamToWhere<T>(
    reqParamName: string,
    propName = reqParamName as keyof T
): OptionsFn<T> {
    return addParamToWhere(Number, reqParamName, propName);
}
