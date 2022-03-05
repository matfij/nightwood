import { Item } from "src/api/items/item/model/item.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ default: 500 })
    gold: number;

    @Column({ default: 0 })
    ownedDragons: number;

    @Column({ default: 3 })
    maxOwnedDragons: number;

    @OneToMany(_ => Item, x => x.user)
    items: Item[];

    @BeforeInsert()
    normalizeEmail(): string {
        return this.email.toLowerCase();
    }
}
