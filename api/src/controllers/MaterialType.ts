//Imports
import { getRepository } from "typeorm";

//App Imports
import EntityNotFound from "../errors/EntityNotFound";
import MaterialTypeEntity from "../models/MaterialType";

export async function list(): Promise<MaterialTypeEntity[]> {
    return await getRepository(MaterialTypeEntity).find();
}

export async function get(
    name: string
): Promise<MaterialTypeEntity | undefined> {
    const materialType = await getRepository(MaterialTypeEntity).findOne({
        name,
    });
    if (!materialType) {
        throw new EntityNotFound("MaterialType", `name: ${name}`);
    }
    return materialType;
}
