//App Imports
import { GetOptions } from "../../../controllers";

export function mergeWhere<T>(
    options: GetOptions<T>,
    newProps: Record<string, unknown>
): GetOptions<T> {
    return { ...options, where: { ...options.where, ...newProps } };
}

export function ifConditionMergeWhere<T>(
    options: GetOptions<T> = {},
    condition: boolean,
    newProps: Record<string, unknown>
): GetOptions<T> {
    if (condition) {
        return mergeWhere(options, newProps);
    }
    return options;
}
