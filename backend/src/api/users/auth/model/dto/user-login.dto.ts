import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserLoginDto {

    @IsString()
    @ApiProperty()
    nickname: string;

    @IsString()
    @ApiProperty()
    password: string;
}
