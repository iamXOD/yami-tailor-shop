import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import MaterialTypeEntity from "./MaterialType";

@Entity()
export default class MaterialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: "Color is required" })
    color: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => MaterialTypeEntity, (type) => type.material, {
        eager: true,
    })
    type: MaterialTypeEntity;
}
