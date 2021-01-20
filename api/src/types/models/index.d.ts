declare namespace Model {
    export interface Actor {
        id: number,
        name: String
        mobile_phone: string,
        home_phone: string,
        gender: "F" | "M"
        email: string
    }
    export interface MaterialType {
        id: number,
        name: string
        unit: "unit" | "m" | "m^2"
    }
    export interface Fix {
        id: number,
        date: Actor,
        price: number,
        payed: number,
        type: string,
        status: number,
        description: string
    }
    export interface Material {
        id: number,
        type: MaterialType,
        color: string,
        description: string
    }
    export interface Order {
        id: number,
        date: Date,
        costumer: Actor,
        material: Material,
        price: number,
        payed: number,
        status: number
        piece: string
    }
    export interface Investment {
        id: number,
        date: Date,
        supplier: Actor,
        material: Material,
        ammount: number,
        total_price: number,
        description: string
    }
    export interface User {
        username: string,
        password?: string,
        admin: boolean
    }
    export interface UserTable {
        username: string,
        salted_password: string
        admin: boolean
    }
}