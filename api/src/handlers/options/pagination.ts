//Imports
import { Request } from "express";
import { LessThan, MoreThan } from "typeorm";
//App Imports
import { GetOptions, ListOptions } from "../../controllers";
import { castString } from "../../util";
import { ifConditionMergeWhere, OptionsFn } from "./utils";

export function addPagination<T>(
    uniquePropName = "id" as keyof T,
    defaultTake = 5
): OptionsFn<T> {
    return (req, options) => {
        const { isPrevious, value } = getPreviousDirectionAndValue(req);
        const operand = isPrevious ? LessThan : MoreThan;
        options = ifConditionMergeWhere(options, Boolean(value), {
            [uniquePropName]: operand(value),
        } as GetOptions<T>["where"]);
        return {
            ...options,
            take: getTake(req, defaultTake) + 1,
            order: getOrder(uniquePropName, isPrevious),
        };
    };
}

function getPreviousDirectionAndValue(req: Request) {
    let isPrevious = false;
    let value = undefined;
    const match = atob(String(req.query.cursor)).match(CURSOR_REG_EXP);
    if (match) {
        isPrevious = match[1] === "prev";
        value = castString(match[2]);
    }
    return { isPrevious, value };
}

function atob(base64Encoded: string): string {
    return Buffer.from(base64Encoded, "base64").toString("binary");
}

function getTake(req: Request, defaultValue: number) {
    return Number(req.query.perPage) || defaultValue;
}

function getOrder<T>(orderByProp: keyof T, previousDirection = false) {
    return {
        [orderByProp]: previousDirection ? "DESC" : "ASC",
    } as ListOptions<T>["order"];
}

const CURSOR_REG_EXP = /^(prev|next)-([a-zA-z0-9]+)$/;
