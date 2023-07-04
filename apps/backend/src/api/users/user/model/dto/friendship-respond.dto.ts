import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class FriendshipRespondDto {

    @IsNumber()
    @ApiProperty()
    requesterId: number;

    @IsBoolean()
    @ApiProperty()
    accept: boolean;
}
