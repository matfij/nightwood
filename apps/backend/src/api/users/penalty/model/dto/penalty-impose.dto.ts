import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PenaltyType } from "../definitions/penalties";

export class PenaltyImposeDto {

    @ApiProperty()
    punishedUserId: number;

    @ApiProperty({ enum: PenaltyType, enumName: 'PenaltyType' })
    type: PenaltyType;

    @ApiProperty()
    duration: number;

    @ApiPropertyOptional()
    comment?: string;
    
    @ApiProperty()
    message: string;
}
