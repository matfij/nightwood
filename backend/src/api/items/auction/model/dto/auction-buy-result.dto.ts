import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuctionBuyResultDto {

    @Expose()
    @ApiProperty()
    consumedGold: number;
}
