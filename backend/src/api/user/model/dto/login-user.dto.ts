import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    nickname: string;

    @IsString()
    password: string;
}
