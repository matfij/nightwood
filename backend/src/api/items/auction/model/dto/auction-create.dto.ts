import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsNumberString, Max, Min } from "class-validator";
import { AUCTION_MAX_PRICE, AUCTION_MAX_QUANTITY, AUCTION_MAX_TIME, AUCTION_MIN_PRICE, AUCTION_MIN_QUANTITY, AUCTION_MIN_TIME } from "src/configuration/frontend.config";

export class AuctionCreateDto {

    @Expose()
    @IsNumberString()
    @ApiProperty()
    itemId: number;

    @Expose()
    @Type(() => Number)
    @IsNumber()
    @Min(AUCTION_MIN_TIME) @Max(AUCTION_MAX_TIME)
    @ApiProperty()
    duration: number;

    @Expose()
    @Type(() => Number)
    @IsNumber()
    @Min(AUCTION_MIN_PRICE) @Max(AUCTION_MAX_PRICE)
    @ApiProperty()
    unitGoldPrice: number;

    @Expose()
    @Type(() => Number)
    @IsNumber()
    @Min(AUCTION_MIN_QUANTITY) @Max(AUCTION_MAX_QUANTITY)
    @ApiProperty()
    quantity: number;
}
