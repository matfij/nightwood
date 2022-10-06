import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";
import { EMAIL_MAX_LENGTH, NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "src/configuration/frontend.config";

export class UserRegisterDto {

    @IsEmail()
    @ApiProperty()
    @MaxLength(EMAIL_MAX_LENGTH)
    email: string;

    @IsString()
    @MinLength(PASSWORD_MIN_LENGTH)
    @MaxLength(PASSWORD_MAX_LENGTH)
    @ApiProperty()
    password: string;

    @IsString()
    @MinLength(NICKNAME_MIN_LENGTH)
    @MaxLength(NICKNAME_MAX_LENGTH)
    @ApiProperty()
    nickname: string;
}
