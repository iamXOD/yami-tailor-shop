//Imports
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    Length,
    Matches,
} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//Types
import { ValidationArguments } from "class-validator";

@Entity()
export default class ActorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 50, {
        message: ({ value }: ValidationArguments) =>
            value.length < 4
                ? "Name must be at least 4 characters long"
                : "Name's length must be under 50 characters",
    })
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @Column()
    @IsPhoneNumber("CU", { message: "Invalid mobile phone number" })
    @IsNotEmpty({ message: "Mobile phone is required" })
    mobile_phone: string;

    @Column({ nullable: true })
    @IsPhoneNumber("CU", { message: "Invalid home phone number" })
    home_phone?: string;

    @Column({ nullable: true })
    @IsEmail(undefined, { message: "Invalid Email" })
    email?: string;

    @Column({ default: "F" })
    @Matches(/^[FfMm]$/, { message: "Gender must be 'F' or 'M'" })
    gender: "F" | "M";
}
