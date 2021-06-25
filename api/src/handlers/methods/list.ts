//Imports
import { RequestHandler } from "express";
import { LessThan, MoreThan } from "typeorm";
//App Imports
import config from "../../config";
import { ListControllerType, ListOptions } from "../../controllers";
import { addPagination, IdentityOption } from "../options";

const DEFAULT_TAKE_VALUE = 5;

export function listHandler<T>(
    list: ListControllerType<T>,
    optionFn = IdentityOption,
    idPropName = "id" as keyof T
): RequestHandler {
    return async (req, res, next) => {
        const options = optionFn(
            req,
            addPagination<T>(idPropName, DEFAULT_TAKE_VALUE)(req)
        ) as ListOptions<T>;

        try {
            let items = await list(options);
            const isOrderDescending = isOrderDESC(options.order);
            const getCursorLink = getBaseLink(
                req.baseUrl,
                options.take ? options.take - 1 : DEFAULT_TAKE_VALUE
            );

            const operand = isOrderDescending ? MoreThan : LessThan;
            const prev = await list({
                where: { [idPropName]: operand(items[0][idPropName]) },
                take: 1,
            } as ListOptions<T>);
            let prevLink = undefined;
            if (prev?.length) {
                prevLink = getCursorLink(String(items[0][idPropName]), "prev");
            }

            let nextLink = undefined;
            if (items.length === options.take) {
                items = items.slice(0, -1);
                nextLink = getCursorLink(
                    String(items[items.length - 1][idPropName]),
                    "next"
                );
            }

            const link = [nextLink, prevLink].filter((l) => l).join(", ");

            if (link) {
                res.setHeader("Link", link);
            }

            if (isOrderDescending) {
                items = items.slice().reverse();
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

function getBaseLink(baseUrl: string, perPage: number) {
    return (cursor: string, direction: "prev" | "next" = "next") =>
        `<http://${config.host}:${
            config.port
        }${baseUrl}?perPage=${perPage}&cursor=${btoa(
            `${direction}-${cursor}`
        )}>; rel="${direction}"`;
}

function btoa(value: string): string {
    return Buffer.from(value, "binary").toString("base64");
}
