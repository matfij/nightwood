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

    @Column({ default: 0 })
    beginnersLuck: number;

    @Column({ default: 0 })
    magicArrow: number;

    @Column({ default: 0 })
    block: number;

    @Column({ default: 0 })
    armorPenetration: number;

    @Column({ default: 0 })
    rage: number;

    @Column({ default: 0 })
    fireBolt: number;

    @Column({ default: 0 })
    iceBolt: number;

    @Column({ default: 0 })
    airVector: number;

    @Column({ default: 0 })
    rockBlast: number;

    @Column({ default: 0 })
    staticStrike: number;

    @Column({ default: 0 })
    thunderbolt: number;

    @Column({ default: 0 })
    leafCut: number;

    @Column({ default: 0 })
    criticalDrain: number;

    @Column({ default: 0 })
    poison: number;

    @Column({ default: 0 })
    lifeLink: number;

    @Column({ default: 0 })
    dodge: number;

    @Column({ default: 0 })
    treasureHunter: number;

    @Column({ default: 0 })
    lethalBlow: number;

    @Column({ default: 0 })
    inferialBlessing: number;

    @Column({ default: 0 })
    freeze: number;

    @Column({ default: 0 })
    zeal: number;

    @Column({ default: 0 })
    deepWounds: number;

    @Column({ default: 0 })
    superCharge: number;

    @Column({ default: 0 })
    enchantedBarrier: number;

    @Column({ default: 0 })
    terribleOmen: number;
}
