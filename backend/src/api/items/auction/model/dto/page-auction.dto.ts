import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { AuctionDto } from "./auction.dto";

export class PageAuctionDto extends PaginationBaseDto {

    @IsArray()
    @ApiProperty({ type: [AuctionDto] })
    data: Partial<AuctionDto>[];
}
