//Imports
import { Exclude } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
//App Imports
import { addGroup, editGroup, nullable } from "./constants";
import {
    EntityHasUniqueProps,
    EntityWithPropsExists,
    idValue,
} from "./decorators";
import MaterialTypeEntity from "./MaterialType";

@Entity()
export default class MaterialEntity {
    @PrimaryGeneratedColumn()
    @EntityHasUniqueProps({ Entity: MaterialEntity }, addGroup)
    @EntityWithPropsExists({ Entity: MaterialEntity }, editGroup)
    @Min(1)
    @IsNumber({}, { message: "id must be number" })
    @IsNotEmpty(editGroup)
    @IsOptional(addGroup)
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    color: string;

    @Column(nullable)
    @IsString()
    @IsOptional()
    description: string;

    @Column(nullable)
    @EntityWithPropsExists({ Entity: MaterialTypeEntity, criteriaFn: idValue })
    @Min(1)
    @IsNumber({}, { message: "typeId must be number" })
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    typeId: number;

    @ManyToOne(() => MaterialTypeEntity, (type) => type.material, {
        onDelete: "SET NULL",
    })
    @Exclude()
    type: MaterialTypeEntity;
}
