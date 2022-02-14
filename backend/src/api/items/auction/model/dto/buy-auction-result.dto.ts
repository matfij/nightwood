import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BuyAuctionResultDto {

    @Expose()
    @ApiProperty()
    consumedGold: number;
}
