import { DEFAULT_ATTRIBUTE_POINTS, DEFAULT_LEVEL } from "src/configuration/dragon.config";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DragonAction } from "../../dragon-action/model/dragon-action.entity";
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

    @Column({ default: 0, type: 'int8' })
    nextFeed: number;

    @Column()
    nature: DragonNature;

    @Column({ default: DEFAULT_LEVEL})
    level: number;

    @Column({ default: DEFAULT_ATTRIBUTE_POINTS})
    strength: number;

    @Column({ default: DEFAULT_ATTRIBUTE_POINTS})
    dexterity: number;

    @Column({ default: DEFAULT_ATTRIBUTE_POINTS})
    endurance: number;

    @Column({ default: DEFAULT_ATTRIBUTE_POINTS})
    will: number;

    @Column({ default: DEFAULT_ATTRIBUTE_POINTS})
    luck: number;
}
