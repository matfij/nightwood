import { DEFAULT_ATTRIBUTE_POINTS, DEFAULT_LEVEL } from "src/configuration/dragon.config";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DragonAction, DragonActionType } from "./definitions/dragon-action";
import { DragonNature } from "./definitions/dragon-nature";

@Entity()
export class Dragon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    ownerId?: number;

    @OneToOne(_ => DragonAction)
    action: DragonAction;

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
