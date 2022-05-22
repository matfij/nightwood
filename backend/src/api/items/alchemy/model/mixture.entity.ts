import { User } from "src/api/users/user/model/user.entity";
import { DB_TIMESTAMP_TYPE } from "src/configuration/app.config";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mixture {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(_ => User, x => x.mixtures)
    user: User;

    @Column()
    uid: string;

    @Column({ type: DB_TIMESTAMP_TYPE })
    startedOn: number;

    @Column({ type: DB_TIMESTAMP_TYPE })
    readyOn: number;

    @Column({ default: false })
    collected: boolean;
}
