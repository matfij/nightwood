import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { DragonActionType } from "../definitions/dragon-action";

export class UpdateDragonActionDto {
    
    @IsEnum(DragonActionType)
    @ApiProperty({ enum: DragonActionType })
    type: DragonActionType;
    
    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional()
    endDate?: string;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional()
    duration?: string;
}
