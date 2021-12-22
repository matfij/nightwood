import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { EquipmentType, FoodType, ItemType } from "../definitions/item-type";

export class ItemDto {

    @Expose()
    @ApiPropertyOptional()
    id?: number;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    level: number;

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

    @Expose()
    @Transform(({obj}) => { obj.user.id })
    @ApiPropertyOptional()
    userId?: number;
}
