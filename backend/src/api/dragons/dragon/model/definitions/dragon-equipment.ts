import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export interface DragonEquipment {
    runes: ItemDto[];
}

export class DragonEquipmentDto {

    @IsArray()
    @ApiProperty({ type: [ItemDto] })
    runes: ItemDto[];
}
