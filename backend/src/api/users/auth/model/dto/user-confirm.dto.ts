import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserConfirmDto {

    @IsString()
    @ApiProperty()
    activationCode: string;
}
