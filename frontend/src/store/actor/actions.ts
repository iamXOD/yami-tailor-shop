//App Imports
import { Actor } from "./reducer";

export const ACTOR_ADD = "ACTOR/ADD";
export const ACTOR_UPDATE = "ACTOR/UPDATE";
export const ACTOR_REMOVE = "ACTOR/REMOVE";
export const ACTOR_GET = "ACTOR/GET";

export type AddActorAction = { type: typeof ACTOR_ADD; actor: Actor };
export type UpdateActorAction = { type: typeof ACTOR_UPDATE; actor: Actor };
export type RemoveActorAction = { type: typeof ACTOR_REMOVE; id: number };
export type GetActorAction = { type: typeof ACTOR_GET; actors: Actor[] };

export type ActorAction =
    | AddActorAction
    | UpdateActorAction
    | RemoveActorAction
    | GetActorAction;

export const addActor = (actor: Actor): AddActorAction => {
    return { type: ACTOR_ADD, actor };
};
export const updateActor = (actor: Actor): UpdateActorAction => {
    return { type: ACTOR_UPDATE, actor };
};
export const removeActor = (id: number): RemoveActorAction => {
    return { type: ACTOR_REMOVE, id };
};
export const getActors = (actors: Actor[]): GetActorAction => {
    return { type: ACTOR_GET, actors };
};
