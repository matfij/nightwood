import { MAX_OWNED_DRAGONS } from "src/configuration/user.config";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    nickname: string;

    @Column({ default: 0 })
    ownedDragons: number;

    @Column({ default: MAX_OWNED_DRAGONS })
    maxOwnedDragons: number;

    @BeforeInsert()
    normalizeEmail(): string {
        return this.email.toLowerCase();
    }
}
