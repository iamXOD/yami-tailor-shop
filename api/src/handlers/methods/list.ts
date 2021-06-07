//Imports
import { RequestHandler } from "express";
//App Imports
import { ListControllerType, ListOptions } from "../../controllers";
import { addPagination, IdentityOption } from "../options";

export function listHandler<T>(
    list: ListControllerType<T>,
    optionFn = IdentityOption,
    idPropName = "id" as keyof T
): RequestHandler {
    return async (req, res, next) => {
        const options = optionFn(
            req,
            addPagination<T>(idPropName.toString())(req)
        ) as ListOptions<T>;
        try {
            const items = await list(options);

            if (isOrderDESC(options.order)) {
                items.reverse();
            }
            if (items.length === options.take) {
                items.pop();
                const cursor = String(items[items.length - 1][idPropName]);
                res.setHeader(
                    "Link",
                    getCursorLink(req.baseUrl, options.take - 1, cursor)
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
    const firstOrder = Object.values(order)[0];
    return firstOrder === "DESC" || firstOrder === -1;
}

function getCursorLink(baseUrl: string, perPage: number, cursor: string) {
    return `url=${baseUrl}?perPage=${perPage}&cursor=${btoa(`next-${cursor}`)}`;
}

function btoa(value: string): string {
    return Buffer.from(value, "binary").toString("base64");
}
