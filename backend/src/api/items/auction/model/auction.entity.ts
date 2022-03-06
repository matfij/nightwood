import { DB_MONEY_TYPE, DB_TIMESTAMP_TYPE } from "src/configuration/app.config";
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "../../item/model/item.entity";

@Entity()
export class Auction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sellerId: number;

    @Column({ type: DB_TIMESTAMP_TYPE })
    endTime: number;

    @Column({ type: DB_MONEY_TYPE, default: 1000 })
    totalGoldPrice: number;

    @ManyToOne(_ => Item)
    @JoinColumn()
    item: Item;

    @Column()
    quantity: number;

    @Column()
    active: boolean;

    @Column({ default: false })
    finalized: boolean;

    @AfterLoad() 
    convertPrice() {
        this.totalGoldPrice = Math.floor(parseFloat(this.totalGoldPrice as any));
    }
}
