//App Imports
import UserEntity from "../models/User";

export type listControllerType<T> = (options: ListOptions<T>) => Promise<T[]>;
export type getControllerType<T> = (options: GetOptions<T>) => Promise<T>;
export type addOrEditControllerType<T> = (item: T) => Promise<T>;
export type removeControllerType<T> = (options: GetOptions<T>) => Promise<void>;
export type loginControllerType = (user: UserEntity) => Promise<string>;

export interface ControllerType<T> {
    list: listControllerType<T>;
    get: getControllerType<T>;
    add: addOrEditControllerType<T>;
    edit: addOrEditControllerType<T>;
    remove: removeControllerType;
}

export interface GetOptions<T = any> {
    where?: Partial<T>;
}

export interface ListOptions<T = any> extends GetOptions<T> {
    skip: number = 0;
    take: number = 5;
}
