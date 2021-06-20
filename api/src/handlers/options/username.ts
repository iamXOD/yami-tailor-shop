//App Imports
import { OptionsFn } from ".";

export const addUsername: OptionsFn = (req, options) => ({
    ...options,
    where: {
        ...options?.where,
        username: req.params.name.toLowerCase(),
    },
});

export const addCurrentUsername: OptionsFn = (req, options) => ({
    ...options,
    where: {
        ...options?.where,
        username: req.user?.username.toLowerCase(),
    },
});
