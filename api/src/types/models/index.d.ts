declare namespace Model {
    export interface Actor {
        id?: number;
        name: string;
        mobile_phone: string;
        home_phone: string;
        gender: "F" | "M";
        email: string;
    }
    export interface MaterialType {
        id?: number;
        name: string;
        unit: "unit" | "m" | "m^2";
    }
    export interface Fix {
        id?: number;
        date: Actor;
        price: number;
        payed: number;
        type: string;
        status: number;
        description: string;
    }
    export interface Material {
        id?: number;
        type: MaterialType;
        color: string;
        description: string;
    }
    export interface Order {
        id?: number;
        date: Date;
        costumer: Actor;
        material: Material;
        price: number;
        payed: number;
        status: number;
        piece: string;
    }
    export interface Investment {
        id?: number;
        date: Date;
        supplier: Actor;
        material: Material;
        ammount: number;
        total_price: number;
        description: string;
    }
    export interface User {
        id?: number;
        username: string;
        password?: string;
        admin: boolean;
    }
    export interface UserTable {
        id?: number;
        username: string;
        salted_password: string;
        admin: boolean;
    }
    export type CollectionName =
        | "actor"
        | "fix"
        | "material_type"
        | "material"
        | "order"
        | "investment"
        | "user";

    export type Collection = (
        | Actor
        | Fix
        | Material
        | MaterialType
        | Order
        | Investment
        | UserTable
    ) & { [x: string]: any };
}

declare namespace dbUtil {
    export interface DAO {
        setURL(dbURL: string): void;
        all(collection: Model.CollectionName): Promise<Model.Collection[]>;
        get(
            collection: Model.CollectionName,
            id: number
        ): Promise<Model.Collection>;
        insert(
            collection: Model.CollectionName,
            newObject: Model.Collection
        ): Promise<import("sqlite3").RunResult>;
        update(
            collection: Model.CollectionName,
            newObject: Model.Collection
        ): Promise<import("sqlite3").RunResult>;
        remove(
            collection: Model.CollectionName,
            id: number
        ): Promise<import("sqlite3").RunResult>;
        find(query: string, params: any[]): Promise<Model.Collection>;
        query(
            query: string,
            params: any[]
        ): Promise<import("sqlite3").RunResult>;
        getUser(username: string): Promise<Model.Collection>;
    }
    export interface dbAction {
        (
            resolve: {
                (value?: unknown): void;
            },
            reject: {
                (reason?: any): void;
            },
            db: import("sqlite3").Database
        ): void;
    }

    export interface Wrapper {
        (action: dbAction): Promise<any>;
    }
}
