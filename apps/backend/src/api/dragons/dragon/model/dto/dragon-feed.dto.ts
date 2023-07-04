import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DragonFeedDto {

    @IsNumber()
    @ApiProperty()
    dragonId: number;

    @IsNumber()
    @ApiProperty()
    itemId: number;
}
