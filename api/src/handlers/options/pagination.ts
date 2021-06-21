//Imports
import { Request } from "express";
import { LessThan, MoreThan } from "typeorm";
//App Imports
import { castString } from "../../util";
import { ifConditionMergeWhere, OptionsFn } from "./utils";

export function addPagination<T>(
    uniquePropName = "id",
    defaultTake = 5
): OptionsFn<T> {
    return (req, options) => {
        const { isPrevious, value } = getPreviousDirectionAndValue(req);
        const operand = isPrevious ? LessThan : MoreThan;
        options = ifConditionMergeWhere(options, Boolean(value), {
            [uniquePropName]: operand(value),
        });
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

function getOrder(orderByProp: string, previousDirection = false) {
    return { [orderByProp]: previousDirection ? "DESC" : "ASC" };
}

const CURSOR_REG_EXP = /^(prev|next)-([a-zA-z0-9]+)$/;
