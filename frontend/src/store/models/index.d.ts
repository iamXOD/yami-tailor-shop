export interface ActorBase {
    name: string
    mobile_phone: string,
    home_phone?: string,
    gender: "F" | "M"
    email?: string
}

export type Actor = ActorBase & { id: number };
export type ActorEntity = ActorBase & { actor_id: number };

export type Model = Actor;
export type Entity = ActorEntity;

export type Item = Model | Entity;

export interface User {
    username: string,
    admin: boolean
}