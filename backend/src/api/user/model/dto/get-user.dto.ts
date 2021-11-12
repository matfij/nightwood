import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "src/configuration/user.config";

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
