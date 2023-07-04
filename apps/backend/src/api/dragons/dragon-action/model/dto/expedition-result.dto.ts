import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class ExpeditionReportDto {

    @ApiProperty()
    dragonName: string;

    @ApiProperty()
    expeditionName: string;

    @ApiProperty()
    gainedGold: number;

    @ApiProperty({ type: [ItemDto] })
    loots: ItemDto[];
}
