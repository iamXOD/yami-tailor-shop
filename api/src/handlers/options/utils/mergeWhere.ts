//App Imports
import { GetOptions } from "../../../controllers";

export function mergeWhere<T>(
    options: GetOptions<T>,
    newProps: GetOptions<T>["where"]
): GetOptions<T> {
    return { ...options, where: { ...options.where, ...newProps } };
}

export function ifConditionMergeWhere<T>(
    options: GetOptions<T> = {},
    condition: boolean,
    newProps: GetOptions<T>["where"]
): GetOptions<T> {
    if (condition) {
        return mergeWhere(options, newProps);
    }
    return options;
}
