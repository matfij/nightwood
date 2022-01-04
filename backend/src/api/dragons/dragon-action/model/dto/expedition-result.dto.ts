import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class ExpeditionResultDto {

    @ApiProperty()
    name: string;

    @ApiProperty({ type: [ItemDto] })
    loots: ItemDto[];
}
