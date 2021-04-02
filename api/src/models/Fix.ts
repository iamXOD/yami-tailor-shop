//Imports
import { Exclude } from "class-transformer";
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from "class-validator";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
//App Imports
import ActorEntity from "./Actor";
import { addGroup, defaultsToZero, editGroup, nullable } from "./constants";
import {
    EntityHasUniqueProps,
    EntityWithPropsExists,
    idValue,
    IsOnlyDateString,
} from "./decorators";

@Entity()
export default class FixEntity {
    @PrimaryGeneratedColumn()
    @EntityHasUniqueProps({ Entity: FixEntity }, addGroup)
    @EntityWithPropsExists({ Entity: FixEntity }, editGroup)
    @Min(1)
    @IsNumber({}, { message: "id must be number" })
    @IsNotEmpty(editGroup)
    @IsOptional(addGroup)
    id: number;

    @Column()
    @Min(0)
    @IsNumber({}, { message: "price must be number" })
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    price: number;

    @Column(defaultsToZero)
    @Min(0)
    @IsNumber({}, { message: "payed must be number" })
    @IsOptional()
    payed?: number;

    @Column(defaultsToZero)
    @Max(1)
    @Min(0)
    @IsNumber({}, { message: "status must be number" })
    @IsOptional()
    status?: number;

    @Column(nullable)
    @IsString({ message: "type must be string" })
    @IsOptional()
    type?: string;

    @Column(nullable)
    @IsString()
    @IsOptional()
    description?: string;

    @Column(nullable)
    @EntityWithPropsExists({
        Entity: ActorEntity,
        criteriaFn: idValue,
    })
    @Min(1)
    @IsNumber({}, { message: "costumerId must be a number" })
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    costumerId: number;

    @ManyToOne(() => ActorEntity, { onDelete: "SET NULL" })
    @Exclude()
    costumer: ActorEntity;

    @Column()
    @IsOnlyDateString()
    @IsDateString()
    @IsString()
    @IsOptional()
    date?: string;

    @BeforeInsert()
    @BeforeUpdate()
    fillMissingDate(): void {
        this.date = this.date || new Date().toISOString().split("T")[0];
    }
}
