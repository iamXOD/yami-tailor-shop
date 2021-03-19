export interface Controller<T> {
    list: () => Promise<T[]>;
    get: (id: number) => Promise<T | undefined>;
    add: (item: T) => Promise<T>;
    edit: (item: T) => Promise<T>;
    remove: (id: number) => Promise<void>;
}
