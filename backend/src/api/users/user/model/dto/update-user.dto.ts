import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    ownedDragons?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    maxOwnedDragons?: number;
}
