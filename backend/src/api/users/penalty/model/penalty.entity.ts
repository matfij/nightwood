import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { PenaltyType } from "./definitions/penalties";

// log-type table, no relations, could be moved to a cold db
@Entity()
export class Penalty {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imposingUserId: number;

    @Column()
    punishedUserId: number;

    @Column()
    type: PenaltyType;
    
    @Column()
    duration: number;

    @Column()
    message: string;

    @Column()
    comment: string;
}
