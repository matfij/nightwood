import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { DragonNature } from "../definitions/dragon-nature";

export class DragonDto {

    @Expose()
    @ApiPropertyOptional()
    id?: number;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiPropertyOptional()
    ownerId?: number;

    @Expose()
    @ApiProperty()
    action: DragonActionDto;

    @Expose()
    @ApiProperty()
    nextFeed: number;

    @Expose()
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;

    @Expose()
    @ApiProperty()
    level: number;

    @Expose()
    @ApiProperty()
    strength: number;

    @Expose()
    @ApiProperty()
    dexterity: number;

    @Expose()
    @ApiProperty()
    endurance: number;

    @Expose()
    @ApiProperty()
    will: number;

    @Expose()
    @ApiProperty()
    luck: number;
}
