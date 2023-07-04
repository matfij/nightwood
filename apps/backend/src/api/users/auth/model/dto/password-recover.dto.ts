import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PasswordRecoverDto {
    @IsString()
    @ApiProperty()
    emailOrNickname: string;
}
