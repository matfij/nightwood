import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DragonActionType } from "./definitions/dragon-action";

@Entity()
export class DragonAction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: DragonActionType;

    @Column({ nullable: true })
    nextAction?: number;
}
