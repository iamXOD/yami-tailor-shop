//Imports
import { IsDateString, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
//App Imports
import ActorEntity from "./Actor";
import MaterialEntity from "./Material";

@Entity()
export default class InvestmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDateString()
    date: Date;

    @ManyToOne(() => ActorEntity, { eager: true })
    supplier: ActorEntity;

    @ManyToOne(() => MaterialEntity, { eager: true })
    material: MaterialEntity;

    @Column()
    @Min(0, { message: "Amount must be greater than 0" })
    amount: number;

    @Column()
    @Min(0, { message: "Total price must be greater than 0" })
    total_price: number;

    @Column({ nullable: true })
    description: string;
}
