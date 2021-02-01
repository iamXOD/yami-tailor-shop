import { ActorEntity, Actor } from "../store/models";

export function actorEntityToActor(actor: ActorEntity): Actor {
    const { actor_id, ...actorWithoutID } = actor;
    return { id: actor_id, ...actorWithoutID };
}

export function actorToActorEntity(actor: Actor): ActorEntity {
    const { id, ...actorWithoutID } = actor;
    return { actor_id: id, ...actorWithoutID };
}