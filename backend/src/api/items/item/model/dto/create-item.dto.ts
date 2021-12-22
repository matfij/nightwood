import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { EquipmentType, FoodType, ItemType } from "../definitions/item-type";

export class CreateItemDto {

    @IsString()
    @ApiProperty()
    name: string;

    @IsNumber()
    @ApiPropertyOptional()
    level?: number;

    @IsNumber()
    @ApiPropertyOptional()
    quantity?: number;

    @ApiProperty({ enum: ItemType, enumName: 'ItemType' })
    type: ItemType;

    @ApiPropertyOptional({ enum: FoodType, enumName: 'FoodType' })
    foodType?: FoodType;

    @ApiPropertyOptional({enum: EquipmentType, enumName: 'EquipmentType' })
    equipmentType?: EquipmentType;
}
