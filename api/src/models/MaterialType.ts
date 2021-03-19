import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import MaterialEntity from "./Material";

@Entity()
export default class MaterialTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    unit: string;

    @OneToMany(() => MaterialEntity, (material) => material.type)
    material: MaterialEntity;
}
