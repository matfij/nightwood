import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";
import { NICKNAME_MAX_LENGTH, NICKNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "src/configuration/user.config";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nickname: string;
}
