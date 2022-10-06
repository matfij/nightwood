import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserGetDto {

    @IsEmail()
    @ApiPropertyOptional()
    email?: string;

    @IsString()
    @ApiPropertyOptional()
    nickname?: string;

    @IsNumber()
    @ApiPropertyOptional()
    page?: number;
    
    @IsNumber()
    @ApiPropertyOptional()
    limit?: number;
}
