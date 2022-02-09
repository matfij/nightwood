import { LONG_NUMBER_TYPE } from "src/configuration/app.config";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "../../item/model/item.entity";

@Entity()
export class Auction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sellerId: number;

    @Column({ type: LONG_NUMBER_TYPE })
    endTime: number;

    @Column()
    totalGoldPrice: number;

    @OneToOne(_ => Item)
    @JoinColumn()
    item: Item;

    @Column()
    quantity: number;

    @Column()
    active: boolean;
}
