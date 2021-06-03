//Imports
import { Request } from "express";
import { LessThan, MoreThan } from "typeorm";
//App Imports
import { OptionsFn } from ".";

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
    const match = String(req.query.cursor).match(CURSOR_REG_EXP);
    if (match) {
        isPrevious = match[1] === "prev";
        value = castString(match[2]);
    }
    return { isPrevious, value };
}

function getTake(req: Request, defaultValue: number) {
    return Number(req.query.perPage) || defaultValue;
}

function getOrder(orderByProp: string, previousDirection = false) {
    return { [orderByProp]: previousDirection ? "DESC" : "ASC" };
}

export function castString(value: string): string | number | boolean {
    if (value === "true") {
        return true;
    }
    if (value === "false") {
        return false;
    }
    if (value.match(/^d+$/)) {
        return Number(value);
    }
    return value;
}

const CURSOR_REG_EXP = /^(prev|next)-([a-zA-z0-9]+)$/;
