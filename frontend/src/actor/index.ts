export interface Actor {
    id?: number;
    name: string;
    mobile_phone: string;
    home_phone?: string;
    gender: "F" | "M";
    email?: string;
}

export const defaultActor: Actor = {
    name: "",
    mobile_phone: "",
    home_phone: undefined,
    email: undefined,
    gender: "F",
};

export const actorURL = "/actors";

export * from "./components/Route";
