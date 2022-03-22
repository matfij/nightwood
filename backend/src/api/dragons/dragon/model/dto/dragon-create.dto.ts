import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { DragonSkills } from "src/api/dragons/dragon-skills/model/dragon-skills.entity";
import { DragonSkillsDto } from "src/api/dragons/dragon-skills/model/dto/dragon-skills.dto";
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
    level?: number;

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

    @IsOptional()
    @ApiPropertyOptional({ type: DragonSkillsDto })
    skills: Partial<DragonSkillsDto>;
}
