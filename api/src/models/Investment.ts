//Imports
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
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
import { addGroup, editGroup, nullable } from "./constants";
import {
    EntityHasUniqueProps,
    EntityWithPropsExists,
    idValue,
    IsOnlyDateString,
} from "./decorators";
import MaterialEntity from "./Material";

@Entity()
export class InvestmentEntity {
    @PrimaryGeneratedColumn()
    @EntityHasUniqueProps({ Entity: InvestmentEntity }, addGroup)
    @EntityWithPropsExists({ Entity: InvestmentEntity }, editGroup)
    @Min(1)
    @IsNumber({}, { message: "id must be number" })
    @IsNotEmpty(editGroup)
    @IsOptional(addGroup)
    id: number;

    @Column()
    @IsOnlyDateString()
    @IsDateString()
    @IsString()
    @IsOptional()
    date?: string;

    @Column()
    @EntityWithPropsExists({ Entity: ActorEntity, criteriaFn: idValue })
    @Min(1)
    @IsNumber({}, { message: "supplierId must be number" })
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    supplierId: number;

    @ManyToOne(() => ActorEntity, { onDelete: "SET NULL" })
    supplier: ActorEntity;

    @Column()
    @EntityWithPropsExists({ Entity: MaterialEntity, criteriaFn: idValue })
    @Min(1)
    @IsNumber({}, { message: "materialId must be number" })
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    materialId: number;

    @ManyToOne(() => MaterialEntity, { onDelete: "SET NULL" })
    material: MaterialEntity;

    @Column()
    @Min(0)
    @IsNumber({}, { message: "amount must be number" })
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    amount: number;

    @Column()
    @Min(0)
    @IsNumber({}, { message: "total_price must be number" })
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    total_price: number;

    @Column(nullable)
    @IsString()
    @IsOptional()
    description: string;

    @BeforeInsert()
    @BeforeUpdate()
    insertDate(): void {
        this.date = this.date || new Date().toISOString().split("T")[0];
    }
}

export default InvestmentEntity;
