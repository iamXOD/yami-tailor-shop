export interface Actor {
    id?: number;
    name: string;
    mobile_phone: string;
    home_phone?: string;
    gender: "F" | "M";
    email?: string;
}

export interface User {
    username: string;
    admin: boolean;
}

export type Model = Actor | User;
