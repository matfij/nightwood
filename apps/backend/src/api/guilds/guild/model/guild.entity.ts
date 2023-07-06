import { User } from "src/api/users/user/model/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GuildApplication } from "./guild-application.entity";
import { GuildMember } from "./guild-member.entity";
import { GuildRole } from "./guild-role.entity";

@Entity()
export class Guild {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(_ => User, { onDelete: 'SET NULL' })
    @JoinColumn()
    founder: User;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    tag: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(_ => GuildApplication, x => x.guild, { onDelete: 'CASCADE' })
    applications: GuildApplication[];

    @OneToMany(_ => GuildRole, x => x.guild, { onDelete: 'CASCADE' })
    roles: GuildRole[];

    @OneToMany(_ => GuildMember, x => x.guild, { onDelete: 'CASCADE' })
    members: GuildMember[];

    @Column({ default: 0 })
    gold: number;

    @Column({ default: 0 })
    wood: number;

    @Column({ default: 0 })
    stone: number;

    @Column({ default: 0 })
    steel: number;
}
