//Imports
import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
//App Imports
import { validateAndThrowError } from "../errors/AggregateError";
import EntityNotFound from "../errors/EntityNotFound";
import ExistingEntity from "../errors/ExistingEntity";
import MaterialEntity from "../models/Material";

export async function list(): Promise<MaterialEntity[]> {
    return await getRepository(MaterialEntity).find();
}

export async function get(id: number): Promise<MaterialEntity> {
    const material = await getRepository(MaterialEntity).findOne(id);
    if (!material) {
        throw new EntityNotFound("Material", `id: ${id}`);
    }
    return material;
}

export async function add(material: MaterialEntity): Promise<MaterialEntity> {
    const correctMaterial = plainToClass(MaterialEntity, material);

    await validateAndThrowError(correctMaterial);

    const materialRepo = getRepository(MaterialEntity);
    if (
        await materialRepo.findOne({
            color: correctMaterial.color,
            type: correctMaterial.type,
        })
    ) {
        throw new ExistingEntity(
            "Material",
            `color: ${correctMaterial.color} and type ${correctMaterial.type}`
        );
    }
    return materialRepo.save(correctMaterial);
}

export async function edit(material: MaterialEntity): Promise<MaterialEntity> {
    const correctMaterial = plainToClass(MaterialEntity, material);

    await validateAndThrowError(correctMaterial, {
        skipMissingProperties: true,
    });

    const materialRepo = getRepository(MaterialEntity);
    if (!(await materialRepo.findOne(correctMaterial.id))) {
        throw new EntityNotFound("Material", `id: ${correctMaterial.id}`);
    }
    if (
        await materialRepo.findOne({
            color: correctMaterial.color,
            type: correctMaterial.type,
        })
    ) {
        throw new ExistingEntity(
            "Material",
            `color: ${correctMaterial.color} and type ${correctMaterial.type}`
        );
    }
    return materialRepo.save(correctMaterial);
}

export async function remove(id: number): Promise<void> {
    const materialRepo = getRepository(MaterialEntity);
    const material = await materialRepo.findOne(id);
    material && (await materialRepo.remove(material));
}

export default {
    list,
    get,
    add,
    edit,
    remove,
};
