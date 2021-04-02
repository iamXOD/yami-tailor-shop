/* eslint-disable @typescript-eslint/no-explicit-any */
//Imports
import { Request } from "express";
//App Imports
import { GetOptions, ListOptions } from "../../controllers/types";

export type OptionsFn<T = any, O = GetOptions<T> | ListOptions<T>> = (
    request: Request,
    options?: O
) => O;
