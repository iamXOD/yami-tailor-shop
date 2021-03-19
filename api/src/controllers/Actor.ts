//Import
import { plainToClass } from "class-transformer";
import { Equal, getRepository, Not } from "typeorm";
//App Imports
import { validateAndThrowError } from "../errors/AggregateError";
import EntityNotFound from "../errors/EntityNotFound";
import ExistingEntity from "../errors/ExistingEntity";
import ActorEntity from "../models/Actor";

export async function list(): Promise<ActorEntity[]> {
    return await getRepository(ActorEntity).find();
}

export async function get(id: number): Promise<ActorEntity | undefined> {
    const actor = await getRepository(ActorEntity).findOne(id);
    if (!actor) {
        throw new EntityNotFound("Actor", `id: ${id}`);
    }
    return actor;
}

export async function add(actor: ActorEntity): Promise<ActorEntity> {
    const correctActor = plainToClass(ActorEntity, actor);

    await validateAndThrowError(correctActor);

    const actorRepo = getRepository(ActorEntity);
    if (await actorRepo.findOne({ name: correctActor.name })) {
        throw new ExistingEntity("Actor", `name: ${correctActor.name}`);
    }
    if (await actorRepo.findOne({ mobile_phone: correctActor.mobile_phone })) {
        throw new ExistingEntity(
            "Actor",
            `mobile: ${correctActor.mobile_phone}`
        );
    }
    return actorRepo.save(correctActor);
}

export async function edit(actor: ActorEntity): Promise<ActorEntity> {
    const correctActor = plainToClass(ActorEntity, actor);

    await validateAndThrowError(correctActor, { skipMissingProperties: true });

    const actorRepo = getRepository(ActorEntity);
    if (!(await actorRepo.findOne({ id: correctActor.id }))) {
        throw new EntityNotFound("Actor", `id: ${correctActor.id}`);
    }
    if (
        await actorRepo.findOne({
            id: Not(Equal(correctActor.id)),
            name: correctActor.name,
        })
    ) {
        throw new ExistingEntity("Actor", `name: ${correctActor.name}`);
    }
    if (
        await actorRepo.findOne({
            id: Not(Equal(correctActor.id)),
            mobile_phone: correctActor.mobile_phone,
        })
    ) {
        throw new ExistingEntity(
            "Actor",
            `mobile: ${correctActor.mobile_phone}`
        );
    }
    return await actorRepo.save(correctActor);
}

export async function remove(id: number): Promise<void> {
    const actorRepo = getRepository(ActorEntity);
    const actor = await actorRepo.findOne(id);
    actor && (await actorRepo.remove(actor));
}

export default { list, get, add, edit, remove };
