//App Imports
import { Actor } from "../actor";
import { User } from "../user";

export * from "./useAdd";
export * from "./useDelete";
export * from "./useFilter";
export * from "./useGet";
export * from "./useInput";
export * from "./useList";
export * from "./useToggler";
export * from "./useUpdate";

export type Model = Actor | User;
