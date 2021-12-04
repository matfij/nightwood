import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DragonActionType } from "./definitions/dragon-action";

@Entity()
export class DragonAction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: DragonActionType;

    @Column({ nullable: true })
    startTime?: string;

    @Column({ nullable: true })
    endTime?: string;

    @Column({ nullable: true })
    duration?: string;
}
