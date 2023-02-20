import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Guild {

    @PrimaryGeneratedColumn()
    id: number;
}
