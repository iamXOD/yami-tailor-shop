//Imports
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    Min,
    MinLength,
} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
//App Imports
import { addGroup, editGroup, nullable } from "./constants";
import {
    EntityHasUniqueProps,
    EntityWithPropsExists,
    uniqueProp,
} from "./decorators";

@Entity()
export class ActorEntity {
    @PrimaryGeneratedColumn()
    @EntityWithPropsExists({ Entity: ActorEntity }, editGroup)
    @EntityHasUniqueProps({ Entity: ActorEntity }, addGroup)
    @Min(1)
    @IsNumber({}, { message: "id must be number" })
    @IsNotEmpty(editGroup)
    @IsOptional(addGroup)
    id: number;

    @Column()
    @MinLength(3)
    @MaxLength(50)
    @IsString()
    @EntityHasUniqueProps({ Entity: ActorEntity }, addGroup)
    @EntityHasUniqueProps(
        {
            Entity: ActorEntity,
            criteriaFn: uniqueProp("name"),
        },
        editGroup
    )
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    name: string;

    @Column()
    @EntityHasUniqueProps({ Entity: ActorEntity }, addGroup)
    @EntityHasUniqueProps(
        {
            Entity: ActorEntity,
            criteriaFn: uniqueProp("mobile_phone"),
        },
        editGroup
    )
    @IsString()
    @IsPhoneNumber("CU")
    @IsNotEmpty(addGroup)
    @IsOptional(editGroup)
    mobile_phone: string;

    @Column(nullable)
    @IsPhoneNumber("CU")
    @IsString()
    @IsOptional()
    home_phone?: string;

    @Column(nullable)
    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;

    @Column({ default: "F" })
    @Matches(/^[FfMm]$/, { message: "gender must be 'F' or 'M'" })
    @IsOptional()
    gender: "F" | "M";
}

export default ActorEntity;
