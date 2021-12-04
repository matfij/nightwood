import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional()
    email?: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    password?: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    nickname?: string;
}
