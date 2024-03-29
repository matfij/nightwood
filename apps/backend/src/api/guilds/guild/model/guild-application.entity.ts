import { User } from "src/api/users/user/model/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Guild } from "./guild.entity";

@Entity()
export class GuildApplication {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(_ => Guild, x => x.applications, { onDelete: 'CASCADE' })
    guild: Guild;

    @ManyToOne(_ => User)
    @JoinColumn()
    user: User;

    @Column({ nullable: true })
    message: string;
}
