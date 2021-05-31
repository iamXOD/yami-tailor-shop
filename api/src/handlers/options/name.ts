//App Imports
import { OptionsFn } from ".";

export const addName: OptionsFn = (req, options = {}) => {
    const name = req.params.name;
    if (name) {
        return {
            ...options,
            where: ({ ...options.where, name } as unknown) as Partial<any>,
        };
    }
    return options;
};
