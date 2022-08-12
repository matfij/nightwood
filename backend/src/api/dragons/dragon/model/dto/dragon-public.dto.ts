import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DragonNature } from "../definitions/dragon-nature";

export class DragonPublicDto {

    @ApiProperty()
    id: number;

    @ApiPropertyOptional()
    userId?: number
    
    @ApiProperty()
    name: string;

    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;

    @ApiProperty()
    level: number;

    @ApiProperty()
    experience: number;
}
