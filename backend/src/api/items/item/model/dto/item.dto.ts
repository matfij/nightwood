import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ItemRarity } from "../definitions/item-rarity";
import { EquipmentType, FoodType, ItemType } from "../definitions/item-type";

export class ItemDto {

    @Expose()
    @ApiPropertyOptional()
    id?: number;

    @Expose()
    @Transform(({obj}) => { obj.user.id })
    @ApiPropertyOptional()
    userId?: number;

    @Expose()
    @ApiPropertyOptional()
    dragonId?: number;

    @Expose()
    @ApiProperty()
    uid: string;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    level: number;

    @Expose()
    @ApiProperty({ enum: ItemRarity, enumName: 'ItemRarity' })
    rarity?: ItemRarity;

    @Expose()
    @ApiPropertyOptional()
    quantity?: number;

    @Expose()
    @ApiPropertyOptional()
    position?: number;

    @Expose()
    @ApiProperty({ enum: ItemType, enumName: 'ItemType' })
    type: ItemType;

    @Expose()
    @ApiPropertyOptional({ enum: FoodType, enumName: 'FoodType' })
    foodType?: FoodType;

    @Expose()
    @ApiPropertyOptional({enum: EquipmentType, enumName: 'EquipmentType' })
    equipmentType?: EquipmentType;
}
