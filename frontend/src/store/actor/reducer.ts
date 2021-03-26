//App Imports
import { ActorState } from "../../types";
import {
    ActorAction,
    ACTOR_ADD,
    ACTOR_GET,
    ACTOR_REMOVE,
    ACTOR_UPDATE,
} from "./actions";

const initialActorState = { actors: [] };

export default function actorReducers(
    state: ActorState = initialActorState,
    action: ActorAction
): ActorState {
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
}
