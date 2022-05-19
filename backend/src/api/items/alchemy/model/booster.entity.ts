import { DB_TIMESTAMP_TYPE } from "src/configuration/app.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booster {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: DB_TIMESTAMP_TYPE })
    activeTo: number;

    @Column({ default: true })
    active: boolean;
}
