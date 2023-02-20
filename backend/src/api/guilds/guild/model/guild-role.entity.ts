import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Guild } from "./guild.entity";

@Entity()
export class GuildRole {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(_ => Guild, x => x.roles)
    guild: Guild;

    @Column()
    name: string;

    @Column()
    priority: number;

    @Column({ default: false })
    canAddMembers: boolean;

    @Column({ default: false })
    canRemoveMembers: boolean;

    @Column({ default: false })
    canConstruct: boolean;
}
