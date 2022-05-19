import { Dragon } from "src/api/dragons/dragon/model/dragon.entity";
import { User } from "src/api/users/user/model/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EquipmentStatisticsDto } from "./definitions/equipment";
import { ItemRarity } from "./definitions/item-rarity";
import { EquipmentType, FoodType, ItemType } from "./definitions/item-type";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(_ => User, x => x.items)
    user: User;

    @ManyToOne(_ => Dragon, x => x.runes)
    dragon: Dragon;

    @Column()
    uid: string;

    @Column()
    name: string;

    @Column({ default: 1 })
    level: number;

    @Column({ default: ItemRarity.Common })
    rarity: ItemRarity;

    @Column({ default: 1 })
    quantity: number;

    @Column({ default: 0 })
    position: number;
    
    @Column()
    type: ItemType;

    @Column({ nullable: true })
    foodType?: FoodType;

    @Column({ nullable: true })
    equipmentType?: EquipmentType;

    @Column({ type: 'json', default: {} })
    statistics: EquipmentStatisticsDto;
}
