import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class DragonTamerActionDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    hint: string;

    @ApiProperty()
    costFactor: number;

    @ApiProperty()
    maxCost: number;

    @ApiProperty()
    requiredLevel: number;

    @ApiProperty({ type: [ItemDto] })
    requiredItems: ItemDto[];
}
