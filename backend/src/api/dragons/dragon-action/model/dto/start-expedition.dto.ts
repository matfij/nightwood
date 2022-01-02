import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class StartExpeditionDto {

    @IsNumber()
    @ApiProperty()
    dragonId: number;

    @IsNumber()
    @ApiProperty()
    expeditionId: number;
}
