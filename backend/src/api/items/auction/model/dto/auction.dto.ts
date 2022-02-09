import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class AuctionDto {

    @Expose()
    @ApiPropertyOptional()
    id: number;

    @Expose()
    @ApiProperty()
    sellerId: number;

    @Expose()
    @ApiProperty()
    endTime: number;

    @Expose()
    @ApiProperty()
    totalGoldPrice: number;

    @Expose()
    @ApiProperty()
    item: ItemDto;

    @Expose()
    @ApiProperty()
    quantity: number;

    @Expose()
    @ApiProperty()
    active: boolean;
}
