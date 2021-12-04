import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { DragonActionType } from "../definitions/dragon-action";

export class DragonActionDto {

    @Expose()
    @ApiPropertyOptional()
    id?: number;

    @Expose()
    @ApiProperty()
    type: DragonActionType;

    @Expose()
    @ApiPropertyOptional()
    startTime?: string;

    @Expose()
    @ApiPropertyOptional()
    endTime?: string;

    @Expose()
    @ApiPropertyOptional()
    duration?: string;
}
