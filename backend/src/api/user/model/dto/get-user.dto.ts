import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class GetUserDto {

    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    nickname?: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    page?: number;
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    limit?: number;
}
