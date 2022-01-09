import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class GetDragonDto {

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    minLevel?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    maxLevel?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    page?: number;
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    limit?: number;
}
