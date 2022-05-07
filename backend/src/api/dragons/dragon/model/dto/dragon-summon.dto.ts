import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class DragonSummonActionDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    hint: string;

    @ApiProperty()
    cost: number;

    @ApiProperty({ type: [ItemDto] })
    requiredItems: ItemDto[];
}