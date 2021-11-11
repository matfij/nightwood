import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class GetUserDto {

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    nickname?: string;

    @IsNumber()
    @IsOptional()
    page?: number;
    
    @IsNumber()
    @IsOptional()
    limit?: number;
}
