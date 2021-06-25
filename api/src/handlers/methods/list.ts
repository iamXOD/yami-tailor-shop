//Imports
import { RequestHandler } from "express";
import { LessThan, MoreThan } from "typeorm";
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
            const isOrderDescending = isOrderDESC(options.order);
            const perPage = options.take ? options.take - 1 : 5;

            const operand = isOrderDescending ? MoreThan : LessThan;
            const prev = await list({
                where: { [idPropName]: operand(items[0][idPropName]) },
                take: 1,
            } as ListOptions<T>).catch(() => undefined);

            let prevLink = undefined;
            if (prev?.length) {
                const cursor = String(items[0][idPropName]);
                prevLink = getCursorLink(req.baseUrl, perPage, cursor, "prev");
            }

            let nextLink = undefined;
            if (items.length === options.take) {
                items.pop();
                const cursor = String(items[items.length - 1][idPropName]);
                nextLink = getCursorLink(req.baseUrl, perPage, cursor, "next");
            }

            let link = "";
            if (nextLink) {
                link += nextLink;
            }
            if (prevLink) {
                link += prevLink;
            }

            if (link) {
                res.setHeader("Link", link);
            }

            if (isOrderDescending) {
                items.reverse();
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

function getCursorLink(
    baseUrl: string,
    perPage: number,
    cursor: string,
    direction: "prev" | "next" = "next"
) {
    return `url=${baseUrl}?perPage=${perPage}&cursor=${btoa(
        `${direction}-${cursor}`
    )} rel=${direction} `;
}

function btoa(value: string): string {
    return Buffer.from(value, "binary").toString("base64");
}
