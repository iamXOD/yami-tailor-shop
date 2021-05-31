//Imports
import { Request } from "express";
//App Imports
import { GetOptions } from "../../controllers";

export type OptionsFn<T = any> = (
    request: Request,
    options?: GetOptions<T>
) => GetOptions<T>;

export * from "./actorId";
export * from "./id";
export * from "./identity";
export * from "./materialId";
export * from "./name";
export * from "./pagination";
export * from "./username";
