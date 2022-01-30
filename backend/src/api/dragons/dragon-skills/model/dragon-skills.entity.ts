import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DragonSkills {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    innateSpeedPoints: number;
}
