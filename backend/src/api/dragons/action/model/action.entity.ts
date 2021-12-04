import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DragonActionType } from "./definitions/dragon-action";
import { Dragon } from "../../dragon/model/dragon.entity";

@Entity()
export class Action {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(_ => Dragon, d => d.action)
    dragon: Dragon;

    @Column()
    type: DragonActionType

    @Column()
    startTime: string | number;

    @Column()
    endTime: string | number;

    @Column()
    duration: string| number;
}
