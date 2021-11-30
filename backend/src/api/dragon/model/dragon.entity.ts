import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DragonNature } from "./definitions/dragon-nature";

@Entity()
export class Dragon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    nature: DragonNature;

    @Column()
    strength: number;

    @Column()
    dexterity: number;

    @Column()
    endurance: number;

    @Column()
    will: number;

    @Column()
    luck: number;
}
