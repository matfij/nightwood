import { User } from "src/api/users/user/model/user.entity";
import { DEFAULT_LEVEL } from "src/configuration/item.config";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EquipmentType, FoodType, ItemType } from "./definitions/item-type";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    type: ItemType;

    @Column({ default: DEFAULT_LEVEL })
    level: number;

    @Column({ nullable: true })
    foodType?: FoodType;

    @Column({ nullable: true })
    equipmentType?: EquipmentType;

    @ManyToMany(type => User, user => user.items)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
