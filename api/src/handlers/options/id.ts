//App Imports
import { OptionsFn } from ".";

export const addId: OptionsFn = (req, options = {}) => {
    const id = Number(req.params.id);
    if (id) {
        return {
            ...options,
            where: ({ ...options.where, id } as unknown) as Partial<any>,
        };
    }
    return options;
};
