//Imports
import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { validateAndThrowError } from "../errors/AggregateError";
import EntityNotFound from "../errors/EntityNotFound";
import ActorEntity from "../models/Actor";
import FixEntity from "../models/Fix";

export async function list(): Promise<FixEntity[]> {
    return await getRepository(FixEntity).find();
}

export async function get(id: number): Promise<FixEntity> {
    const fix = await getRepository(FixEntity).findOne(id);
    if (!fix) {
        throw new EntityNotFound("Fix", `id: ${id}`);
    }
    return fix;
}

export async function add(fix: FixEntity): Promise<FixEntity> {
    const correctFix = plainToClass(FixEntity, fix);

    await validateAndThrowError(correctFix);

    if (!(await getRepository(ActorEntity).findOne(fix.costumer))) {
        throw new EntityNotFound("Costumer", `id: ${correctFix.costumer}`);
    }
    return await getRepository(FixEntity).save(correctFix);
}

export async function edit(fix: FixEntity): Promise<FixEntity> {
    const correctFix = plainToClass(FixEntity, fix);
    await validateAndThrowError(correctFix, { skipMissingProperties: true });

    const fixRepo = getRepository(FixEntity);
    if (!(await fixRepo.findOne(correctFix.id))) {
        throw new EntityNotFound("Fix", `id: ${correctFix.id}`);
    }
    if (!(await getRepository(ActorEntity).findOne(fix.costumer))) {
        throw new EntityNotFound("Costumer", `id: ${correctFix.costumer}`);
    }
    return await getRepository(FixEntity).save(correctFix);
}

export async function remove(id: number): Promise<void> {
    const fixRepo = getRepository(FixEntity);
    const fix = await fixRepo.findOne(id);
    fix && (await fixRepo.remove(fix));
}

export default {
    list,
    add,
    get,
    edit,
    remove,
};
