//Imports
import { RequestHandler } from "express";
//App Imports
import { ControllerType } from "../../controllers";
import { OptionsFn } from "../options";
import { addHandler } from "./add";
import { editHandler } from "./edit";
import { getHandler } from "./get";
import { listHandler } from "./list";
import { removeHandler } from "./remove";

export interface HandlerType {
    list: RequestHandler;
    get: RequestHandler;
    add: RequestHandler;
    edit: RequestHandler;
    remove: RequestHandler;
}

export interface HandlerOptions<T> {
    all?: OptionsFn<T>;
    list?: OptionsFn<T>;
    get?: OptionsFn<T>;
    remove?: OptionsFn<T>;
}

export function buildHandler<T>(
    controller: ControllerType<T>,
    options?: HandlerOptions<T>
): HandlerType {
    return {
        list: listHandler(controller.list, options?.list || options?.all),
        get: getHandler(controller.get, options?.get || options?.all),
        add: addHandler(controller.add),
        edit: editHandler(controller.edit),
        remove: removeHandler(
            controller.remove,
            options?.remove || options?.all
        ),
    };
}
