import { User } from "src/api/users/user/model/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Guild } from "./guild.entity";

@Entity()
export class GuildApplicaton {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(_ => Guild, x => x.applications)
    guild: Guild;

    @OneToOne(_ => User)
    @JoinColumn()
    user: User;

    @Column({ nullable: true })
    message: string;
}
