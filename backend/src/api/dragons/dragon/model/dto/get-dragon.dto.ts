import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class GetDragonDto {

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    ownerId?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    page?: number;
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    limit?: number;
}
