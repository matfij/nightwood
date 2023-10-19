import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievements {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    expeditionTime: number;

    @Column({ default: 0 })
    dragonOwner: number;

    @Column({ default: 0 })
    persistentBreeder: number;

    @Column({ default: 0 })
    curiousExplorer: number;

    @Column({ default: 0 })
    dragonTrainer: number;

    @Column({ default: 0 })
    croesus: number;

    @Column({ default: 0 })
    champion: number;
}
