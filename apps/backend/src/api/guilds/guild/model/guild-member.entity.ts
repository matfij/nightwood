import { User } from "src/api/users/user/model/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GuildRole } from "./guild-role.entity";
import { Guild } from "./guild.entity";

@Entity()
export class GuildMember {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(_ => Guild, x => x.members, { onDelete: 'CASCADE' })
    guild: Guild;

    @OneToOne(_ => User)
    @JoinColumn()
    user: User;

    @ManyToOne(_ => GuildRole, { nullable: true })
    @JoinColumn()
    role: GuildRole;
}
