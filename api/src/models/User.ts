//Imports
import bcrypt from "bcrypt";
import {
    IsNotEmpty,
    Length,
    Matches,
    ValidationArguments,
} from "class-validator";
import { Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//App Imports
import config from "../config";

@Entity()
export default class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: "Username is required" })
    @Length(3, 30, {
        message: ({ value }: ValidationArguments) =>
            value?.length < 3
                ? "Username must be at least 3 characters long"
                : "Username must be under 30 characters",
    })
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: "Username must only contain letters and numbers",
    })
    username: string;

    @Length(8, 60, {
        message: ({ value }: ValidationArguments) =>
            value?.length < 8
                ? "Password must be at least 8 characters long"
                : "Password must be under 60 characters",
    })
    @IsNotEmpty({ message: "Password is required" })
    password: string;

    @Column()
    @Exclude()
    salted_password: string;

    @Column({ default: false })
    admin: false;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.salted_password = await bcrypt.hash(
            this.password,
            config.saltRounds
        );
    }

    @BeforeInsert()
    lowercaseName(): void {
        this.username = this.username.toLowerCase();
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.salted_password);
    }
}
