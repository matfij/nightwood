import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ unique: true })
    nickname: string;

    @BeforeInsert()
    normalizeEmail(): string {
        return this.email.toLowerCase();
    }
}
