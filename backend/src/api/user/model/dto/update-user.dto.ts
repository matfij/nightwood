import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsEmail()
    @IsOptional()
    email: string;
    
    @IsString()
    @IsOptional()
    password: string;
    
    @IsString()
    @IsOptional()
    nickname: string;
}
