import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional } from "class-validator";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { MixtureDto } from "./mixture.dto";

export class MixtureGetDto {
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    page?: number;
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    limit?: number;
}

export class MixturePageDto extends PaginationBaseDto {

    @IsArray()
    @ApiProperty({ type: [MixtureDto] })
    data: MixtureDto[];
}
