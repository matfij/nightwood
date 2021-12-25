import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class FeedDragonDto {

    @IsNumber()
    @ApiProperty()
    dragonId: number;

    @IsNumber()
    @ApiProperty()
    itemId: number;
}
