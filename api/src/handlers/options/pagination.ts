//Imports
import { Request } from "express";
import { LessThan, MoreThan } from "typeorm";
//App Imports
import { OptionsFn } from ".";
import { castString } from "../../util";

export function addPagination<T>(uniquePropName = "id"): OptionsFn<T> {
    return (req, options) => {
        const { isPrevious, value } = getPreviousDirectionAndValue(req);
        const operand = isPrevious ? LessThan : MoreThan;
        if (value) {
            options = {
                ...options,
                where: { ...options?.where, [uniquePropName]: operand(value) },
            };
        }

        return {
            ...options,
            take: getTake(req, 5) + 1,
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
