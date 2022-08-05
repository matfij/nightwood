import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievements {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    test: boolean;
}
