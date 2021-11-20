import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDto {

    @IsString()
    @ApiProperty()
    nickname: string;

    @IsString()
    @ApiProperty()
    password: string;
}
