//Imports
import { getRepository, MigrationInterface } from "typeorm";

//App Imports
import ActorEntity from "../models/Actor";
import MaterialEntity from "../models/Material";
import MaterialTypeEntity from "../models/MaterialType";
import { actorSeed } from "../seeds/actor";
import { materialSeed } from "../seeds/material";
import { materialTypesSeed } from "../seeds/materialTypes";

export class Seeds1616270994318 implements MigrationInterface {
    public async up(): Promise<void> {
        getRepository(MaterialTypeEntity).save(materialTypesSeed);
        getRepository(MaterialEntity).save(materialSeed);
        getRepository(ActorEntity).save(actorSeed);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async down(): Promise<void> {}
}
