import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsNumberString, Max, Min } from "class-validator";
import { MAX_AUCTION_PRICE, MAX_AUCTION_QUANTITY, MAX_AUCTION_TIME, MIN_AUCTION_PRICE, MIN_AUCTION_QUANTITY, MIN_AUCTION_TIME } from "src/configuration/item.config";

export class AuctionCreateDto {

    @Expose()
    @IsNumberString()
    @ApiProperty()
    itemId: number;

    @Expose()
    @Type(() => Number)
    @IsNumber()
    @Min(MIN_AUCTION_TIME) @Max(MAX_AUCTION_TIME)
    @ApiProperty({ minimum: MIN_AUCTION_TIME, maximum: MAX_AUCTION_TIME })
    duration: number;

    @Expose()
    @Type(() => Number)
    @IsNumber()
    @Min(MIN_AUCTION_PRICE) @Max(MAX_AUCTION_PRICE)
    @ApiProperty({ minimum: MIN_AUCTION_PRICE, maximum: MAX_AUCTION_PRICE })
    unitGoldPrice: number;

    @Expose()
    @Type(() => Number)
    @IsNumber()
    @Min(MIN_AUCTION_QUANTITY) @Max(MAX_AUCTION_QUANTITY)
    @ApiProperty({ minimum: MIN_AUCTION_QUANTITY, maximum: MAX_AUCTION_QUANTITY })
    quantity: number;
}
