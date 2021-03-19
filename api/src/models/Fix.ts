//Imports
import { IsDateString, Max, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

//App Imports
import ActorEntity from "./Actor";

@Entity()
export default class FixEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDateString()
    date: Date;

    @Column()
    @Min(0, { message: "Price must be greater than 0" })
    price: number;

    @Column()
    @Min(0, { message: "Payed must be greater than 0" })
    payed: number;

    @Column({ nullable: true })
    type: string;

    @Column({ default: 0 })
    @Min(0, { message: "Status must be greater than 0" })
    @Max(1, { message: "Status must be lower than 1" })
    status: number;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => ActorEntity, { eager: true })
    costumer: ActorEntity;
}
