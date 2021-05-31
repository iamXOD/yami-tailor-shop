//App Imports
import { OptionsFn } from ".";

export const addPagination: OptionsFn = (req, options) => {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 5;
    return { ...options, skip: (page - 1) * perPage, take: perPage };
};
