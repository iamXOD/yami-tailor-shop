export interface Actor {
    id?: number;
    name: string;
    mobile_phone: string;
    home_phone?: string;
    gender: "F" | "M";
    email?: string;
}

export const actorURL = "/actors";

export { ActorRoute } from "./components/Route";
