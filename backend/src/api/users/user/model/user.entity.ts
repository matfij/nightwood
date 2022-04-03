import { Item } from "src/api/items/item/model/item.entity";
import { DB_MONEY_TYPE, DB_TIMESTAMP_TYPE } from "src/configuration/app.config";
import { AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: DB_MONEY_TYPE, default: 500 })
    gold: number;

    @Column({ default: 0 })
    ownedDragons: number;

    @Column({ default: 3 })
    maxOwnedDragons: number;

    @OneToMany(_ => Item, x => x.user)
    items: Item[];

    @Column({ default: false })
    isConfirmed: boolean;

    @Column({ nullable: true })
    actionToken: string;

    @Column({ default: 0, type: DB_TIMESTAMP_TYPE })
    actionTokenValidity: number;

    @AfterLoad() 
    convertGold() {
        this.gold = Math.floor(parseFloat(this.gold as any));
    }
}
