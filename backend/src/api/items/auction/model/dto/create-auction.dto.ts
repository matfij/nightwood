import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";
import { MAX_AUCTION_PRICE, MAX_AUCTION_TIME, MIN_AUCTION_PRICE, MIN_AUCTION_TIME } from "src/configuration/item.config";

export class CreateAuctionDto {

    @Expose()
    @IsNumber()
    @ApiProperty({ minimum: MIN_AUCTION_TIME, maximum: MAX_AUCTION_TIME })
    duration: number;

    @Expose()
    @IsNumber()
    @ApiProperty({ minimum: MIN_AUCTION_PRICE, maximum: MAX_AUCTION_PRICE })
    unitGoldPrice: number;

    @Expose()
    @IsNumber()
    @ApiProperty()
    itemId: number;

    @Expose()
    @IsNumber()
    @ApiProperty()
    quantity: number;
}
