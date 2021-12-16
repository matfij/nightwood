import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class AuthUserDto {

    @IsNumber()
    @ApiProperty()
    id: number;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    nickname: string;

    @IsString()
    @ApiProperty()
    accessToken: string;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional({ type: Date })
    expires?: string;

    @IsNumber()
    @ApiProperty()
    ownedDragons?: number;

    @IsNumber()
    @ApiProperty()
    maxOwnedDragons?: number;
}
