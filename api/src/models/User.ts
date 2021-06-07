//Imports
import bcrypt from "bcrypt";
import {
    IsAlphanumeric,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm";
//App Imports
import config from "../config";
import { addGroup, defaultsToFalse, loginGroup } from "./constants";
import { EntityHasUniqueProps, EntityWithPropsExists } from "./decorators";

const usernameValue = (v: string) => ({ username: v.toLowerCase() });

@Entity()
export class UserEntity {
    @PrimaryColumn()
    @EntityWithPropsExists(
        { Entity: UserEntity, criteriaFn: usernameValue },
        loginGroup
    )
    @EntityHasUniqueProps(
        { Entity: UserEntity, criteriaFn: usernameValue },
        addGroup
    )
    @IsAlphanumeric()
    @MaxLength(30)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    username: string;

    @MaxLength(60)
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    password: string;

    @Column({ select: false })
    salted_password: string;

    @Column(defaultsToFalse)
    @IsBoolean()
    @IsOptional()
    admin: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.salted_password = await bcrypt.hash(
            this.password,
            config.saltRounds
        );
    }

    @BeforeInsert()
    @BeforeUpdate()
    lowercaseName(): void {
        this.username = this.username.toLowerCase();
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.salted_password);
    }
}

export default UserEntity;
