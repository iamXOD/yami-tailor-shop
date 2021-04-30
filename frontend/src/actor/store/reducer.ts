//App Imports
import {
    ActorAction,
    ACTOR_ADD,
    ACTOR_GET,
    ACTOR_REMOVE,
    ACTOR_UPDATE,
} from "./actions";

export interface Actor {
    id?: number;
    name: string;
    mobile_phone: string;
    home_phone?: string;
    gender: "F" | "M";
    email?: string;
}

export interface ActorState {
    actors: Actor[];
}
const initialActorState: ActorState = { actors: [] };

export const actorReducer = (
    state: ActorState = initialActorState,
    action: ActorAction
): ActorState => {
    switch (action.type) {
        case ACTOR_ADD:
            return { ...state, actors: [...state.actors, action.actor] };
        case ACTOR_UPDATE: {
            const updatedActorIndex = state.actors.findIndex(
                (value) => value.id === action.actor.id
            );
            const newActors = [...state.actors];
            newActors[updatedActorIndex] = action.actor;
            return { ...state, actors: newActors };
        }
        case ACTOR_REMOVE: {
            const removedActorIndex = state.actors.findIndex(
                (value) => value.id === action.id
            );
            return {
                ...state,
                actors: [
                    ...state.actors.slice(0, removedActorIndex),
                    ...state.actors.slice(removedActorIndex + 1),
                ],
            };
        }
        case ACTOR_GET:
            return { ...state, actors: action.actors };
        default:
            return state;
    }
};
