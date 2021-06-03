//Imports
import { RequestHandler } from "express";
//App Imports
import { ListControllerType, ListOptions } from "../../controllers";
import { addPagination, IdentityOption } from "../options";

export function listHandler<T>(
    list: ListControllerType<T>,
    optionFn = IdentityOption,
    idPropName = "id"
): RequestHandler {
    return async (req, res, next) => {
        const options = optionFn(
            req,
            addPagination<T>(idPropName)(req)
        ) as ListOptions<T>;
        try {
            const items = await list(options);

            if (isOrderDESC(options.order)) {
                items.reverse();
            }
            if (items.length === options.take) {
                items.pop();
                const cursorItem = items[items.length - 1] as any;
                res.setHeader(
                    "Link",
                    `url=${req.baseUrl}?cursor=next-${
                        cursorItem[idPropName]
                    }&perPage=${options.take - 1}`
                );
            }

            res.json(items);
        } catch (err) {
            next(err);
        }
    };
}

function isOrderDESC<T>(order: ListOptions<T>["order"]): boolean {
    if (!order) {
        return false;
    }
    const firstPropOfOrder = Object.keys(
        order
    )[0] as keyof ListOptions<T>["order"];
    return order[firstPropOfOrder] === "DESC";
}
