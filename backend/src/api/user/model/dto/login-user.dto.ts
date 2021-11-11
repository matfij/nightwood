import { IsString } from "class-validator";

export class LoginUserDto {

    @IsString()
    nickname: string;

    @IsString()
    password: string;
}
