import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { DragonNature } from "../definitions/dragon-nature";

export class DragonCreateDto {

    @IsString()
    @ApiProperty()
    name: string;

    @IsEnum(DragonNature)
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    strength?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    dexterity?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    endurance?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    will?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    luck?: number;
}
