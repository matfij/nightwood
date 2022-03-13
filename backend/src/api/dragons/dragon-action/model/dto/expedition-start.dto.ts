import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class StartExpeditionDto {

    @IsNumber()
    @ApiProperty()
    dragonId: number;

    @IsString()
    @ApiProperty()
    expeditionUid: string;
}
