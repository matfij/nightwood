import { User } from "src/api/users/user/model/user.entity";
import { DEFAULT_LEVEL, DEFAULT_POSITION, DEFAULT_QUANTITY } from "src/configuration/item.config";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EquipmentType, FoodType, ItemType } from "./definitions/item-type";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: DEFAULT_LEVEL })
    level: number;

    @Column({ default: DEFAULT_QUANTITY })
    quantity: number;

    @Column({ default: DEFAULT_POSITION })
    position: number;
    
    @Column()
    type: ItemType;

    @Column({ nullable: true })
    foodType?: FoodType;

    @Column({ nullable: true })
    equipmentType?: EquipmentType;

    @ManyToOne(_ => User, x => x.items)
    user: User;
}
