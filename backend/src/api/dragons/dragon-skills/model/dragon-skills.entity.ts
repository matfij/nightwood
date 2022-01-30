import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DragonSkills {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    innateSpeed: number;

    @Column({ default: 0 })
    innerFlow: number;

    @Column({ default: 0 })
    luckyStrike: number;

    @Column({ default: 0 })
    greatVigor: number;

    @Column({ default: 0 })
    thoughtfulStrike: number;

    @Column({ default: 0 })
    fireBreath: number;

    @Column({ default: 0 })
    soundBody: number;

    @Column({ default: 0 })
    pugnaciousStrike: number;

    @Column({ default: 0 })
    roughSkin: number;
}
