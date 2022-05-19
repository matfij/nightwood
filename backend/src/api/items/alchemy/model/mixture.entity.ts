import { DB_TIMESTAMP_TYPE } from "src/configuration/app.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mixture {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: string;

    @Column({ type: DB_TIMESTAMP_TYPE })
    readyOn: number;

    @Column({ default: false })
    collected: boolean;
}
