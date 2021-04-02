//Imports
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//App Imports
import { addGroup, editGroup } from "./constants";
import { EntityHasUniqueProps, EntityWithPropsExists } from "./decorators";
import MaterialEntity from "./Material";

@Entity()
export default class MaterialTypeEntity {
    @PrimaryGeneratedColumn()
    @EntityHasUniqueProps({ Entity: MaterialTypeEntity }, addGroup)
    @EntityWithPropsExists({ Entity: MaterialTypeEntity }, editGroup)
    @Min(1)
    @IsNumber({}, { message: "id must be number" })
    @IsNotEmpty(editGroup)
    @IsOptional(addGroup)
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    unit: string;

    @OneToMany(() => MaterialEntity, (material) => material.type, {
        cascade: true,
    })
    material: MaterialEntity;
}
