import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class AuctionDto {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    sellerId: number;

    @ApiProperty()
    endTime: number;

    @ApiProperty()
    totalGoldPrice: number;

    @ApiProperty()
    item: ItemDto;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    active?: boolean;

    @ApiProperty()
    finalized?: boolean;
}
