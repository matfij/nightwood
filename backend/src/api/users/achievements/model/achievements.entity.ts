import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievements {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    expeditionTime: number;

    @Column({ default: false })
    dragonOwnerI: boolean;

    @Column({ default: false })
    dragonOwnerII: boolean;

    @Column({ default: false })
    dragonOwnerIII: boolean;

    @Column({ default: false })
    persistentBreederI: boolean;

    @Column({ default: false })
    persistentBreederII: boolean;

    @Column({ default: false })
    persistentBreederIII: boolean;

    @Column({ default: false })
    curiousExplorerI: boolean;

    @Column({ default: false })
    curiousExplorerII: boolean;

    @Column({ default: false })
    curiousExplorerIII: boolean;

    @Column({ default: false })
    dragonTrainerI: boolean;

    @Column({ default: false })
    dragonTrainerII: boolean;

    @Column({ default: false })
    dragonTrainerIII: boolean;

    @Column({ default: false })
    croesusI: boolean;

    @Column({ default: false })
    croesusII: boolean;

    @Column({ default: false })
    croesusIII: boolean;
}
