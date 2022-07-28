import { Dragon } from "src/api/dragons/dragon/model/dragon.entity";
import { Mixture } from "src/api/items/alchemy/model/mixture.entity";
import { Item } from "src/api/items/item/model/item.entity";
import { DB_MONEY_TYPE, DB_TIMESTAMP_TYPE } from "src/configuration/app.config";
import { AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(_ => Dragon, x => x.user)
    dragons: Dragon[];

    @OneToMany(_ => Item, x => x.user)
    items: Item[];

    @OneToMany(_ => Mixture, x => x.user)
    mixtures: Mixture[];

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
