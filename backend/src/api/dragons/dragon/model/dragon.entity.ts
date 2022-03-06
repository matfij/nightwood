import { DB_TIMESTAMP_TYPE } from "src/configuration/app.config";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DragonAction } from "../../dragon-action/model/dragon-action.entity";
import { DragonSkills } from "../../dragon-skills/model/dragon-skills.entity";
import { DragonNature } from "./definitions/dragon-nature";

@Entity()
export class Dragon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    ownerId?: number;

    @OneToOne(_ => DragonAction)
    @JoinColumn()
    action: DragonAction;

    @OneToOne(_ => DragonSkills)
    @JoinColumn()
    skills: DragonSkills;

    @Column({ default: 0 })
    skillPoints: number;

    @Column({ default: 0, type: DB_TIMESTAMP_TYPE })
    nextFeed: number;

    @Column()
    nature: DragonNature;

    @Column({ default: 50 })
    stamina: number;

    @Column({ default: 0 })
    experience: number;

    @Column({ default: 1})
    level: number;

    @Column({ default: 1})
    strength: number;

    @Column({ default: 1})
    dexterity: number;

    @Column({ default: 1})
    endurance: number;

    @Column({ default: 1})
    will: number;

    @Column({ default: 1})
    luck: number;
}
