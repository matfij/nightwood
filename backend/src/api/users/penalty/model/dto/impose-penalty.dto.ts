import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PenaltyType } from "../definitions/penalties";

export class ImposePenaltyDto {

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
