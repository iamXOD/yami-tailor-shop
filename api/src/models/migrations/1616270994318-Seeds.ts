//Imports
import { getRepository, MigrationInterface } from "typeorm";
//App Imports
import MaterialTypeEntity from "../MaterialType";
import { materialTypesSeed } from "./seeds/materialTypes";

export class Seeds1616270994318 implements MigrationInterface {
    public async up(): Promise<void> {
        getRepository(MaterialTypeEntity).save(materialTypesSeed);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async down(): Promise<void> {}
}
